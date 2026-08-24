---
id: cloud-shared-responsibility-model
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [security, compliance, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shared Responsibility Model trong cloud là gì? Ranh giới trách nhiệm giữa AWS và khách hàng nằm ở đâu?

## Question (EN)
What is the Shared Responsibility Model in cloud computing? Where does the responsibility boundary between AWS and the customer lie?

## Đáp án chi tiết (VI)
**Shared Responsibility Model** là nguyên tắc phân chia trách nhiệm bảo mật giữa **cloud provider** và **khách hàng**: provider chịu trách nhiệm bảo mật **"of the Cloud"** (hạ tầng vật lý), khách hàng chịu trách nhiệm bảo mật **"in the Cloud"** (cách họ cấu hình, sử dụng dịch vụ).

| Trách nhiệm của AWS | Trách nhiệm của khách hàng |
|---|---|
| Bảo mật vật lý data center | Cấu hình IAM, least privilege |
| Phần cứng, network hạ tầng | Cấu hình Security Group/NACL đúng |
| Hypervisor, ảo hóa | Patching OS/application (với EC2 — trừ managed service) |
| Availability của managed service (RDS, S3 uptime) | Mã hóa dữ liệu (encryption at rest/in transit) |
| Global infrastructure compliance (chứng chỉ ISO, SOC) | Quản lý dữ liệu khách hàng, phân loại dữ liệu nhạy cảm |
| | Cấu hình đúng access control cho S3 bucket, database |

**Mức độ trách nhiệm thay đổi theo loại dịch vụ:**
- **IaaS (EC2)**: khách hàng chịu trách nhiệm nhiều hơn — tự patch OS, tự cấu hình firewall trên instance.
- **PaaS (RDS, Lambda)**: AWS quản lý OS/runtime, khách hàng chỉ lo cấu hình access, dữ liệu.
- **SaaS**: AWS quản lý gần như toàn bộ, khách hàng chủ yếu lo quản lý user/quyền truy cập.

**Ví dụ thực tế vi phạm mô hình này:** vụ rò rỉ dữ liệu nổi tiếng do **S3 bucket để public** không phải lỗi của AWS (hạ tầng S3 vẫn an toàn) mà là lỗi cấu hình phía khách hàng — đúng với "security IN the cloud" thuộc về khách hàng.

**Gotcha phỏng vấn:** nhiều người nhầm "dùng managed service thì không cần lo bảo mật" — sai, dù dùng RDS, bạn vẫn phải tự cấu hình security group, IAM policy, encryption, backup retention đúng cách.

## Detailed Answer (EN)
The **Shared Responsibility Model** divides security responsibilities between the **cloud provider** and the **customer**: the provider is responsible for security **"of the Cloud"** (physical infrastructure), while the customer is responsible for security **"in the Cloud"** (how they configure and use services).

| AWS's responsibility | Customer's responsibility |
|---|---|
| Physical data center security | IAM configuration, least privilege |
| Hardware, network infrastructure | Correct Security Group/NACL configuration |
| Hypervisor, virtualization | OS/application patching (for EC2 — not for managed services) |
| Availability of managed services (RDS, S3 uptime) | Data encryption (at rest/in transit) |
| Global infrastructure compliance (ISO, SOC certifications) | Managing customer data, classifying sensitive data |
| | Correctly configuring access control for S3 buckets, databases |

**Responsibility split shifts depending on service type:**
- **IaaS (EC2)**: customer bears more responsibility — patches the OS, configures firewall on the instance themselves.
- **PaaS (RDS, Lambda)**: AWS manages OS/runtime, customer only handles access configuration and data.
- **SaaS**: AWS manages nearly everything, customer mainly handles user/permission management.

**Real-world example violating this model:** a famous data breach caused by a **publicly exposed S3 bucket** was not AWS's fault (S3's underlying infrastructure remained secure) — it was a customer-side misconfiguration, exactly matching "security IN the cloud" being the customer's responsibility.

**Common interview pitfall:** many people assume "using a managed service means I don't need to worry about security" — wrong; even with RDS, you're still responsible for correctly configuring security groups, IAM policies, encryption, and backup retention.
