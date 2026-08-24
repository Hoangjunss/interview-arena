---
id: quiz-docker-phat-bieu-nao-sau-day-sai-ve-restart-policy-cua-docker
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về restart policy của Docker?

## Đáp án trắc nghiệm
- [ ] Restart policy không dùng chung được với --rm vì container bị xoá ngay khi thoát
- [ ] unless-stopped như always nhưng tôn trọng lần docker stop thủ công
- [ ] no là mặc định và không bao giờ tự khởi động lại container
- [ ] on-failure chỉ restart khi exit code khác 0, giới hạn số lần bằng :N
- [x] always và unless-stopped chỉ khác nhau ở tên, hành vi hoàn toàn giống nhau

## Giải thích (VI)
Restart policy quyết định Docker có tự start lại container khi nó thoát hoặc khi daemon khởi động lại, đặt qua --restart. no (mặc định) không bao giờ restart. on-failure[:N] chỉ restart khi thoát lỗi (exit khác 0), giới hạn được số lần. always luôn restart. unless-stopped giống always nhưng tôn trọng lần stop thủ công của bạn. Không kết hợp được với --rm — Docker báo lỗi "conflicting options".

### Giải thích các phương án:
- **Restart policy không dùng chung được với --rm vì container bị xoá ngay khi thoát** (Sai): Phát biểu đúng — Docker từ chối thẳng tổ hợp này ("conflicting options: cannot specify both --restart and --rm").
- **unless-stopped như always nhưng tôn trọng lần docker stop thủ công** (Sai): Phát biểu đúng — nếu bạn chủ động stop thì nó không tự start lại sau khi daemon khởi động lại.
- **no là mặc định và không bao giờ tự khởi động lại container** (Sai): Phát biểu đúng — không đặt --restart nghĩa là container thoát thì đứng yên, phải start lại thủ công.
- **on-failure chỉ restart khi exit code khác 0, giới hạn số lần bằng :N** (Sai): Phát biểu đúng — on-failure chỉ nhắm tới lần thoát lỗi; :N giới hạn số lần thử để tránh vòng restart vô hạn.
- **always và unless-stopped chỉ khác nhau ở tên, hành vi hoàn toàn giống nhau** (Đúng): Đây là chỗ sai: always vẫn start lại sau khi daemon restart dù trước đó bạn đã stop thủ công, còn unless-stopped thì không.
