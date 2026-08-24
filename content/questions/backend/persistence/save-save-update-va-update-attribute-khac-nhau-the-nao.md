---
id: save-save-update-va-update-attribute-khac-nhau-the-nao
position: backend
technology: persistence
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`save`, `save!`, `update` và `update_attribute` khác nhau thế nào?

## Question (EN)
How do `save`, `save!`, `update`, and `update_attribute` differ?

## Đáp án chi tiết (VI)
Khác nhau ở hai trục: **có chạy validation không** và **thất bại thì báo bằng cách nào**.\
\
| Method | Chạy validation | Khi thất bại |\
| --- | --- | --- |\
| `save` | Có | Trả `false` |\
| `save!` | Có | Ném `ActiveRecord::RecordInvalid` |\
| `update` | Có | Trả `false` |\
| `update!` | Có | Ném exception |\
| `update_attribute` | **Không** | Bỏ qua validation, vẫn chạy callback |\
| `update_column` | **Không** | Bỏ qua cả callback và `updated_at` |\
\
```ruby\
order.save          # =\u003e false if invalid, you must check the return value\
order.save!         # =\u003e raises, good inside a transaction\
order.update(status: 'paid')\
order.update_column(:status, 'paid')  # straight UPDATE, no validation, no callback\
```\
\
**Thực tế:** trong controller dùng bản không có `!` rồi rẽ nhánh render; trong **transaction hoặc background job** dùng bản có `!` để lỗi làm rollback thay vì trôi qua âm thầm. `update_attribute` / `update_column` chỉ dùng cho cột kỹ thuật (đếm, cờ trạng thái nội bộ), không dùng cho dữ liệu do người dùng nhập.

## Detailed Answer (EN)
$82
