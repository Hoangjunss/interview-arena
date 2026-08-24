---
id: detached-head-la-gi-checkout-mot-commit-cu-de-xem-code-roi-quay-lai-nhu-the-nao
position: backend
technology: recovery-\u0026-time-travel
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Detached HEAD là gì? Checkout một commit cũ để xem code rồi quay lại như thế nào?

## Question (EN)
What is a detached HEAD? How do you check out an old commit to inspect code and then return?

## Đáp án chi tiết (VI)
Bình thường HEAD trỏ vào một **branch**; commit mới sẽ kéo branch đi theo. Khi bạn `git checkout \u003ccommit-hash\u003e` (hoặc checkout tag), HEAD trỏ **thẳng vào commit** — trạng thái \\"detached HEAD\\". Code vẫn xem/build/test được bình thường, nhưng commit mới tạo ở đây **không thuộc branch nào** — rời đi là chúng trở thành unreachable (chỉ còn tìm lại được qua reflog).\
\
```bash\
git checkout abc123      # xem code tại commit cũ — detached HEAD\
# ... inspect, build, test ...\
git switch -             # quay lại branch trước đó\
```\
\
**Nếu lỡ commit trong detached HEAD** và muốn giữ:\
```bash\
git switch -c fix/from-old-commit  # tạo branch ngay tại đây — commits được giữ lại\
```\
\
`git switch` (Git 2.23+) tách bạch hơn `checkout`: `git switch \u003cbranch\u003e` để đổi branch, `git switch --detach \u003chash\u003e` khi muốn vào detached HEAD có chủ đích.

## Detailed Answer (EN)
Normally HEAD points to a **branch**; new commits move the branch along. When you `git checkout \u003ccommit-hash\u003e` (or check out a tag), HEAD points **directly at a commit** — the \\"detached HEAD\\" state. You can still read/build/test the code normally, but commits created here **belong to no branch** — once you leave, they become unreachable (recoverable only via reflog).\
\
```bash\
git checkout abc123      # inspect code at an old commit — detached HEAD\
# ... inspect, build, test ...\
git switch -             # return to the previous branch\
```\
\
**If you accidentally committed in detached HEAD** and want to keep the work:\
```bash\
git switch -c fix/from-old-commit  # create a branch right here — commits are kept\
```\
\
`git switch` (Git 2.23+) is more explicit than `checkout`: `git switch \u003cbranch\u003e` to change branches, `git switch --detach \u003chash\u003e` to enter detached HEAD intentionally.
