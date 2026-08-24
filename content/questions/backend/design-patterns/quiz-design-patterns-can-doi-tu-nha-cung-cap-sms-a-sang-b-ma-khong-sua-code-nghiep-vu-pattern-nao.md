---
id: quiz-design-patterns-can-doi-tu-nha-cung-cap-sms-a-sang-b-ma-khong-sua-code-nghiep-vu-pattern-nao
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đổi từ nhà cung cấp SMS A sang B mà không sửa code nghiệp vụ. Pattern nào?

## Đáp án trắc nghiệm
- [x] Adapter: interface của mình, mỗi nhà cung cấp một lớp
- [ ] Facade để gói toàn bộ SDK vào một hàm duy nhất
- [ ] Proxy để chặn lời gọi tới nhà cung cấp hiện tại
- [ ] Factory để tạo đối tượng gửi SMS mỗi khi cần dùng tới

## Giải thích (VI)
Adapter (hay port/adapter): khai một interface theo nhu cầu của bạn (sendSms(phone, message)), rồi mỗi nhà cung cấp là một lớp cài đặt interface đó. Đổi nhà cung cấp chỉ là đổi lớp được tiêm vào.

### Giải thích các phương án:
- **Adapter: interface của mình, mỗi nhà cung cấp một lớp** (Đúng): Code nghiệp vụ chỉ biết interface của bạn, không biết SDK của nhà cung cấp.
- **Facade để gói toàn bộ SDK vào một hàm duy nhất** (Sai): Facade đơn giản hoá một hệ thống phức tạp, không nhằm thay thế nhà cung cấp.
- **Proxy để chặn lời gọi tới nhà cung cấp hiện tại** (Sai): Proxy kiểm soát truy cập, không giải quyết việc khác interface.
- **Factory để tạo đối tượng gửi SMS mỗi khi cần dùng tới** (Sai): Factory lo việc tạo, không lo việc chuẩn hoá interface.
