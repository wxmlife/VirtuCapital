#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1

echo "Virtu Capital 指南一键发布"
echo
npm run publish
STATUS=$?

echo
if [[ $STATUS -eq 0 ]]; then
  echo "发布成功。按任意键关闭窗口。"
else
  echo "发布未完成，请查看上方错误信息。按任意键关闭窗口。"
fi

read -n 1 -s
exit $STATUS
