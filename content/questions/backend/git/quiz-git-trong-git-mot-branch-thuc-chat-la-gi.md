---
id: quiz-git-trong-git-mot-branch-thuc-chat-la-gi
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Git, một branch thực chất là gì?

## Đáp án trắc nghiệm
- [ ] Một tag đặc biệt không cho phép xóa
- [ ] Một hàng đợi chứa những commit chưa được push lên remote
- [x] Một con trỏ có thể di chuyển, trỏ tới một commit
- [ ] Một bản sao đầy đủ của toàn bộ thư mục dự án tại thời điểm tạo nhánh

## Giải thích (VI)
Branch là một con trỏ tới một commit, lưu trong .git/refs/heads/<tên> chỉ gồm 40 ký tự hash. Commit mới thì con trỏ tự tiến lên. Vì vậy tạo/xóa/chuyển nhánh nhanh gần như tức thời, không phụ thuộc kích thước dự án.

### Giải thích các phương án:
- **Một tag đặc biệt không cho phép xóa** (Sai): Branch di chuyển được và xóa được; tag mới là con trỏ cố định.
- **Một hàng đợi chứa những commit chưa được push lên remote** (Sai): Branch không phải hàng đợi và không gắn với trạng thái đã push hay chưa.
- **Một con trỏ có thể di chuyển, trỏ tới một commit** (Đúng): Tạo branch chỉ là ghi thêm một file nhỏ chứa hash, nên thao tác này gần như tức thời bất kể repository lớn cỡ nào. Đây là lý do tạo và chuyển nhánh trong Git rẻ hơn hẳn các hệ thống sao chép thư mục.
- **Một bản sao đầy đủ của toàn bộ thư mục dự án tại thời điểm tạo nhánh** (Sai): Đó là mô hình của một số VCS cũ, không phải Git.
