---
id: tai-sao-list-rendering-can-key-prop-su-dung-index-lam-key-co-van-de-gi
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao list rendering cần key prop? Sử dụng index làm key có vấn đề gì?

## Question (EN)
Why does list rendering need a key prop? What is wrong with using the index as a key?

## Đáp án chi tiết (VI)
Key prop giúp React nhận diện phần tử nào đã thay đổi, được thêm mới, hoặc bị xóa trong danh sách để cập nhật DOM hiệu quả thông qua thuật toán reconciliation. Dùng index làm key sẽ gây lỗi nghiêm trọng khi danh sách bị sắp xếp lại hoặc xóa phần tử, vì index sẽ gán nhầm cho item khác khiến state và input bị lẫn lộn. Ví dụ nếu xóa phần tử đầu tiên, tất cả index sẽ dịch lên và React nghĩ chỉ phần tử cuối bị xóa. Luôn dùng unique ID từ dữ liệu (database ID, UUID) làm key để đảm bảo chính xác.

## Detailed Answer (EN)
The key prop helps React identify which items in a list have changed, been added, or removed, enabling efficient DOM updates through the reconciliation algorithm. Using the index as a key causes serious bugs when the list is reordered or items are deleted, because indices get reassigned to different items — causing state and input fields to become mixed up. For example, deleting the first item shifts all indices up, so React thinks only the last item was removed. Always use a unique, stable ID from your data (database ID, UUID) as the key.
