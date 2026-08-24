---
id: the-time-duoc-su-dung-de-lam-gi
position: backend
technology: semantic
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thẻ `\u003ctime\u003e` được sử dụng để làm gì?

## Question (EN)
What is the `\u003ctime\u003e` element used for?

## Đáp án chi tiết (VI)
`\u003ctime\u003e` gắn một mốc thời gian **máy đọc được** vào phần chữ mà người đọc thấy.\
\
```html\
\u003ctime datetime=\\"2026-03-15T09:00+07:00\\"\u003e9h sáng thứ Sáu, 15/3\u003c/time\u003e\
\u003ctime datetime=\\"2026-03\\"\u003etháng 3/2026\u003c/time\u003e\
\u003ctime datetime=\\"PT2H30M\\"\u003e2 tiếng rưỡi\u003c/time\u003e\
```\
\
`datetime` phải theo **ISO 8601**. Nếu bỏ `datetime` thì phần text bên trong bắt buộc tự nó là chuỗi ngày hợp lệ.\
\
Dùng ở đâu: ngày đăng bài (Google đọc để hiển thị trong kết quả tìm kiếm), lịch sự kiện, changelog, và mọi chỗ hiển thị \\"3 giờ trước\\" — text hiển thị là tương đối, `datetime` giữ mốc tuyệt đối.\
\
```html\
\u003ctime datetime=\\"2026-08-21T01:30+07:00\\" title=\\"21/08/2026 01:30\\"\u003e3 giờ trước\u003c/time\u003e\
```\
\
**Lưu ý:** viết `datetime=\\"15/03/2026\\"` theo thói quen Việt Nam — không phải ISO, browser và crawler bỏ qua. Luôn `YYYY-MM-DD`.

## Detailed Answer (EN)
`\u003ctime\u003e` attaches a **machine-readable** timestamp to the text a reader sees.\
\
```html\
\u003ctime datetime=\\"2026-03-15T09:00+07:00\\"\u003e9am Friday, March 15\u003c/time\u003e\
\u003ctime datetime=\\"2026-03\\"\u003eMarch 2026\u003c/time\u003e\
\u003ctime datetime=\\"PT2H30M\\"\u003etwo and a half hours\u003c/time\u003e\
```\
\
`datetime` must follow **ISO 8601**. Omit it and the inner text itself has to be a valid date string.\
\
Where it earns its keep: publication dates (Google reads them for search results), event calendars, changelogs, and anywhere you render \\"3 hours ago\\" — the visible text is relative while `datetime` keeps the absolute instant.\
\
```html\
\u003ctime datetime=\\"2026-08-21T01:30+07:00\\" title=\\"2026-08-21 01:30\\"\u003e3 hours ago\u003c/time\u003e\
```\
\
**Note:** writing `datetime=\\"15/03/2026\\"` out of local habit — that is not ISO, so browsers and crawlers ignore it. Always `YYYY-MM-DD`.
