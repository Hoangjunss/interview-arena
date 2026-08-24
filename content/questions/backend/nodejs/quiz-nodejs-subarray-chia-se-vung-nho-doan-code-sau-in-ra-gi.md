---
id: quiz-nodejs-subarray-chia-se-vung-nho-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
subarray chia sẻ vùng nhớ — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] xb
- [ ] abc
- [ ] 120bc
- [x] xbc

## Giải thích (VI)
In xbc. subarray trả về VIEW chia sẻ vùng nhớ với buffer gốc, không copy. Gán view[0] = 120 ghi thẳng byte đầu của buf — 120 là mã ASCII của "x", nên buf.toString() thành "xbc". (FREE)

### Giải thích các phương án:
- **xb** (Sai): Sai — in buf.toString() (cả 3 byte), không phải view.toString(). Buffer gốc vẫn đủ độ dài 3.
- **abc** (Sai): Sai — hiểu nhầm subarray tạo bản sao độc lập. Nó chia sẻ memory với buffer gốc; muốn bản sao tách rời phải dùng Buffer.copyBytesFrom hoặc copy tường minh.
- **120bc** (Sai): Sai — buffer lưu BYTE, không lưu chuỗi số. toString() giải mã byte 120 theo UTF-8 thành ký tự "x".
- **xbc** (Đúng): subarray KHÔNG copy — nó trả về view chia sẻ cùng vùng nhớ với buffer gốc. Ghi view[0] = 120 (mã ASCII của "x") sửa thẳng byte đầu của buf.
