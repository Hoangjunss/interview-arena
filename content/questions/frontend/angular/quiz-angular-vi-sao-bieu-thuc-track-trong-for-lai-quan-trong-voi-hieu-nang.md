---
id: quiz-angular-vi-sao-bieu-thuc-track-trong-for-lai-quan-trong-voi-hieu-nang
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao biểu thức track trong @for lại quan trọng với hiệu năng?

## Đáp án trắc nghiệm
- [ ] Nó sắp xếp danh sách theo giá trị track trước khi render ra DOM
- [ ] Nó lọc bỏ các item trùng lặp trong mảng
- [x] Cho Angular biết "vẫn là item đó" giữa hai lần render
- [ ] Nó cache dữ liệu vào localStorage giữa các lần điều hướng trang

## Giải thích (VI)
track cung cấp danh tính ổn định cho mỗi item. Khi mảng thay đổi, Angular so khớp theo giá trị track để biết node DOM nào giữ lại, node nào thêm hay xoá. Không có danh tính đúng, mọi item được coi là mới và cả danh sách bị dựng lại — mất state của component con, mất focus, và mất hiệu năng. Dùng id ổn định từ dữ liệu; chỉ dùng chỉ số khi danh sách thuần tĩnh.

### Giải thích các phương án:
- **Nó sắp xếp danh sách theo giá trị track trước khi render ra DOM** (Sai): track không sắp xếp gì; thứ tự vẫn theo mảng nguồn.
- **Nó lọc bỏ các item trùng lặp trong mảng** (Sai): Trùng khoá track không bị lọc mà gây lỗi/hành vi sai — cần khoá thực sự duy nhất.
- **Cho Angular biết "vẫn là item đó" giữa hai lần render** (Đúng): Đúng: track là danh tính của item, quyết định việc tái sử dụng DOM node và state của component con — nhờ đó chỉ thêm/xoá/di chuyển phần cần thiết thay vì dựng lại cả danh sách.
- **Nó cache dữ liệu vào localStorage giữa các lần điều hướng trang** (Sai): track không liên quan tới lưu trữ.
