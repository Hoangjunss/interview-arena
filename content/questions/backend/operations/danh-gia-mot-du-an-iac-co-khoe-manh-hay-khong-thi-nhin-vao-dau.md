---
id: danh-gia-mot-du-an-iac-co-khoe-manh-hay-khong-thi-nhin-vao-dau
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh giá một dự án IaC có khoẻ mạnh hay không thì nhìn vào đâu?

## Question (EN)
What do you look at to judge whether an IaC project is healthy?

## Đáp án chi tiết (VI)
Chạy `terraform plan` trên production và xem **có ra \\"No changes\\" không**. Plan rỗng nghĩa là code khớp thực tế, và đó là điều kiện tiên quyết cho mọi lợi ích khác.\
\
Các tín hiệu nhìn tiếp:\
- State ở remote backend có locking + versioning.\
- `required_version` và provider version được pin, lock file có commit.\
- `apply` chỉ chạy qua CI, người read-only ở production.\
- Có scheduled drift detection.\
\
Một dấu hiệu cảnh báo cụ thể: team thường xuyên phải chạy `terraform apply -target=...`. Nó thường có nghĩa là plan đầy đủ chứa những thay đổi không ai dám apply — code và thực tế đã lệch xa.\
\
Dấu hiệu tích cực đáng ghi nhận nhất: team tự tin dựng lại toàn bộ một environment từ số không, và **đã từng làm điều đó thật** chứ không phải chỉ tin là làm được.

## Detailed Answer (EN)
Run `terraform plan` against production and see whether it reports **\\"No changes\\"**. An empty plan means the code matches reality, the precondition for every other benefit.\
\
Next signals:\
- State in a remote backend with locking and versioning.\
- `required_version` and provider versions pinned, lock file committed.\
- `apply` only through CI, humans read-only in production.\
- Scheduled drift detection in place.\
\
A concrete warning sign: the team routinely runs `terraform apply -target=...`. That usually means the full plan contains changes nobody dares apply — code and reality have drifted far apart.\
\
The strongest positive signal: the team is confident rebuilding an entire environment from zero and **has actually done it**, rather than believing it would work.
