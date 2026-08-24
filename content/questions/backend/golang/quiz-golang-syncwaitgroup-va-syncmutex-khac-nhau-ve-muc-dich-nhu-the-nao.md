---
id: quiz-golang-syncwaitgroup-va-syncmutex-khac-nhau-ve-muc-dich-nhu-the-nao
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
sync.WaitGroup và sync.Mutex khác nhau về mục đích như thế nào?

## Đáp án trắc nghiệm
- [ ] WaitGroup thay thế được Mutex trong mọi trường hợp
- [x] WaitGroup để chờ một nhóm goroutine hoàn thành
- [ ] Cả hai đều là khoá loại trừ tương hỗ, chỉ khác tên
- [ ] WaitGroup bảo vệ biến chia sẻ, Mutex để chờ goroutine kết thúc

## Giải thích (VI)
sync.WaitGroup đồng bộ hoá điểm kết thúc: Add(n) trước khi khởi chạy, mỗi goroutine defer wg.Done(), và wg.Wait() chặn tới khi bộ đếm về 0 — dùng để chờ cả nhóm goroutine xong. sync.Mutex là khoá loại trừ tương hỗ: Lock/Unlock bao quanh vùng critical để mỗi lúc chỉ một goroutine chạm state chia sẻ. Hai mục đích khác nhau, thường dùng cùng nhau.

### Giải thích các phương án:
- **WaitGroup thay thế được Mutex trong mọi trường hợp** (Sai): Không; chúng giải hai bài toán khác nhau. WaitGroup không cung cấp loại trừ tương hỗ nên không thay được Mutex khi cần bảo vệ state.
- **WaitGroup để chờ một nhóm goroutine hoàn thành** (Đúng): Mutex để bảo vệ vùng critical section, đảm bảo mỗi lúc chỉ một goroutine truy cập state chia sẻ. WaitGroup là bộ đếm đồng bộ hoá điểm kết thúc (Add/Done/Wait); Mutex là khoá loại trừ tương hỗ (Lock/Unlock) bảo vệ dữ liệu chia sẻ. Hai mục đích hoàn toàn khác nhau.
- **Cả hai đều là khoá loại trừ tương hỗ, chỉ khác tên** (Sai): WaitGroup không phải khoá; nó là bộ đếm để "chờ xong". Chỉ Mutex mới thực hiện loại trừ tương hỗ.
- **WaitGroup bảo vệ biến chia sẻ, Mutex để chờ goroutine kết thúc** (Sai): Bị đảo ngược: Mutex bảo vệ biến chia sẻ, còn WaitGroup mới là thứ dùng để chờ các goroutine kết thúc.
