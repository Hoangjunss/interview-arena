---
id: quiz-nextjs-component-nao-sau-day-bat-buoc-phai-co-use-client
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Component nào sau đây BẮT BUỘC phải có 'use client'?

## Đáp án trắc nghiệm
- [ ] Component đọc biến môi trường bí mật để dựng URL nội bộ
- [ ] Component async gọi database rồi render danh sách
- [ ] Component chỉ nhận prop và render JSX tĩnh
- [x] Component dùng useState để mở/đóng một dropdown và có onClick trên nút

## Giải thích (VI)
Cần 'use client' khi component dùng state/effect, trình xử lý sự kiện, hoặc API trình duyệt (window, localStorage). Không cần khi chỉ lấy dữ liệu và render — và tuyệt đối không đưa đoạn đọc bí mật xuống client.

### Giải thích các phương án:
- **Component đọc biến môi trường bí mật để dựng URL nội bộ** (Sai): Ngược lại — việc này PHẢI ở server, đưa xuống client là lộ bí mật.
- **Component async gọi database rồi render danh sách** (Sai): Đây đúng là việc của Server Component; Client Component còn không async được.
- **Component chỉ nhận prop và render JSX tĩnh** (Sai): Không có tương tác thì để ở server nhẹ hơn.
- **Component dùng useState để mở/đóng một dropdown và có onClick trên nút** (Đúng): Hook trạng thái và trình xử lý sự kiện chỉ tồn tại ở client.
