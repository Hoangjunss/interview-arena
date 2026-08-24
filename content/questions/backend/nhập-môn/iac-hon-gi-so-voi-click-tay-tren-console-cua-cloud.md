---
id: iac-hon-gi-so-voi-click-tay-tren-console-cua-cloud
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
IaC hơn gì so với click tay trên console của cloud?

## Question (EN)
What does IaC give you over clicking in the cloud console?

## Đáp án chi tiết (VI)
Hạ tầng thành **code có review, có version, dựng lại được**. Cùng một repo dựng ra staging và production giống nhau, và `git log` trả lời được câu \\"vì sao security group này mở port 6379\\".\
\
Click tay không trả lời được câu đó. Sau 6 tháng không ai nhớ ai sửa gì, và staging lệch production ở những chỗ chỉ lộ ra lúc deploy hỏng.\
\
Đánh đổi phải nói thẳng trong phỏng vấn:\
- Mọi thay đổi phải qua pipeline, kể cả hotfix lúc 2 giờ sáng.\
- Team phải học thêm một tool và một mental model (desired state, không phải script).\
- Lúc mới adopt, `terraform plan` hay ra diff lạ vì code chưa khớp thực tế.\
\
Failure mode phổ biến nhất khi adopt: có người vẫn sửa tay trên console cho nhanh rồi không cập nhật code, drift tích tụ, plan lúc nào cũng bẩn, không ai dám apply, cuối cùng quay lại làm tay.

## Detailed Answer (EN)
Infrastructure becomes **reviewed, versioned, reproducible code**. One repo builds staging and production the same way, and `git log` answers \\"why does this security group open port 6379\\".\
\
Clicking cannot answer that. Six months later nobody remembers who changed what, and staging drifts from production in ways that only surface when a deploy breaks.\
\
The trade-off worth stating in an interview:\
- Every change goes through the pipeline, including a 2am hotfix.\
- The team learns a tool and a mental model (desired state, not a script).\
- Early in adoption `terraform plan` often shows odd diffs because code does not yet match reality.\
\
The most common adoption failure: someone still edits the console for speed and never backports it, drift piles up, plans are always dirty, nobody dares apply, and the team returns to manual work.
