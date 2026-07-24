import AppKit
import Foundation
import Vision

guard CommandLine.arguments.count > 1 else {
    fputs("Usage: swift scripts/ocr-image-index.swift <directory>\n", stderr)
    exit(2)
}

let root = URL(fileURLWithPath: CommandLine.arguments[1])
let manager = FileManager.default
let extensions = Set(["png", "jpg", "jpeg"])
let files = (manager.enumerator(
    at: root,
    includingPropertiesForKeys: nil
)?.allObjects as? [URL] ?? [])
    .filter { extensions.contains($0.pathExtension.lowercased()) }
    .sorted { $0.path < $1.path }

for file in files {
    guard
        let image = NSImage(contentsOf: file),
        let cgImage = image.cgImage(
            forProposedRect: nil,
            context: nil,
            hints: nil
        )
    else {
        print("\(file.path)\t[unreadable]")
        continue
    }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en-US"]
    request.usesLanguageCorrection = true

    do {
        try VNImageRequestHandler(
            cgImage: cgImage,
            orientation: .up
        ).perform([request])
        let text = (request.results ?? [])
            .compactMap { $0.topCandidates(1).first?.string }
            .prefix(18)
            .joined(separator: " | ")
        print("\(file.path)\t\(text)")
    } catch {
        print("\(file.path)\t[OCR error: \(error.localizedDescription)]")
    }
}
