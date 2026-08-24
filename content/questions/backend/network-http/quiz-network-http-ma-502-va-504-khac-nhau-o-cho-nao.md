---
id: quiz-network-http-ma-502-va-504-khac-nhau-o-cho-nao
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mã 502 và 504 khác nhau ở chỗ nào?

## Đáp án trắc nghiệm
- [ ] 502 do client gây ra, 504 do máy chủ gây ra
- [ ] 502 là hết thời gian chờ, 504 là phản hồi không hợp lệ
- [ ] Hai mã tương đương nhau về nguyên nhân
- [x] 502 phản hồi không hợp lệ, 504 quá hạn chờ

## Giải thích (VI)
502 Bad Gateway : proxy nhận được phản hồi không hợp lệ từ dịch vụ phía sau (hoặc dịch vụ đó chết). 504 Gateway Timeout : proxy không nhận được phản hồi kịp trong thời gian chờ đã đặt.

### Giải thích các phương án:
- **502 do client gây ra, 504 do máy chủ gây ra** (Sai): Cả hai đều thuộc nhóm 5xx, tức phía máy chủ.
- **502 là hết thời gian chờ, 504 là phản hồi không hợp lệ** (Sai): Đảo ngược ý nghĩa hai mã.
- **Hai mã tương đương nhau về nguyên nhân** (Sai): Hai nguyên nhân khác nhau nên hướng điều tra cũng khác.
- **502 phản hồi không hợp lệ, 504 quá hạn chờ** (Đúng): Một bên nhận được rác từ upstream, một bên không nhận được gì kịp thời.
