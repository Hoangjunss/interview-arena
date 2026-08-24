---
id: what-is-iam-and-least-privilege
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [iam, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
IAM là gì và nguyên tắc "least privilege" (đặc quyền tối thiểu) nghĩa là gì? Cho ví dụ cụ thể trên AWS.

## Question (EN)
What is IAM and what does the "least privilege" principle mean? Give a concrete AWS example.

## Đáp án chi tiết (VI)
**IAM (Identity and Access Management)** là dịch vụ quản lý danh tính và quyền truy cập: định nghĩa **ai** (user, group, role, service) được phép làm **gì** (action) trên **tài nguyên nào** (resource), trong điều kiện nào (condition).

**Least privilege** nghĩa là mỗi identity chỉ được cấp đúng những quyền tối thiểu cần thiết để hoàn thành công việc — không hơn. Đây là nguyên tắc bảo mật nền tảng vì:
- Giảm **blast radius**: nếu credential bị lộ, kẻ tấn công chỉ làm được ít việc.
- Giảm rủi ro lỗi con người (ví dụ: xóa nhầm resource production).
- Dễ audit hơn khi quyền hạn rõ ràng, không dư thừa.

**Ví dụ sai (quá rộng quyền):**
```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```
Policy này cho phép làm mọi thao tác trên mọi bucket S3 trong account — nếu access key này lộ, toàn bộ dữ liệu S3 có nguy cơ bị xóa/đọc/ghi.

**Ví dụ đúng (least privilege):** một service chỉ cần đọc object từ một bucket cụ thể:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-app-uploads/*"
    }
  ]
}
```

**Thực hành khi làm việc:**
- Dùng **IAM Role** cho EC2/Lambda/ECS thay vì nhúng access key cứng vào code.
- Dùng **IAM Access Analyzer** để phát hiện quyền dư thừa hoặc policy cho phép truy cập từ bên ngoài không mong muốn.
- Ưu tiên **managed policy theo scope hẹp** hoặc tự viết policy thay vì dùng `AdministratorAccess` cho service account.
- Review định kỳ qua **CloudTrail** để biết action nào thực sự được gọi, từ đó cắt bớt quyền không dùng tới ("right-sizing" permissions).

**Gotcha thường gặp:** nhiều đội chọn cấp quyền rộng lúc đầu "cho tiện, fix sau" nhưng không bao giờ quay lại thu hẹp — dẫn đến hàng trăm role có quyền `*` trong production, đây là nguyên nhân phổ biến của các vụ rò rỉ dữ liệu cloud.

**Kỹ thuật siết quyền theo điều kiện (Condition):** ngoài Action/Resource, policy có thể thêm `Condition` để thu hẹp hơn nữa, ví dụ chỉ cho phép truy cập từ VPC nội bộ (`aws:SourceVpc`) hoặc bắt buộc MFA (`aws:MultiFactorAuthPresent: true`) cho các action nhạy cảm như xóa bucket. Đây là lớp phòng thủ bổ sung khi chỉ giới hạn Action/Resource là chưa đủ.

## Detailed Answer (EN)
**IAM (Identity and Access Management)** manages identities and access: it defines **who** (user, group, role, service) can do **what** (action) on **which resource**, under what conditions.

**Least privilege** means every identity is granted only the minimum permissions needed to do its job — nothing more. This is a foundational security principle because:
- It reduces the **blast radius**: if credentials leak, an attacker can do very little.
- It reduces human error risk (e.g., accidentally deleting a production resource).
- It's easier to audit when permissions are precise and non-redundant.

**Bad example (overly broad):**
```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```
This allows any action on any S3 bucket in the account — if this access key leaks, the entire S3 estate is at risk of deletion/read/write.

**Good example (least privilege):** a service that only needs to read objects from a specific bucket:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-app-uploads/*"
    }
  ]
}
```

**Practical guidelines:**
- Use **IAM Roles** for EC2/Lambda/ECS instead of hardcoding access keys in code.
- Use **IAM Access Analyzer** to detect overly permissive policies or unintended external access.
- Prefer **narrowly-scoped custom policies** over attaching `AdministratorAccess` to service accounts.
- Periodically review **CloudTrail** logs to see which actions are actually invoked, then right-size permissions by removing unused ones.

**Common pitfall:** many teams grant broad access early "for convenience, will tighten later" but never revisit it — leading to hundreds of roles with `*` permissions in production, a common root cause of cloud data breaches.

**Condition-based tightening:** beyond Action/Resource, a policy can add a `Condition` block to narrow access further — e.g. only allow access from an internal VPC (`aws:SourceVpc`) or require MFA (`aws:MultiFactorAuthPresent: true`) for sensitive actions like deleting a bucket. This is an extra layer of defense when limiting Action/Resource alone isn't enough.
