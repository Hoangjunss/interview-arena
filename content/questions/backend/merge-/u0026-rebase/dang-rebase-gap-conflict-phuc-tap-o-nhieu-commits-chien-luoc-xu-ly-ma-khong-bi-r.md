---
id: dang-rebase-gap-conflict-phuc-tap-o-nhieu-commits-chien-luoc-xu-ly-ma-khong-bi-r
position: backend
technology: merge-\u0026-rebase
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đang rebase gặp conflict phức tạp ở nhiều commits. Chiến lược xử lý mà không bị \\"rebase hell\\"?

## Question (EN)
You hit complex conflicts across many commits during a rebase. What strategy avoids \\"rebase hell\\"?

## Đáp án chi tiết (VI)
**Rebase hell xảy ra khi**: branch sống lâu, conflict ở nhiều commits, resolve sai rồi continue → conflict tiếp theo phức tạp hơn.\
\
**Chiến lược chính — abort rồi squash trước khi rebase lại:**\
```bash\
git rebase --abort\
git rebase -i HEAD~20       # squash cả branch thành 1-2 commits (fixup)\
git rebase origin/main      # rebase lại — chỉ cần resolve 1 lần\
```\
\
**Kỹ thuật bổ trợ:**\
- **Rebase từng bước nhỏ**: thay vì rebase thẳng lên main hiện tại (50 commits ahead), rebase lên một commit ở giữa trước (`git rebase abc123`), resolve, rồi rebase tiếp `origin/main`.\
- **Bật rerere**: `git config --global rerere.enabled true` — git ghi nhớ cách bạn resolve, gặp lại cùng conflict sẽ tự replay.\
- **Khi bị stuck**: `git status` xem file nào conflict, `git diff` trước khi resolve, `git rebase --skip` bỏ qua commit (chỉ khi nó thực sự empty sau conflict), `git rebase --abort` để làm lại từ đầu.\
- **Dùng merge tool**: `git mergetool` mở vimdiff / VSCode / IntelliJ merge view thay vì sửa tay.

## Detailed Answer (EN)
$87
