---
id: quiz-linux-os-symlink-va-hard-link-khac-nhau-o-diem-nao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Symlink và hard link khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Hard link chiếm thêm dung lượng bằng tệp gốc
- [ ] Symlink nhanh hơn vì không phải phân giải qua inode
- [x] Symlink trỏ tới đường dẫn, hard link tới inode
- [ ] Symlink chỉ dùng cho thư mục, hard link cho tệp

## Giải thích (VI)
Symlink lưu một đường dẫn (như lối tắt): tệp gốc bị xoá hay di chuyển thì link đứt. Hard link là một tên khác của cùng inode: xoá tên gốc thì dữ liệu vẫn còn vì vẫn còn tên khác trỏ tới.

### Giải thích các phương án:
- **Hard link chiếm thêm dung lượng bằng tệp gốc** (Sai): Hard link chỉ là một tên khác trỏ tới cùng dữ liệu.
- **Symlink nhanh hơn vì không phải phân giải qua inode** (Sai): Symlink cần thêm một bước phân giải nên không nhanh hơn.
- **Symlink trỏ tới đường dẫn, hard link tới inode** (Đúng): Xoá tệp gốc thì symlink đứt còn hard link vẫn đọc được dữ liệu.
- **Symlink chỉ dùng cho thư mục, hard link cho tệp** (Sai): Ngược lại: hard link không tạo được cho thư mục, symlink thì được.
