---
id: trang-bi-khung-khi-go-vao-mot-o-input-o-form-lon-ban-chan-doan-va-sua-the-nao
position: backend
technology: state-placement
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trang bị khựng khi gõ vào một ô input ở form lớn. Bạn chẩn đoán và sửa thế nào?

## Question (EN)
Typing in one input of a large form feels laggy. How do you diagnose and fix it?

## Đáp án chi tiết (VI)
Nguyên nhân điển hình: **state đặt quá cao**. Ô input controlled giữ state ở component cha (hoặc ở App), nên mỗi ký tự gõ vào làm render lại toàn bộ cây con — kể cả bảng, biểu đồ, danh sách không liên quan.\
\
Hướng sửa theo thứ tự ưu tiên:\
\
1. **Colocate state** — đưa state xuống đúng component dùng nó. Nếu chỉ ô search cần giá trị, tách thành `\u003cSearchField /\u003e` giữ state riêng và chỉ báo lên trên khi cần (submit, debounce).\
2. **Tách component** — bọc phần dùng state vào một component nhỏ, phần nặng nằm ngoài phạm vi render lại.\
3. **Hoãn phần nặng** — `useDeferredValue` cho giá trị dùng để lọc danh sách, giữ ô input phản hồi tức thì.\
4. Chỉ khi vẫn chậm mới tính tới `memo` cho các nhánh đắt tiền.\
\
**Lift state up vẫn đúng khi nhiều component thật sự cần chia sẻ giá trị đó** — đừng colocate tới mức phải đồng bộ hai nguồn sự thật. Nguyên tắc: đặt state ở **tổ tiên chung gần nhất** của những component cần nó, không cao hơn.

## Detailed Answer (EN)
$89
