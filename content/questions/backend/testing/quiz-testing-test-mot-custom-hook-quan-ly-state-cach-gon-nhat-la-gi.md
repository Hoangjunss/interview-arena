---
id: quiz-testing-test-mot-custom-hook-quan-ly-state-cach-gon-nhat-la-gi
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test một custom hook quản lý state, cách gọn nhất là gì?

## Đáp án trắc nghiệm
- [ ] Chuyển logic ra ngoài hook để test được như hàm thuần
- [ ] Dựng một component giả rồi assert vào DOM mà nó render ra
- [x] renderHook, bọc thay đổi state trong act
- [ ] Gọi trực tiếp hàm hook trong test như một hàm thường

## Giải thích (VI)
renderHook từ Testing Library, và mọi thao tác làm state đổi phải nằm trong act(...). Thiếu act thì React cảnh báo và giá trị đọc ra có thể là trạng thái cũ.

### Giải thích các phương án:
- **Chuyển logic ra ngoài hook để test được như hàm thuần** (Sai): Là cách hay khi tách được, nhưng phần dùng state của React vẫn cần test riêng.
- **Dựng một component giả rồi assert vào DOM mà nó render ra** (Sai): Chạy được nhưng phải viết thêm component chỉ để phục vụ test.
- **renderHook, bọc thay đổi state trong act** (Đúng): Không cần dựng component giả chỉ để gọi hook.
- **Gọi trực tiếp hàm hook trong test như một hàm thường** (Sai): React sẽ báo lỗi vì hook chỉ chạy được trong quá trình render.
