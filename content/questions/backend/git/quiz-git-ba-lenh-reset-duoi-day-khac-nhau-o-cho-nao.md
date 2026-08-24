---
id: quiz-git-ba-lenh-reset-duoi-day-khac-nhau-o-cho-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ba lệnh reset dưới đây khác nhau ở chỗ nào?

## Đáp án trắc nghiệm
- [ ] Cả ba giống hệt nhau, chỉ khác thông báo in ra màn hình
- [ ] --soft chỉ lùi một commit, --mixed lùi hai, --hard lùi toàn bộ nhánh
- [ ] --hard an toàn nhất vì có xác nhận trước khi xóa
- [x] --soft giữ thay đổi ở staging; --mixed giữ ở working directory; --hard xóa sạch

## Giải thích (VI)
Cả ba đều lùi con trỏ nhánh; khác nhau ở việc động tới bao nhiêu khu vực. --soft: chỉ commit (thay đổi còn ở staging). --mixed: commit + staging (thay đổi còn ở working directory). --hard: cả ba — thay đổi chưa commit mất hẳn.

### Giải thích các phương án:
- **Cả ba giống hệt nhau, chỉ khác thông báo in ra màn hình** (Sai): Chúng khác nhau rõ rệt ở việc giữ hay xóa thay đổi.
- **--soft chỉ lùi một commit, --mixed lùi hai, --hard lùi toàn bộ nhánh** (Sai): Số commit lùi do HEAD~n quyết định, không do ba cờ này.
- **--hard an toàn nhất vì có xác nhận trước khi xóa** (Sai): --hard là nguy hiểm nhất — nó xóa thay đổi chưa commit mà không hỏi lại.
- **--soft giữ thay đổi ở staging; --mixed giữ ở working directory; --hard xóa sạch** (Đúng): --mixed giữ thay đổi ở working directory (bỏ staging); --hard xóa sạch thay đổi ở cả hai nơi. Ba mức tương ứng với ba khu vực: chỉ commit, commit + staging, commit + staging + working directory. Cả ba đều lùi con trỏ như nhau, chỉ khác ở phần thay đổi được giữ lại.
