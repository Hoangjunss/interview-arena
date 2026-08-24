---
id: quiz-angular-async-pipe-giup-gi-khi-hien-thi-observable-trong-template
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
async pipe giúp gì khi hiển thị Observable trong template?

## Đáp án trắc nghiệm
- [ ] Cache kết quả HTTP để lần điều hướng sau không gọi lại API
- [x] Tự subscribe khi view khởi tạo và tự unsubscribe khi view bị huỷ
- [ ] Biến Observable thành Promise rồi await trong template
- [ ] Chỉ để rút gọn cú pháp, vẫn phải gọi unsubscribe trong ngOnDestroy

## Giải thích (VI)
async pipe subscribe hộ và huỷ subscription khi view bị destroy, nên không cần dọn dẹp thủ công. Mỗi giá trị mới, pipe đánh dấu component cần kiểm tra lại nên hoạt động đúng cả với OnPush. Lưu ý dùng một lần và gán bằng as — mỗi chỗ | async là một subscription riêng, với cold observable như HTTP sẽ thành nhiều lần gọi API.

### Giải thích các phương án:
- **Cache kết quả HTTP để lần điều hướng sau không gọi lại API** (Sai): Pipe không cache; mỗi lần subscribe vào cold observable sẽ gọi lại nguồn.
- **Tự subscribe khi view khởi tạo và tự unsubscribe khi view bị huỷ** (Đúng): Đúng: quản lý vòng đời subscription và đồng thời đánh dấu component cần kiểm tra lại khi có giá trị mới, nên phối hợp được cả với OnPush.
- **Biến Observable thành Promise rồi await trong template** (Sai): Không có chuyển đổi sang Promise; pipe subscribe trực tiếp và phát giá trị mới nhất.
- **Chỉ để rút gọn cú pháp, vẫn phải gọi unsubscribe trong ngOnDestroy** (Sai): Chính điểm mạnh của pipe là tự huỷ subscription khi view bị destroy.
