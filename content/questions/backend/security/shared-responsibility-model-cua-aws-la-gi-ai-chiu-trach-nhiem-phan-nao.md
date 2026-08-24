---
id: shared-responsibility-model-cua-aws-la-gi-ai-chiu-trach-nhiem-phan-nao
position: backend
technology: security
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shared Responsibility Model của AWS là gì? Ai chịu trách nhiệm phần nào?

## Question (EN)
What is the AWS Shared Responsibility Model? Who is responsible for what?

## Đáp án chi tiết (VI)
Shared Responsibility Model là ranh giới phân chia trách nhiệm bảo mật giữa AWS và khách hàng. Nguyên tắc gọn: AWS lo **security *of* the cloud**, khách hàng lo **security *in* the cloud**.\
\
- **AWS chịu trách nhiệm** phần hạ tầng nền: data center vật lý, phần cứng, mạng lõi, và phần mềm nền của các managed service (hypervisor, host OS).\
- **Khách hàng chịu trách nhiệm** những gì mình cấu hình và đưa lên: OS guest và bản vá của EC2, cấu hình Security Group, quản lý IAM (user, role, key), mã hóa dữ liệu, và chính dữ liệu ứng dụng.\
\
Ranh giới **dịch chuyển theo loại dịch vụ**. Với EC2 (IaaS) khách hàng phải tự vá OS. Với dịch vụ managed như S3, RDS, Lambda, AWS lo thêm phần OS/runtime, nhưng khách hàng **vẫn luôn** chịu trách nhiệm cấu hình quyền truy cập và dữ liệu — ví dụ một S3 bucket để public là lỗi phía khách hàng, không phải AWS.

## Detailed Answer (EN)
The Shared Responsibility Model is the line that splits security duties between AWS and the customer. The short rule: AWS handles **security *of* the cloud**, the customer handles **security *in* the cloud**.\
\
- **AWS is responsible** for the foundational infrastructure: physical data centers, hardware, the core network, and the underlying software of managed services (hypervisor, host OS).\
- **The customer is responsible** for what they configure and put on top: the guest OS and its patches on EC2, Security Group configuration, IAM management (users, roles, keys), data encryption, and the application data itself.\
\
The boundary **shifts with the service type**. With EC2 (IaaS) the customer patches the OS. With managed services like S3, RDS, and Lambda, AWS also covers the OS/runtime, but the customer is **always** responsible for access configuration and data — e.g. leaving an S3 bucket public is a customer-side mistake, not an AWS one.
