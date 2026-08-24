---
id: cau-truc-co-ban-cua-mot-tai-lieu-html-bao-gom-nhung-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấu trúc cơ bản của một tài liệu HTML bao gồm những gì?

## Question (EN)
What does the basic structure of an HTML document consist of?

## Đáp án chi tiết (VI)
Một tài liệu HTML tối thiểu gồm bốn phần:\
\
```html\
\u003c!DOCTYPE html\u003e            \u003c!-- render mode --\u003e\
\u003chtml lang=\\"vi\\"\u003e           \u003c!-- root element, lang cho screen reader + dịch tự động --\u003e\
  \u003chead\u003e\
    \u003cmeta charset=\\"utf-8\\"\u003e\
    \u003cmeta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\"\u003e\
    \u003ctitle\u003eTiêu đề tab\u003c/title\u003e\
    \u003clink rel=\\"stylesheet\\" href=\\"/style.css\\"\u003e\
  \u003c/head\u003e\
  \u003cbody\u003e\
    \u003ch1\u003eNội dung hiển thị\u003c/h1\u003e\
  \u003c/body\u003e\
\u003c/html\u003e\
```\
\
- `\u003c!DOCTYPE html\u003e` — bật standards mode.\
- `\u003chtml\u003e` — phần tử gốc; `lang` ảnh hưởng trực tiếp tới screen reader và Google Translate.\
- `\u003chead\u003e` — metadata, không hiển thị: `\u003ctitle\u003e`, `\u003cmeta\u003e`, `\u003clink\u003e`, `\u003cscript\u003e`.\
- `\u003cbody\u003e` — toàn bộ nội dung người dùng nhìn thấy.\
\
**Lưu ý:** `\u003cmeta charset\u003e` phải nằm trong **1024 byte đầu** của tài liệu, nếu không browser đã đoán encoding xong rồi và tiếng Việt hiện thành ký tự lỗi.

## Detailed Answer (EN)
A minimal HTML document has four parts:\
\
```html\
\u003c!DOCTYPE html\u003e            \u003c!-- render mode --\u003e\
\u003chtml lang=\\"en\\"\u003e           \u003c!-- root element; lang drives screen readers and auto-translation --\u003e\
  \u003chead\u003e\
    \u003cmeta charset=\\"utf-8\\"\u003e\
    \u003cmeta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\"\u003e\
    \u003ctitle\u003eTab title\u003c/title\u003e\
    \u003clink rel=\\"stylesheet\\" href=\\"/style.css\\"\u003e\
  \u003c/head\u003e\
  \u003cbody\u003e\
    \u003ch1\u003eVisible content\u003c/h1\u003e\
  \u003c/body\u003e\
\u003c/html\u003e\
```\
\
- `\u003c!DOCTYPE html\u003e` — switches on standards mode.\
- `\u003chtml\u003e` — the root element; `lang` directly affects screen readers and Google Translate.\
- `\u003chead\u003e` — metadata that is never rendered: `\u003ctitle\u003e`, `\u003cmeta\u003e`, `\u003clink\u003e`, `\u003cscript\u003e`.\
- `\u003cbody\u003e` — everything the user actually sees.\
\
**Note:** `\u003cmeta charset\u003e` has to appear within the **first 1024 bytes**, otherwise the browser has already guessed an encoding and non-ASCII text renders as mojibake.
