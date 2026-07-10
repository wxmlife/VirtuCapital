from copy import copy
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor


SOURCE = Path("/Users/apple/Downloads/11-CRS template-繁&英.docx")
OUTPUT = Path("/Users/apple/Documents/VirtuCapital/11-CRS-張三測試樣本-繁英.docx")


def set_text(paragraph, text, *, bold=None, color=None, size=None):
    """Replace only a field paragraph, retaining its paragraph properties."""
    for run in paragraph.runs:
        run._element.getparent().remove(run._element)
    run = paragraph.add_run(text)
    if bold is not None:
        run.bold = bold
    if color:
        run.font.color.rgb = RGBColor(*color)
    if size:
        run.font.size = Pt(size)
    return run


def set_cell_value(cell, text):
    p = cell.paragraphs[0]
    set_text(p, text)


doc = Document(SOURCE)


def iter_paragraphs(parent):
    """Yield paragraphs in the document, including nested tables."""
    for p in getattr(parent, "paragraphs", []):
        yield p
    for table in getattr(parent, "tables", []):
        for row in table.rows:
            for cell in row.cells:
                yield from iter_paragraphs(cell)


# Preserve the source wording while changing only the institution identity.
for paragraph in iter_paragraphs(doc):
    if "Yellow River Securities Limited" in paragraph.text:
        set_text(paragraph, paragraph.text.replace("Yellow River Securities Limited", "Virtu Capital Finance Limited"))
    if "黃河證券有限公司" in paragraph.text:
        set_text(paragraph, paragraph.text.replace("黃河證券有限公司", "Virtu Capital Finance Limited（VC）"))

# Make the sample status conspicuous in both language sections.
set_text(doc.tables[0].rows[0].cells[0].paragraphs[0], "個人稅務居民自我證明表格（測試樣本 / SAMPLE）", bold=True)
set_text(doc.tables[1].rows[0].cells[0].paragraphs[0], "CRS Individual Self-Certification Form (TEST SAMPLE)", bold=True)

# Part 1 — Chinese and English mirror the same fictional identity.
zh = doc.tables[0].rows[1].cells[0].paragraphs
set_text(zh[1], "帳戶持有人的姓名     : 張三（測試人士）")
set_text(zh[2], "身份證或護照號碼 : 110101199002300015（虛構號碼）")

en = doc.tables[1].rows[1].cells[0].paragraphs
set_text(en[1], "Name of Account Holder: ZHANG SAN (Fictional Test Person)")
set_text(en[2], "ID Number: 110101199002300015 (Fictional / Invalid)")
set_text(en[3], "ID Type: PRC Resident Identity Card")

# Part 2 — sole tax residence in Mainland China. The TIN is normally the PRC ID number.
zh_tax = doc.tables[0].rows[1].cells[0].tables[0]
set_cell_value(zh_tax.rows[1].cells[0], "(1) 中國內地")
set_cell_value(zh_tax.rows[1].cells[1], "110101199002300015")
set_cell_value(zh_tax.rows[1].cells[2], "不適用")
set_cell_value(zh_tax.rows[1].cells[3], "不適用")
set_cell_value(zh_tax.rows[2].cells[0], "(2) 示例地區")
set_cell_value(zh_tax.rows[2].cells[1], "未提供")
set_cell_value(zh_tax.rows[2].cells[2], "理由 B")
set_cell_value(zh_tax.rows[2].cells[3], "稅務編號已申請，目前尚在處理中。")

en_tax = doc.tables[1].rows[1].cells[0].tables[0]
set_cell_value(en_tax.rows[1].cells[0], "(1) Mainland China")
set_cell_value(en_tax.rows[1].cells[1], "110101199002300015")
set_cell_value(en_tax.rows[1].cells[2], "N/A")
set_cell_value(en_tax.rows[2].cells[0], "(2) Example")
set_cell_value(en_tax.rows[2].cells[1], "Not available")
set_cell_value(en_tax.rows[2].cells[2], "Reason B")
# The English template merges the reason and explanation into one column.
en_tax.rows[2].cells[2].paragraphs[0].add_run(" — TIN application submitted and currently pending.")

# Part 3 — typed signature is deliberately labelled as an example.
set_text(doc.tables[0].rows[2].cells[0].paragraphs[0], "客戶簽署: 張三（電子簽名示例，非真實簽署）")
set_text(doc.tables[0].rows[3].cells[0].paragraphs[0], "客戶姓名: 張三")
set_text(doc.tables[0].rows[4].cells[0].paragraphs[0], "日期: 2026年7月10日")

set_text(doc.tables[2].rows[0].cells[0].paragraphs[0], "Client / Authorized Signature: ZHANG SAN (typed sample; not a real signature)")
set_text(doc.tables[2].rows[1].cells[0].paragraphs[0], "Client / Authorized Name: ZHANG SAN")
set_text(doc.tables[2].rows[2].cells[0].paragraphs[0], "Date: 10 July 2026")

# Add a red sample notice at the beginning of each language section.
for table_index, message in [
    (0, "僅供測試：本文件所有個人及稅務資料均屬虛構，不可用於真實開戶或申報。"),
    (1, "TEST ONLY: All identity and tax information in this document is fictional and must not be used for account opening or reporting."),
]:
    cell = doc.tables[table_index].rows[1].cells[0]
    p = cell.paragraphs[0].insert_paragraph_before()
    run = p.add_run(message)
    run.bold = True
    run.font.color.rgb = RGBColor(192, 0, 0)
    run.font.size = Pt(10)

# Force an available CJK font for East Asian text so LibreOffice renders Chinese correctly.
for paragraph in doc.element.body.iter(qn("w:p")):
    for r in paragraph.iter(qn("w:r")):
        rpr = r.find(qn("w:rPr"))
        if rpr is None:
            rpr = r.makeelement(qn("w:rPr"), {})
            r.insert(0, rpr)
        fonts = rpr.find(qn("w:rFonts"))
        if fonts is None:
            fonts = rpr.makeelement(qn("w:rFonts"), {})
            rpr.insert(0, fonts)
        fonts.set(qn("w:eastAsia"), "Hiragino Sans GB")

doc.save(OUTPUT)
print(OUTPUT)
