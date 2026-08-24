---
id: aws-lambda-va-serverless-la-gi
position: backend
technology: compute
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AWS Lambda và serverless là gì?

## Question (EN)
What are AWS Lambda and serverless?

## Đáp án chi tiết (VI)
Lambda là **Function as a Service (FaaS)**: bạn upload code hàm, AWS **tự chạy khi có sự kiện** và tự lo server/scale.\
\
- **Event-driven**: trigger từ API Gateway (HTTP), S3 (file mới), SQS/SNS, EventBridge (cron), DynamoDB stream...\
- **Scale tự động**: mỗi request/sự kiện có thể chạy một instance hàm song song, từ 0 tới hàng nghìn.\
- **Trả tiền theo lượng dùng**: tính theo số lần gọi và thời gian chạy (ms) — **không tốn tiền khi rảnh**.\
\
Hạn chế cần biết: **timeout** (tối đa 15 phút), **cold start** (độ trễ lần khởi động đầu), state ngoài phải để ở dịch vụ khác (S3/DynamoDB). \\"Serverless\\" không phải không có server — mà là **bạn không quản server**. Hợp việc ngắn, rời rạc, tải biến động.

## Detailed Answer (EN)
Lambda is **Function as a Service (FaaS)**: you upload function code and AWS **runs it on events**, managing servers and scaling for you.\
\
- **Event-driven**: triggered by API Gateway (HTTP), S3 (new file), SQS/SNS, EventBridge (cron), DynamoDB streams...\
- **Automatic scaling**: each request/event can run a parallel function instance, from 0 to thousands.\
- **Pay per use**: billed by number of invocations and run time (ms) — **no cost when idle**.\
\
Known limits: a **timeout** (max 15 minutes), **cold starts** (first-invocation latency), and external state must live elsewhere (S3/DynamoDB). \\"Serverless\\" does not mean no servers — it means **you do not manage the servers**. Fits short, discrete tasks with variable load.
