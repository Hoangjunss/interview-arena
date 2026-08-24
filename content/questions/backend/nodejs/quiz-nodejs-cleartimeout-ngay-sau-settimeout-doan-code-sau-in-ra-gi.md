---
id: quiz-nodejs-cleartimeout-ngay-sau-settimeout-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
clearTimeout ngay sau setTimeout — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] done tick
- [ ] (không in gì)
- [ ] tick done
- [x] done

## Giải thích (VI)
Chỉ in done. setTimeout trả về một handle; clearTimeout(handle) chạy đồng bộ ngay sau đó nên timer bị hủy trước khi event loop kịp chạy nó. Callback tick không bao giờ được gọi. (FREE)

### Giải thích các phương án:
- **done tick** (Sai): Sai — hiểu nhầm rằng timer đã đăng ký thì chắc chắn chạy. clearTimeout hủy timer trước khi nó kịp fire.
- **(không in gì)** (Sai): Sai — console.log('done') là code đồng bộ bình thường, vẫn chạy.
- **tick done** (Sai): Sai — setTimeout(0) không chạy callback ngay lập tức; callback chỉ chạy ở vòng event loop sau, mà lúc đó timer đã bị hủy.
- **done** (Đúng): clearTimeout chạy đồng bộ NGAY sau khi đăng ký timer, hủy nó trước khi event loop kịp tới phase timers — callback không bao giờ chạy. Chỉ done được in.
