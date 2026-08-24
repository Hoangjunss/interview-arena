---
id: quiz-kubernetes-nhng-phat-bieu-nao-sau-day-dung-ve-rolling-update-cua-deployment-chon-nhieu-dap
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về rolling update của Deployment? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] maxSurge và maxUnavailable kiểm soát tốc độ chuyển đổi — bao nhiêu Pod được tạo thêm và bao nhiêu Pod được phép thiếu trong lúc cập nhật
- [ ] Rollback bằng kubectl rollout undo sẽ khôi phục lại cả dữ liệu trong database về trạng thái trước khi deploy

## Giải thích (VI)
maxSurge/maxUnavailable điều tiết tốc độ; hai phiên bản chạy song song nên phải tương thích ngược; readiness probe là thứ làm cho rollout thật sự không downtime. Rollback chỉ quay lui phiên bản code — dữ liệu và schema thì không.

### Giải thích các phương án:
- **maxSurge và maxUnavailable kiểm soát tốc độ chuyển đổi — bao nhiêu Pod được tạo thêm và bao nhiêu Pod được phép thiếu trong lúc cập nhật** (Đúng): Hai tham số này định hình toàn bộ hành vi của rollout.
- **Rollback bằng kubectl rollout undo sẽ khôi phục lại cả dữ liệu trong database về trạng thái trước khi deploy** (Sai): Rollback chỉ đổi lại phiên bản Pod; dữ liệu và schema đã đổi thì không tự quay lui.
