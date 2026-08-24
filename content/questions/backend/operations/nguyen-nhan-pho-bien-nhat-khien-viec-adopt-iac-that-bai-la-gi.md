---
id: nguyen-nhan-pho-bien-nhat-khien-viec-adopt-iac-that-bai-la-gi
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên nhân phổ biến nhất khiến việc adopt IaC thất bại là gì?

## Question (EN)
What most commonly causes IaC adoption to fail?

## Đáp án chi tiết (VI)
Vẫn còn người sửa tay, nên code lệch dần với thực tế. Vòng xoáy diễn ra như sau: plan lúc nào cũng đầy diff lạ, không ai dám apply, mọi người quay lại làm tay, và tool thành gánh nặng thay vì trợ giúp.\
\
Các yếu tố khiến vòng xoáy bắt đầu:\
- Pipeline chạy quá chậm nên lúc gấp người ta bỏ qua.\
- Quyền write trên console production vẫn còn nguyên.\
- Không có break-glass chính thức cho tình huống khẩn cấp.\
\
Phòng theo thứ tự hiệu quả:\
1. **Siết IAM** để sửa tay thành bất khả thi, chứ không chỉ bị cấm bằng lời.\
2. Làm pipeline đủ nhanh để không ai muốn né.\
3. Chuẩn bị sẵn break-glass có ghi log.\
\
Thực hành văn hoá quan trọng: sau mỗi lần phải sửa tay lúc sự cố, việc backport vào code phải là **một task có người chịu trách nhiệm và có deadline**, không phải một lời hứa trong post-mortem.

## Detailed Answer (EN)
People still editing by hand, so the code drifts from reality. The spiral goes: plans are always full of odd diffs, nobody dares apply, everyone reverts to manual work, and the tool becomes a burden rather than help.\
\
Factors that start the spiral:\
- The pipeline is too slow, so people bypass it under pressure.\
- Write access to the production console is still intact.\
- There is no official break-glass path for emergencies.\
\
Prevention in order of effectiveness:\
1. **Tighten IAM** so manual edits are impossible, not merely discouraged.\
2. Make the pipeline fast enough that nobody wants to avoid it.\
3. Prepare a logged break-glass path.\
\
An important cultural practice: after every emergency manual fix, backporting it into code must be **a task with an owner and a deadline**, not a promise in a post-mortem.
