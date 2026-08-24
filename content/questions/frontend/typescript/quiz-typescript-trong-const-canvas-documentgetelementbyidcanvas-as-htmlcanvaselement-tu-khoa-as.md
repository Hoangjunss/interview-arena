---
id: quiz-typescript-trong-const-canvas-documentgetelementbyidcanvas-as-htmlcanvaselement-tu-khoa-as
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong const canvas = document.getElementById('canvas') as HTMLCanvasElement, từ khoá as làm gì?

## Đáp án trắc nghiệm
- [ ] Kiểm tra kiểu tại runtime và throw error nếu element không phải HTMLCanvasElement
- [ ] Tạo một bản copy của giá trị với kiểu mới, giữ nguyên giá trị gốc
- [ ] Chuyển đổi (convert) giá trị sang kiểu mới tại runtime, giống ép kiểu trong Java/C#
- [x] Ghi đè kiểu mà compiler suy ra, chỉ có tác dụng tại compile time — không có kiểm tra hay chuyển đổi nào tại runtime

## Giải thích (VI)
Type assertion value as Type ghi đè kiểu compiler suy ra, chỉ tồn tại tại compile time — không kiểm tra, không chuyển đổi gì tại runtime. Dùng khi bạn biết kiểu chính xác hơn compiler (DOM query, JSON.parse). Lạm dụng sẽ mất type safety; as unknown as Type (double assertion) là dấu hiệu thiết kế kiểu có vấn đề.

### Giải thích các phương án:
- **Kiểm tra kiểu tại runtime và throw error nếu element không phải HTMLCanvasElement** (Sai): Assertion không sinh bất kỳ code kiểm tra nào; muốn kiểm tra thật phải dùng instanceof HTMLCanvasElement trong if.
- **Tạo một bản copy của giá trị với kiểu mới, giữ nguyên giá trị gốc** (Sai): Không có copy hay biến đổi giá trị — chỉ là thông tin kiểu cho compiler, biến vẫn trỏ vào đúng object đó.
- **Chuyển đổi (convert) giá trị sang kiểu mới tại runtime, giống ép kiểu trong Java/C#** (Sai): Không có chuyển đổi giá trị nào xảy ra — as bị xoá hoàn toàn khi compile; element trả về vẫn nguyên trạng dù assert kiểu gì.
- **Ghi đè kiểu mà compiler suy ra, chỉ có tác dụng tại compile time — không có kiểm tra hay chuyển đổi nào tại runtime** (Đúng): Type assertion là lời khẳng định "tin tôi, tôi biết kiểu này" với compiler; nếu khẳng định sai, lỗi chỉ lộ ra khi chạy.
