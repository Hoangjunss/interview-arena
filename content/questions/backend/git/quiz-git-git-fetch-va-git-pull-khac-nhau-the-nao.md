---
id: quiz-git-git-fetch-va-git-pull-khac-nhau-the-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
git fetch và git pull khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] fetch dùng cho nhánh, pull dùng cho tag
- [ ] Hai lệnh giống hệt nhau, pull chỉ là tên viết tắt của fetch
- [ ] fetch tải về toàn bộ repository từ đầu, pull chỉ tải phần chênh lệch
- [x] fetch chỉ tải về và cập nhật nhánh theo dõi; pull = fetch cộng một bước gộp

## Giải thích (VI)
fetch chỉ đồng bộ thông tin từ remote về, cập nhật origin/main — code đang làm không bị đụng. pull làm đúng việc đó rồi gộp luôn vào nhánh hiện tại, nên có thể sinh conflict ngay. Muốn xem trước rồi mới quyết định thì fetch an toàn hơn.

### Giải thích các phương án:
- **fetch dùng cho nhánh, pull dùng cho tag** (Sai): Cả hai đều làm việc với nhánh; tag có cờ riêng.
- **Hai lệnh giống hệt nhau, pull chỉ là tên viết tắt của fetch** (Sai): pull còn làm thêm bước tích hợp, đây là khác biệt quan trọng.
- **fetch tải về toàn bộ repository từ đầu, pull chỉ tải phần chênh lệch** (Sai): Tải toàn bộ từ đầu là git clone; cả hai lệnh này đều chỉ lấy phần mới.
- **fetch chỉ tải về và cập nhật nhánh theo dõi; pull = fetch cộng một bước gộp** (Đúng): pull = fetch cộng thêm một bước gộp (merge hoặc rebase) vào nhánh hiện tại. pull đúng nghĩa là fetch rồi tích hợp ngay. Nên fetch không đụng tới nhánh làm việc, còn pull gộp thêm bằng merge hoặc rebase vào nhánh hiện tại.
