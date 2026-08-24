---
id: serverless-lambda-basics
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [serverless, lambda, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Serverless / AWS Lambda là gì? Khác gì so với chạy ứng dụng trên EC2?

## Question (EN)
What is serverless / AWS Lambda? How does it differ from running an application on EC2?

## Đáp án chi tiết (VI)
**Serverless** không có nghĩa là "không có server", mà là **bạn không phải quản lý server** — cloud provider tự động cấp phát, scale, và tính phí theo mức sử dụng thực tế (thường theo số lần gọi + thời gian thực thi).

**AWS Lambda** là dịch vụ serverless compute: bạn upload code (function), Lambda tự chạy khi có **trigger** (API Gateway, S3 event, SQS message, EventBridge schedule...), tự scale số instance chạy song song, và tự tắt khi không có traffic.

| Tiêu chí | Lambda (Serverless) | EC2 |
|---|---|---|
| Quản lý server | Không cần | Tự quản lý OS, patching |
| Scaling | Tự động, gần như tức thời | Cần cấu hình Auto Scaling Group |
| Chi phí khi idle | **$0** khi không có request | Vẫn trả tiền dù idle |
| Thời gian chạy tối đa | 15 phút/lần gọi | Không giới hạn |
| Cold start | Có (độ trễ lần gọi đầu) | Không (luôn "warm") |
| Use case | Event-driven, xử lý ngắn hạn, tần suất không đều | Ứng dụng chạy liên tục, tải ổn định, cần control OS |

**Ví dụ function đơn giản (Node.js):**
```javascript
exports.handler = async (event) => {
  const name = event.queryStringParameters?.name || "world";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};
```

**Ví dụ khai báo trigger qua API Gateway (SAM/Terraform rút gọn):**
```hcl
resource "aws_lambda_function" "hello" {
  function_name = "hello-world"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  filename      = "function.zip"
  memory_size   = 128
  timeout       = 10
}
```

**Khi nào KHÔNG nên dùng Lambda:**
- Ứng dụng cần chạy **liên tục, tải ổn định cao** — EC2/container thường rẻ hơn khi chạy 24/7.
- Xử lý cần **hơn 15 phút** (giới hạn cứng của Lambda) — nên dùng ECS/Fargate hoặc Step Functions để chia nhỏ.
- Ứng dụng nhạy cảm với **cold start** (yêu cầu latency cực thấp và ổn định) mà không dùng Provisioned Concurrency.

**Gotcha:** Lambda tính phí theo **GB-giây** (memory allocated x thời gian chạy) — tăng memory đôi khi làm function chạy nhanh hơn (CPU tỉ lệ với memory) và tổng chi phí lại thấp hơn dù giá/GB-giây cao hơn.

## Detailed Answer (EN)
**Serverless** doesn't mean "no servers" — it means **you don't manage the servers**. The cloud provider automatically provisions, scales, and bills based on actual usage (typically per invocation + execution time).

**AWS Lambda** is a serverless compute service: you upload code (a function), Lambda runs it when **triggered** (API Gateway, S3 event, SQS message, EventBridge schedule, etc.), automatically scales parallel executions, and shuts down when there's no traffic.

| Criteria | Lambda (Serverless) | EC2 |
|---|---|---|
| Server management | Not needed | You manage OS, patching yourself |
| Scaling | Automatic, near-instant | Requires configuring an Auto Scaling Group |
| Idle cost | **$0** with no requests | You pay even while idle |
| Max execution time | 15 minutes per invocation | Unlimited |
| Cold start | Yes (latency on first invocation) | No (always "warm") |
| Use case | Event-driven, short-lived, uneven traffic | Continuously-running apps, steady load, need OS control |

**Simple function example (Node.js):**
```javascript
exports.handler = async (event) => {
  const name = event.queryStringParameters?.name || "world";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};
```

**Example trigger declaration via API Gateway (abbreviated Terraform):**
```hcl
resource "aws_lambda_function" "hello" {
  function_name = "hello-world"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  filename      = "function.zip"
  memory_size   = 128
  timeout       = 10
}
```

**When NOT to use Lambda:**
- Applications that need to run **continuously with steady high load** — EC2/containers are usually cheaper running 24/7.
- Processing that needs **more than 15 minutes** (Lambda's hard limit) — use ECS/Fargate or Step Functions to break the work up.
- Latency-sensitive applications requiring extremely low, consistent latency without using Provisioned Concurrency.

**Pitfall:** Lambda bills by **GB-seconds** (allocated memory × execution time) — increasing memory sometimes makes a function run faster (CPU scales with memory), and the total cost can actually be lower despite a higher price per GB-second.
