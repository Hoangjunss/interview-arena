---
id: quiz-golang-khac-biet-cot-loi-gia-goroutine-va-os-thread-la-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa goroutine và OS thread là gì?

## Đáp án trắc nghiệm
- [x] Goroutine là luồng nhẹ do Go runtime quản lý và ghép (multiplex) nhiều goroutine lên một số ít OS thread
- [ ] Goroutine bị hệ điều hành lập lịch trực tiếp, không qua Go runtime
- [ ] Goroutine chạy song song thực sự trên nhiều CPU còn OS thread thì không
- [ ] Goroutine chính là OS thread nhưng được đặt tên khác trong Go

## Giải thích (VI)
Goroutine là luồng nhẹ do Go runtime quản lý, không phải OS thread. Scheduler M:N của Go ghép nhiều goroutine lên một số ít OS thread. Stack goroutine khởi đầu chỉ khoảng 2KB và tự co giãn, còn OS thread tốn hàng trăm KB tới vài MB, nên tạo hàng nghìn goroutine là chuyện bình thường.

### Giải thích các phương án:
- **Goroutine là luồng nhẹ do Go runtime quản lý và ghép (multiplex) nhiều goroutine lên một số ít OS thread** (Đúng): Rẻ hơn OS thread rất nhiều. Go runtime dùng scheduler M:N ghép nhiều goroutine (G) lên các OS thread (M); stack goroutine khởi đầu chỉ ~2KB và co giãn được, nên tạo hàng nghìn goroutine là bình thường.
- **Goroutine bị hệ điều hành lập lịch trực tiếp, không qua Go runtime** (Sai): Ngược lại: goroutine do scheduler của Go runtime lập lịch ở user space; OS chỉ lập lịch các OS thread bên dưới.
- **Goroutine chạy song song thực sự trên nhiều CPU còn OS thread thì không** (Sai): Song song thật phụ thuộc GOMAXPROCS và số core; bản thân OS thread cũng chạy song song. Điểm khác biệt là mô hình lập lịch và chi phí, không phải khả năng song song.
- **Goroutine chính là OS thread nhưng được đặt tên khác trong Go** (Sai): Goroutine không ánh xạ 1:1 với OS thread; runtime ghép nhiều goroutine lên ít thread hơn, khác hẳn về chi phí và cách lập lịch.
