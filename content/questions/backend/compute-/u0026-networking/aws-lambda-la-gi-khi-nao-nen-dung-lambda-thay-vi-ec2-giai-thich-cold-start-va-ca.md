---
id: aws-lambda-la-gi-khi-nao-nen-dung-lambda-thay-vi-ec2-giai-thich-cold-start-va-ca
position: backend
technology: compute-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AWS Lambda là gì? Khi nào nên dùng Lambda thay vì EC2? Giải thích cold start và cách giảm thiểu.

## Question (EN)
What is AWS Lambda? When should you use Lambda instead of EC2? Explain cold starts and how to mitigate them.

## Đáp án chi tiết (VI)
AWS Lambda là dịch vụ serverless compute cho phép chạy code mà không cần quản lý server; bạn chỉ upload function code, Lambda tự handle provisioning, scaling, và availability. Lambda phù hợp cho: event-driven workload (S3 trigger, SQS consumer, API Gateway), task ngắn (\u003c15 phút), traffic không đồng đều hoặc rất thấp, và khi muốn giảm operational overhead. Nên dùng EC2 khi cần kiểm soát OS/runtime, workload chạy liên tục 24/7, cần persistent storage local, hoặc cần network configuration phức tạp. Cold start xảy ra khi Lambda phải khởi tạo execution environment mới (init container, load code, khởi động runtime) — thường mất 100ms-1s tùy runtime; Java và .NET thường chậm hơn Node.js/Python. Giảm cold start bằng: dùng Provisioned Concurrency (giữ sẵn N instances ấm), chọn runtime nhẹ (Node.js, Python), giảm package size, tách cold-path code ra khỏi handler, dùng Lambda SnapStart cho Java. Chi phí Lambda tính theo số lần gọi + GB-seconds thực thi, miễn phí 1 triệu request/tháng.

## Detailed Answer (EN)
$7a
