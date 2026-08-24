---
id: quiz-cs-fundamentals-khi-nao-nen-chon-udp-thay-vi-tcp
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên chọn UDP thay vì TCP?

## Đáp án trắc nghiệm
- [x] Khi độ trễ quan trọng hơn tính toàn vẹn, ví dụ gọi thoại hay game thời gian thực
- [ ] Khi kết nối đi qua nhiều firewall vì UDP luôn được cho qua
- [ ] Khi cần mã hoá vì UDP hỗ trợ TLS còn TCP thì không
- [ ] Khi cần truyền file lớn vì UDP có thông lượng cao hơn

## Giải thích (VI)
Khi độ trễ quan trọng hơn tính toàn vẹn tuyệt đối. TCP bảo đảm tin cậy và đúng thứ tự bằng cách truyền lại gói mất, nhưng việc đó khiến một gói mất chặn cả luồng phía sau. Với thoại, video trực tiếp hay game, dữ liệu tới trễ đã hết giá trị nên bỏ qua khung hình mất tốt hơn chờ nó.

### Giải thích các phương án:
- **Khi độ trễ quan trọng hơn tính toàn vẹn, ví dụ gọi thoại hay game thời gian thực** (Đúng): TCP truyền lại gói mất và giữ đúng thứ tự, nên một gói mất làm nghẽn cả luồng; với thoại hay game, dữ liệu tới muộn đã vô dụng nên bỏ qua tốt hơn chờ.
- **Khi kết nối đi qua nhiều firewall vì UDP luôn được cho qua** (Sai): Thực tế ngược lại: nhiều firewall doanh nghiệp chặn UDP mặc định và chỉ mở port TCP thông dụng.
- **Khi cần mã hoá vì UDP hỗ trợ TLS còn TCP thì không** (Sai): TLS chạy trên TCP là mô hình phổ biến nhất; phía UDP có DTLS và QUIC, nên mã hoá không phải tiêu chí phân biệt hai giao thức.
- **Khi cần truyền file lớn vì UDP có thông lượng cao hơn** (Sai): Truyền file đòi hỏi dữ liệu nguyên vẹn và đúng thứ tự; dùng UDP sẽ phải tự dựng lại toàn bộ cơ chế tin cậy mà TCP đã có sẵn.
