---
id: ci-cd-la-gi-continuous-integration-delivery-va-deployment-khac-nhau-the-nao
position: backend
technology: devops-\u0026-tools
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI/CD là gì? Continuous Integration, Delivery và Deployment khác nhau thế nào?

## Question (EN)
What is CI/CD? How do continuous integration, delivery, and deployment differ?

## Đáp án chi tiết (VI)
- **Continuous Integration (CI)**: lập trình viên **merge thay đổi vào nhánh chính thường xuyên** (ít nhất mỗi ngày); mỗi lần merge **tự động build + chạy test**. Mục tiêu: phát hiện xung đột/lỗi tích hợp **sớm, khi còn nhỏ**, thay vì gộp một cục lớn cuối kỳ. Cần **code tự kiểm thử** và build tự động, nhanh.\
- **Continuous Delivery**: mở rộng CI để nhánh chính **luôn ở trạng thái sẵn sàng deploy**; đưa lên production là **một nút bấm/phê duyệt thủ công**.\
- **Continuous Deployment**: đi thêm một bước — mọi thay đổi qua được pipeline được **tự động lên production**, không cần can thiệp tay.\
\
**Pipeline** điển hình: `build → test (unit/integration) → quét bảo mật/lint → deploy (staging → prod)`, kết hợp chiến lược ít rủi ro (canary, blue-green). Lợi ích: phản hồi nhanh, thay đổi nhỏ dễ soát, release đều đặn và ít rủi ro hơn \\"big bang\\".

## Detailed Answer (EN)
- **Continuous Integration (CI)**: developers **merge changes into the mainline frequently** (at least daily); each merge **automatically builds + runs tests**. Goal: catch integration conflicts/bugs **early, while small**, instead of one big end-of-cycle merge. Requires **self-testing code** and a fast automated build.\
- **Continuous Delivery**: extends CI so the mainline is **always in a deployable state**; shipping to production is **a button press/manual approval**.\
- **Continuous Deployment**: one step further — every change that passes the pipeline goes to **production automatically**, no manual gate.\
\
A typical **pipeline**: `build → test (unit/integration) → security scan/lint → deploy (staging → prod)`, combined with low-risk strategies (canary, blue-green). Benefits: fast feedback, small reviewable changes, and steady, lower-risk releases versus a \\"big bang\\".
