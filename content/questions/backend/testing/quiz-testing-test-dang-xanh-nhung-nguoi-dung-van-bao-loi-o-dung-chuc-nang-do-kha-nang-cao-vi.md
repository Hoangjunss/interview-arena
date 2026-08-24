---
id: quiz-testing-test-dang-xanh-nhung-nguoi-dung-van-bao-loi-o-dung-chuc-nang-do-kha-nang-cao-vi
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test đang xanh nhưng người dùng vẫn báo lỗi ở đúng chức năng đó. Khả năng cao vì sao?

## Đáp án trắc nghiệm
- [ ] Số lượng test hiện còn quá ít so với lượng code đang có
- [ ] Môi trường test dùng phiên bản thư viện khác production
- [x] Test mock đúng phần đang lỗi nên không chạm code thật
- [ ] Người dùng đang dùng trình duyệt không được hỗ trợ

## Giải thích (VI)
Thường là mock che mất phần đang lỗi : test mock tầng gọi API hoặc tầng DB, nên bug nằm trong chính phần bị mock. Test xanh vì nó chỉ kiểm tra mock hoạt động đúng như bạn đã khai.

### Giải thích các phương án:
- **Số lượng test hiện còn quá ít so với lượng code đang có** (Sai): Có thể đúng, nhưng ở đây chức năng đó đã có test mà vẫn lỗi.
- **Môi trường test dùng phiên bản thư viện khác production** (Sai): Xảy ra được nhưng ít gặp hơn nhiều so với vấn đề mock.
- **Test mock đúng phần đang lỗi nên không chạm code thật** (Đúng): Mock quá nhiều là nguyên nhân phổ biến nhất của test xanh mà hệ thống vỡ.
- **Người dùng đang dùng trình duyệt không được hỗ trợ** (Sai): Có thể, nhưng không phải nguyên nhân điển hình nhất.
