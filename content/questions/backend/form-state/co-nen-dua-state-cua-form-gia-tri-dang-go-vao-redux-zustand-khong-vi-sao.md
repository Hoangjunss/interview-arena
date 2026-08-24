---
id: co-nen-dua-state-cua-form-gia-tri-dang-go-vao-redux-zustand-khong-vi-sao
position: backend
technology: form-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có nên đưa state của form (giá trị đang gõ) vào Redux/Zustand không? Vì sao?

## Question (EN)
Should form state (values being typed) live in Redux/Zustand? Why or why not?

## Đáp án chi tiết (VI)
Mặc định là **không**. Giá trị đang gõ là state cục bộ, vòng đời bằng vòng đời form, và thay đổi theo từng ký tự.\
\
Đưa vào store global gây ba vấn đề:\
- Mỗi phím gõ dispatch một action → **mọi subscriber của store** phải chạy selector, DevTools ngập log.\
- Phải tự dọn state khi rời trang, nếu quên thì lần mở form sau còn dữ liệu cũ.\
- Trộn dữ liệu chưa hợp lệ (đang gõ dở) vào chung nơi chứa dữ liệu đã xác nhận.\
\
Cách làm phổ biến: giữ form **uncontrolled** hoặc dùng `react-hook-form`, chỉ đẩy dữ liệu ra ngoài **khi submit** — lúc đó gọi mutation, và kết quả server mới đi vào cache/store.\
\
Ngoại lệ hợp lý:\
- **Wizard nhiều bước** cần giữ dữ liệu khi chuyển step hoặc F5 → một store riêng cho luồng đó (thường kèm persist), không phải store chung của app.\
- Field nào là **bộ lọc danh sách** thì không thuộc form state — đưa lên URL.\
\
Trường hợp một field trong form cần hiển thị ở nơi khác theo thời gian thực, hãy lift state lên cha chung gần nhất trước, chỉ đụng tới store khi đã hết cách.

## Detailed Answer (EN)
$83
