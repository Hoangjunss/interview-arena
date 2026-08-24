---
id: phan-trang-offset-va-cursor-khac-nhau-the-nao-khi-nao-chon-cursor
position: backend
technology: pagination
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân trang offset và cursor khác nhau thế nào? Khi nào chọn cursor?

## Question (EN)
Offset vs cursor pagination — what is the difference and when to pick cursor?

## Đáp án chi tiết (VI)
- **Offset** (`LIMIT 20 OFFSET 40` / `?page=3`): đơn giản, nhảy trang bất kỳ, hiện tổng số trang. Hai điểm yếu: (1) **chậm ở trang sâu** — DB vẫn quét rồi bỏ 40 hàng đầu; (2) **trôi kết quả** — nếu có bản ghi được thêm/xóa giữa chừng, hàng bị lặp hoặc bị nhảy.\
- **Cursor (keyset)**: dùng con trỏ là giá trị của hàng cuối (`WHERE id \u003c last_id ORDER BY id DESC LIMIT 20`). Nhanh và ổn định ở mọi độ sâu vì tận dụng index, không đếm offset. Đổi lại: **không nhảy trang tùy ý**, chỉ tiến/lùi tuần tự, và cần cột sắp xếp ổn định + duy nhất.\
\
Chốt: danh sách nhỏ, cần nhảy trang → **offset**; feed vô hạn, dữ liệu đổi liên tục, bảng lớn → **cursor**.

## Detailed Answer (EN)
- **Offset** (`LIMIT 20 OFFSET 40` / `?page=3`): simple, jumps to any page, can show total page count. Two weaknesses: (1) **slow on deep pages** — the DB still scans and discards the first 40 rows; (2) **result drift** — if rows are inserted/deleted meanwhile, items get repeated or skipped.\
- **Cursor (keyset)**: the cursor is the last row's value (`WHERE id \u003c last_id ORDER BY id DESC LIMIT 20`). Fast and stable at any depth because it uses the index instead of counting an offset. Costs: **no arbitrary page jumps**, only sequential next/prev, and it needs a stable, unique sort column.\
\
Bottom line: small list needing page jumps → **offset**; infinite feed, constantly changing data, large table → **cursor**.
