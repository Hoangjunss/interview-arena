---
id: quiz-kubernetes-trong-khai-bao-duoi-day-requests-va-limits-khac-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong khai báo dưới đây, requests và limits khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Vượt limits bộ nhớ thì Pod chỉ bị chậm lại chứ không bị giết
- [ ] Hai giá trị giống nhau, limits chỉ là tên cũ của requests
- [ ] requests là trần cứng, limits là mức khuyến nghị
- [x] requests là lượng được đảm bảo và là căn cứ lập lịch; limits là trần cứng

## Giải thích (VI)
requests là mức đảm bảo, scheduler dùng nó để tìm Node còn đủ chỗ. limits là trần. Vượt trần CPU thì container bị bóp (throttle) chứ không chết; vượt trần bộ nhớ thì bị kernel giết với exit code 137, vì bộ nhớ không thể nén.

### Giải thích các phương án:
- **Vượt limits bộ nhớ thì Pod chỉ bị chậm lại chứ không bị giết** (Sai): CPU thì bị bóp, nhưng bộ nhớ không nén được nên vượt là bị OOMKilled.
- **Hai giá trị giống nhau, limits chỉ là tên cũ của requests** (Sai): Chúng có ngữ nghĩa hoàn toàn khác nhau.
- **requests là trần cứng, limits là mức khuyến nghị** (Sai): Ngược lại — limits mới là trần được cưỡng chế.
- **requests là lượng được đảm bảo và là căn cứ lập lịch; limits là trần cứng** (Đúng): Vượt CPU thì bị bóp tốc độ, vượt memory thì container bị giết (OOMKilled. Hai giá trị phục vụ hai mục đích khác nhau: lập lịch và cưỡng chế trần. Vượt trần CPU thì bị throttle, vượt trần memory thì container bị OOMKilled.
