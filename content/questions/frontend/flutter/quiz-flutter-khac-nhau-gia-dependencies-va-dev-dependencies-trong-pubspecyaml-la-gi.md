---
id: quiz-flutter-khac-nhau-gia-dependencies-va-dev-dependencies-trong-pubspecyaml-la-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác nhau giữa dependencies và dev dependencies trong pubspec.yaml là gì?

## Đáp án trắc nghiệm
- [x] dev dependencies không đi vào gói cài đặt phát hành
- [ ] dev dependencies chỉ nhận gói do đội nội bộ tự viết
- [ ] dependencies bị khoá phiên bản còn dev thì không
- [ ] dev dependencies chỉ chạy được trên máy ảo chứ không phải máy thật

## Giải thích (VI)
dev_dependencies chỉ dùng trong lúc phát triển như flutter_test, build_runner, mocktail nên không được đóng gói vào bản phát hành. dependencies là thứ ứng dụng cần lúc chạy nên ảnh hưởng trực tiếp tới dung lượng cài đặt.

### Giải thích các phương án:
- **dev dependencies không đi vào gói cài đặt phát hành** (Đúng): Chúng chỉ phục vụ lúc phát triển như test hay sinh mã, nên không làm phình ứng dụng.
- **dev dependencies chỉ nhận gói do đội nội bộ tự viết** (Sai): Nguồn gói không liên quan, phần lớn là gói công khai trên pub.dev.
- **dependencies bị khoá phiên bản còn dev thì không** (Sai): Cả hai đều được ghi vào pubspec.lock như nhau.
- **dev dependencies chỉ chạy được trên máy ảo chứ không phải máy thật** (Sai): Đây là phân biệt về phạm vi build, không liên quan tới loại thiết bị.
