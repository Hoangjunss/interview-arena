---
id: drift-detection-o-quy-mo-lon-nen-lam-the-nao-va-phan-loai-drift-ra-sao
position: backend
technology: drift
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Drift detection ở quy mô lớn nên làm thế nào, và phân loại drift ra sao?

## Question (EN)
How should drift detection work at scale, and how is drift classified?

## Đáp án chi tiết (VI)
Chạy plan theo lịch trên các state quan trọng và alert khi plan không rỗng:\
\
```bash\
terraform plan -detailed-exitcode\
# 0 = khong doi, 1 = loi, 2 = co diff -\u003e alert\
```\
\
Phát hiện sớm tốt hơn nhiều so với việc gặp drift đúng lúc đang cần deploy gấp một thay đổi khác.\
\
Không phải drift nào cũng do người sửa tay. Ba nguồn khác: provider bump thêm hoặc đổi default; dịch vụ tự đổi attribute (ASG scale làm `desired_capacity` lệch); và automation khác cùng sửa một resource (Karpenter, autoscaler, script backup).\
\
Vì thế phải **phân loại**: loại phải sửa, và loại nên bỏ qua vì attribute do dịch vụ tự quản lý.\
\
```hcl\
lifecycle {\
  ignore_changes = [desired_capacity, tags[\\"LastScanned\\"]]\
}\
```\
\
Lưu ý khi đặt alert: alert quá nhiều còn tệ hơn không có. Chín trên mười alert là bình thường thì team sẽ ngừng đọc.

## Detailed Answer (EN)
Run scheduled plans against important states and alert when the plan is non-empty:\
\
```bash\
terraform plan -detailed-exitcode\
# 0 = no changes, 1 = error, 2 = diff present -\u003e alert\
```\
\
Early detection beats discovering drift while urgently deploying something else.\
\
Not all drift is human. Three other sources: provider bumps adding or changing defaults; services changing attributes themselves (an ASG scaling moves `desired_capacity`); and other automation touching the same resources (Karpenter, autoscalers, backup scripts).\
\
So drift needs **classification**: what to fix, and what to ignore because the service owns that attribute.\
\
```hcl\
lifecycle {\
  ignore_changes = [desired_capacity, tags[\\"LastScanned\\"]]\
}\
```\
\
An alerting note: too many alerts are worse than none. If nine out of ten are routine, the team stops reading them.
