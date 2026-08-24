---
id: quiz-redis-replication-cua-redis-bao-dam-gi-ve-d-lieu-tren-ban-sao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replication của Redis bảo đảm gì về dữ liệu trên bản sao?

## Đáp án trắc nghiệm
- [x] Bất đồng bộ — bản sao có thể chậm hơn bản chính
- [ ] Mỗi bản sao giữ một phần dữ liệu để chia tải bộ nhớ
- [ ] Bản sao ghi được và tự đồng bộ hai chiều với bản chính
- [ ] Đồng bộ — lệnh ghi chỉ trả về sau khi mọi bản sao xác nhận

## Giải thích (VI)
Bất đồng bộ. Bản chính trả OK cho client rồi mới đẩy lệnh sang bản sao, nên bản sao có thể trễ và một số lệnh ghi cuối cùng có thể mất nếu bản chính chết đúng lúc đó.

### Giải thích các phương án:
- **Bất đồng bộ — bản sao có thể chậm hơn bản chính** (Đúng): Bản chính không chờ bản sao xác nhận nên một số lệnh ghi cuối có thể mất khi failover.
- **Mỗi bản sao giữ một phần dữ liệu để chia tải bộ nhớ** (Sai): Bản sao giữ toàn bộ dữ liệu; chia dữ liệu là việc của cluster.
- **Bản sao ghi được và tự đồng bộ hai chiều với bản chính** (Sai): Bản sao mặc định chỉ đọc, không có đồng bộ hai chiều.
- **Đồng bộ — lệnh ghi chỉ trả về sau khi mọi bản sao xác nhận** (Sai): Mặc định không như vậy; WAIT chỉ giúp kiểm tra chứ không biến nó thành đồng bộ thật.
