---
id: red-method-usemethod
position: devops
technology: monitoring-observability
level: mid
tags: [sre, metrics, methodology]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RED method và USE method là gì? Khi nào dùng cái nào để thiết kế dashboard giám sát?

## Question (EN)
What are the RED method and the USE method? When would you use each one to design a monitoring dashboard?

## Đáp án chi tiết (VI)
Cả hai đều là khung (framework) giúp trả lời câu hỏi "nên giám sát chỉ số nào", nhưng nhắm vào hai loại đối tượng khác nhau.

**RED method** (dùng cho **service**, request-driven — do Tom Wilkie đề xuất, lấy cảm hứng từ Four Golden Signals):
| Chữ | Ý nghĩa | Ví dụ PromQL |
|---|---|---|
| **R**ate | Số request/giây | `sum(rate(http_requests_total[5m]))` |
| **E**rrors | Số/tỉ lệ request lỗi | `sum(rate(http_requests_total{status=~"5.."}[5m]))` |
| **D**uration | Thời gian xử lý (phân vị) | `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))` |

→ Áp dụng cho: API, microservice, bất kỳ thứ gì nhận request và trả response.

**USE method** (dùng cho **tài nguyên hạ tầng** — do Brendan Gregg đề xuất, dùng khi debug performance ở tầng hệ điều hành/hardware):
| Chữ | Ý nghĩa | Ví dụ |
|---|---|---|
| **U**tilization | % thời gian tài nguyên bận | CPU utilization %, disk busy % |
| **S**aturation | Mức độ công việc phải chờ (hàng đợi) | Load average, disk I/O queue length |
| **E**rrors | Số lỗi phần cứng/hệ thống | Số lỗi ECC memory, packet drop trên NIC |

→ Áp dụng cho: CPU, memory, disk, network interface, connection pool, thread pool — mọi thứ có khái niệm "tài nguyên hữu hạn".

**Khi nào dùng cái nào**:
- Đang thiết kế dashboard cho **1 service/API cụ thể** → dùng RED (trả lời "service này có đang phục vụ tốt không").
- Đang debug **vì sao service chậm ở tầng hạ tầng** → dùng USE để rà từng tài nguyên (CPU đang bận 95%? disk I/O đang nghẽn? connection pool cạn?).
- Thực tế, hai method **bổ trợ nhau theo chiều dọc**: RED cho biết "API `/checkout` đang lỗi 5%", sau đó dùng USE để tìm nguyên nhân hạ tầng — có thể là connection pool tới DB đã saturated (USE: Saturation cao ở resource "DB connection pool").

**Ví dụ minh họa kết hợp**: API `/checkout` (RED) có Duration p99 tăng gấp 5 lần. Drill-down bằng USE trên các resource liên quan: CPU app server ở mức bình thường (60%), nhưng connection pool tới Postgres có Saturation = 100% (toàn bộ connection đang bận, request phải chờ) — đây chính là nguyên nhân gốc.

**Pitfall**: nhầm lẫn áp RED cho tài nguyên hạ tầng (CPU không có khái niệm "request rate" rõ ràng) hoặc áp USE cho tầng ứng dụng logic nghiệp vụ (không có khái niệm utilization rõ ràng cho business logic) — chọn sai method sẽ dẫn đến dashboard không có ý nghĩa.

## Detailed Answer (EN)
Both are frameworks for answering "which metrics should I monitor", but they target two different kinds of subjects.

**RED method** (for **services**, request-driven — proposed by Tom Wilkie, inspired by the Four Golden Signals):
| Letter | Meaning | Example PromQL |
|---|---|---|
| **R**ate | Requests per second | `sum(rate(http_requests_total[5m]))` |
| **E**rrors | Count/ratio of failed requests | `sum(rate(http_requests_total{status=~"5.."}[5m]))` |
| **D**uration | Processing time (percentiles) | `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))` |

→ Applies to: APIs, microservices, anything that accepts a request and returns a response.

**USE method** (for **infrastructure resources** — proposed by Brendan Gregg, used when debugging performance at the OS/hardware layer):
| Letter | Meaning | Example |
|---|---|---|
| **U**tilization | % of time the resource is busy | CPU utilization %, disk busy % |
| **S**aturation | Amount of work queued/waiting | Load average, disk I/O queue length |
| **E**rrors | Hardware/system-level error count | ECC memory errors, dropped packets on a NIC |

→ Applies to: CPU, memory, disk, network interfaces, connection pools, thread pools — anything with the concept of a finite resource.

**When to use which**:
- Designing a dashboard for **one specific service/API** → use RED ("is this service serving requests well?").
- Debugging **why a service is slow at the infrastructure level** → use USE to sweep each resource (is CPU at 95%? is disk I/O congested? is the connection pool exhausted?).
- In practice, the two methods **complement each other vertically**: RED tells you "`/checkout` is erroring at 5%", then USE helps find the infrastructure root cause — perhaps the DB connection pool is saturated (USE: high Saturation on the "DB connection pool" resource).

**Combined example**: The `/checkout` API's (RED) p99 Duration jumps 5x. Drilling down with USE across related resources: the app server's CPU is normal (60%), but the Postgres connection pool's Saturation is 100% (all connections busy, requests queueing) — that's the actual root cause.

**Pitfall**: applying RED to infrastructure resources (CPU has no clean "request rate" concept) or applying USE to application-level business logic (no clear utilization concept for business logic) leads to a meaningless dashboard — pick the right method for the right subject.
