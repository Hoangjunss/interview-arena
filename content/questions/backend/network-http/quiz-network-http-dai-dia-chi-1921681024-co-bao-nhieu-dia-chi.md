---
id: quiz-network-http-dai-dia-chi-1921681024-co-bao-nhieu-dia-chi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dải địa chỉ 192.168.1.0/24 có bao nhiêu địa chỉ?

## Đáp án trắc nghiệm
- [ ] 24 địa chỉ
- [ ] 1024 địa chỉ
- [x] 256 địa chỉ
- [ ] 512 địa chỉ

## Giải thích (VI)
256 địa chỉ (từ .0 tới .255). Ký hiệu /24 nghĩa là 24 bit đầu cố định cho phần mạng, còn 8 bit cho phần host nên có 2 mũ 8 địa chỉ. Trong đó thường chỉ 254 dùng được cho máy vì .0 là địa chỉ mạng và .255 là quảng bá.

### Giải thích các phương án:
- **24 địa chỉ** (Sai): Nhầm số bit tiền tố thành số địa chỉ.
- **1024 địa chỉ** (Sai): Ứng với /22.
- **256 địa chỉ** (Đúng): 32 trừ 24 còn 8 bit cho phần host, tức 2 mũ 8.
- **512 địa chỉ** (Sai): Ứng với /23, tức một bit host nhiều hơn.
