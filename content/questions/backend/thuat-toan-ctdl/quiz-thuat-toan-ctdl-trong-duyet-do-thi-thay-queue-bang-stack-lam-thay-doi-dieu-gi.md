---
id: quiz-thuat-toan-ctdl-trong-duyet-do-thi-thay-queue-bang-stack-lam-thay-doi-dieu-gi
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong duyệt đồ thị, thay queue bằng stack làm thay đổi điều gì?

## Đáp án trắc nghiệm
- [ ] Cho phép bỏ tập đỉnh đã thăm khi đồ thị có chu trình
- [ ] Giảm độ phức tạp thời gian từ O(V + E) xuống O(V)
- [ ] Làm thuật toán tìm được đường đi ngắn nhất chính xác hơn
- [x] Chuyển từ duyệt theo chiều rộng sang theo chiều sâu

## Giải thích (VI)
Đổi thứ tự duyệt: queue cho BFS , đi hết các đỉnh cùng mức trước; stack cho DFS , đi sâu hết một nhánh rồi mới quay lại. Cùng độ phức tạp O(V + E), nhưng chỉ BFS bảo đảm tìm được đường ít cạnh nhất trên đồ thị không trọng số.

### Giải thích các phương án:
- **Cho phép bỏ tập đỉnh đã thăm khi đồ thị có chu trình** (Sai): Cả hai đều lặp vô hạn nếu bỏ tập đã thăm trên đồ thị có chu trình.
- **Giảm độ phức tạp thời gian từ O(V + E) xuống O(V)** (Sai): Cả hai đều thăm mỗi đỉnh và mỗi cạnh một lần, cùng bậc O(V + E).
- **Làm thuật toán tìm được đường đi ngắn nhất chính xác hơn** (Sai): Ngược lại, chỉ bản dùng hàng đợi mới bảo đảm đường ngắn nhất theo số cạnh.
- **Chuyển từ duyệt theo chiều rộng sang theo chiều sâu** (Đúng): Thứ tự lấy ra quyết định đi hết một nhánh trước hay đi hết một mức trước.
