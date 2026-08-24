---
id: quiz-typescript-utility-type-partialt-lam-gi-va-tinh-huong-dung-dien-hinh-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Utility type Partial<T> làm gì và tình huống dùng điển hình là gì?

## Đáp án trắc nghiệm
- [ ] Loại bỏ các property có giá trị undefined khỏi object tại runtime
- [ ] Biến tất cả property thành optional ở mọi tầng lồng nhau (deep)
- [x] Biến mọi property của T thành optional — điển hình cho payload update (PATCH)
- [ ] Chọn ra một tập con property của T theo danh sách key truyền vào

## Giải thích (VI)
Partial<T> tạo type mới với tất cả property của T thành optional (shallow). Tình huống điển hình: hàm update nhận Partial<User> để client chỉ gửi field thay đổi trong PATCH request. Ngược lại có Required<T> biến mọi optional thành bắt buộc.

### Giải thích các phương án:
- **Loại bỏ các property có giá trị undefined khỏi object tại runtime** (Sai): Utility type chỉ tồn tại ở compile time — không có biến đổi dữ liệu runtime nào xảy ra.
- **Biến tất cả property thành optional ở mọi tầng lồng nhau (deep)** (Sai): Partial<T> chỉ shallow — property object lồng bên trong vẫn giữ nguyên required; deep partial phải tự viết bằng recursive mapped type.
- **Biến mọi property của T thành optional — điển hình cho payload update (PATCH)** (Đúng): Partial<T> map mọi key sang dạng key?: T[K], nên hàm update nhận được object thiếu field mà vẫn type-safe. Partial<T> map mọi key sang dạng key?: T[K] nên chỉ ở tầng ngoài cùng.
- **Chọn ra một tập con property của T theo danh sách key truyền vào** (Sai): Đó là Pick<T, K>; Partial<T> giữ nguyên toàn bộ key, chỉ đổi chúng thành optional.
