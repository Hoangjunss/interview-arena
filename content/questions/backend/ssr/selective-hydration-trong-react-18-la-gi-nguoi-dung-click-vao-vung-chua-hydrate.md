---
id: selective-hydration-trong-react-18-la-gi-nguoi-dung-click-vao-vung-chua-hydrate
position: backend
technology: ssr
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Selective hydration trong React 18 là gì? Người dùng click vào vùng chưa hydrate thì chuyện gì xảy ra?

## Question (EN)
What is selective hydration in React 18? What happens if the user clicks a region that has not hydrated yet?

## Đáp án chi tiết (VI)
Trước React 18, hydration là **tất cả hoặc không**: phải chờ toàn bộ JS tải xong rồi hydrate cả cây từ đầu đến cuối, trong lúc đó trang nhìn thấy được nhưng không bấm được.\
\
React 18 tách theo **Suspense boundary**. Mỗi boundary hydrate được **độc lập**, nên:\
- Vùng nào có HTML và code sẵn thì tương tác được trước, không chờ vùng nặng (biểu đồ, comment) tải xong.\
- Hydration bị **ngắt được**: React làm từng phần và nhường main thread giữa chừng.\
\
**Khi người dùng click vào vùng chưa hydrate**, React **ghi lại sự kiện đó** (event replaying) và **đổi thứ tự ưu tiên** — nhảy vào hydrate ngay boundary chứa chỗ vừa click, bỏ qua thứ tự từ trên xuống, rồi phát lại sự kiện cho handler thật. Kết quả là cú click không mất; nó chỉ chậm đi.\
\
**Ý nghĩa khi thiết kế:** đặt Suspense boundary quanh những khối nặng và ít quan trọng là cách trực tiếp cải thiện chỉ số tương tác. Ngược lại, bọc cả trang trong một boundary duy nhất thì mọi lợi ích trên biến mất — vẫn là mô hình tất-cả-hoặc-không.

## Detailed Answer (EN)
$7a
