---
id: quiz-frontend-core-code-splitting-bang-dynamic-import-nen-ap-dung-o-dau-truoc
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Code splitting bằng dynamic import() nên áp dụng ở đâu trước?

## Đáp án trắc nghiệm
- [x] Theo route, và theo khối nặng chỉ dùng khi tương tác (modal, biểu đồ)
- [ ] Chỉ nên chia khi bundle vượt quá 5MB sau khi đã nén
- [ ] Chia mọi component thành chunk riêng để bundle chính nhỏ nhất có thể được
- [ ] Chia theo thư viện bên thứ ba là cách duy nhất có tác dụng

## Giải thích (VI)
Bắt đầu từ route: mỗi trang một chunk, người dùng chỉ tải phần mình vào. Tiếp theo là các khối nặng chỉ xuất hiện khi tương tác — modal phức tạp, trình soạn thảo, thư viện biểu đồ, bản đồ. Tránh chia quá vụn vì mỗi chunk là một request và có chi phí điều phối. Với chunk khả năng cao sẽ cần, có thể tải trước ở thời điểm rảnh hoặc khi người dùng rê chuột vào nút mở.

### Giải thích các phương án:
- **Theo route, và theo khối nặng chỉ dùng khi tương tác (modal, biểu đồ)** (Đúng): Đúng: chia theo xác suất sử dụng và ranh giới rõ ràng — mỗi route một chunk, còn trình soạn thảo hay thư viện biểu đồ thì người dùng có thể không bao giờ mở tới.
- **Chỉ nên chia khi bundle vượt quá 5MB sau khi đã nén** (Sai): Không có ngưỡng cố định; ảnh hưởng phụ thuộc mạng và thiết bị của người dùng.
- **Chia mọi component thành chunk riêng để bundle chính nhỏ nhất có thể được** (Sai): Quá nhiều chunk nhỏ làm tăng số request và chi phí điều phối, thường chậm hơn.
- **Chia theo thư viện bên thứ ba là cách duy nhất có tác dụng** (Sai): Tách vendor là một cách, nhưng chia theo route thường có tác dụng lớn hơn.
