---
id: quiz-ci-cd-pipeline-cai-lai-dependency-tu-dau-moi-lan-chay-cai-thien-the-nao
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline cài lại dependency từ đầu mỗi lần chạy. Cải thiện thế nào?

## Đáp án trắc nghiệm
- [x] Cache thư mục store theo hash lockfile
- [ ] Cài sẵn dependency vào image của runner rồi dùng lại nhiều lần
- [ ] Commit node_modules vào repo cho khỏi phải cài
- [ ] Bỏ qua bước cài nếu build trước đó đã thành công

## Giải thích (VI)
Cache theo hash của lockfile : khoá cache là deps-${hash(pnpm-lock.yaml)}. Lockfile không đổi thì khôi phục cache trong vài giây; đổi thì cache miss và cài lại — đúng lúc cần thiết.

### Giải thích các phương án:
- **Cache thư mục store theo hash lockfile** (Đúng): Lockfile không đổi thì dùng lại cache, đổi thì tự cài lại phần mới.
- **Cài sẵn dependency vào image của runner rồi dùng lại nhiều lần** (Sai): Image sẽ lệch với lockfile của dự án theo thời gian.
- **Commit node_modules vào repo cho khỏi phải cài** (Sai): Repo phình to và gây xung đột merge liên tục.
- **Bỏ qua bước cài nếu build trước đó đã thành công** (Sai): Không đáng tin: dependency có thể đã thay đổi giữa hai lần chạy.
