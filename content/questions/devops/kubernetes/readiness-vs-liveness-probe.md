---
id: readiness-vs-liveness-probe
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, probes, reliability]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Liveness probe và readiness probe khác nhau như thế nào? Điều gì xảy ra nếu bạn cấu hình sai (ví dụ dùng chung một endpoint, hoặc set threshold quá thấp)?

## Question (EN)
What's the difference between a liveness probe and a readiness probe? What goes wrong if you misconfigure them (e.g. reusing the same endpoint for both, or setting thresholds too aggressively)?

## Đáp án chi tiết (VI)
| | **Liveness Probe** | **Readiness Probe** |
|---|---|---|
| Câu hỏi trả lời | "Container còn sống không?" | "Container đã sẵn sàng nhận traffic chưa?" |
| Khi fail | kubelet **kill và restart container** | Pod bị **gỡ khỏi Endpoints của Service** (không nhận traffic mới) nhưng **không bị restart** |
| Mục đích | Phát hiện deadlock/hang cần restart để tự phục hồi | Tránh gửi traffic vào Pod chưa load xong config/cache/kết nối DB |

**Còn có Startup Probe** (thường bị quên): dùng cho ứng dụng khởi động chậm — trong lúc startup probe chưa pass, liveness/readiness probe bị **tạm ngưng** để tránh app bị kill oan khi đang warm-up (ví dụ JVM load cache 60s).

Ví dụ cấu hình đầy đủ:
```yaml
livenessProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 3
  timeoutSeconds: 2

readinessProbe:
  httpGet:
    path: /healthz/ready
    port: 8080
  periodSeconds: 5
  failureThreshold: 2

startupProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  periodSeconds: 5
  failureThreshold: 30   # cho phép tới 150s để app khởi động
```

**Các lỗi cấu hình phổ biến — điểm mấu chốt khi phỏng vấn**:
1. **Dùng chung 1 endpoint cho cả hai probe, và endpoint đó check luôn cả kết nối DB**: khi DB chậm/tạm mất kết nối, liveness probe fail theo → kubelet **restart cả cụm Pod cùng lúc** dù ứng dụng vẫn "sống", chỉ là dependency down → gây **crash loop diện rộng** thay vì chỉ tạm ngưng nhận traffic. Đây là lỗi kinh điển: **liveness probe không nên check dependency ngoài**, chỉ nên check "process này còn phản hồi request cơ bản không". Readiness probe mới nên check dependency.
2. **`failureThreshold`/`periodSeconds` quá thấp** (ví dụ fail sau 2 lần x 2s = 4s): dưới tải cao, app phản hồi chậm hơn bình thường (GC pause, spike traffic) → bị kill hàng loạt → gây thêm tải cho các Pod còn lại → **cascading failure**.
3. **Không có readiness probe**: Pod nhận traffic ngay khi `Running`, dù app chưa load xong cấu hình/kết nối pool DB → trả lỗi 500 cho một số request đầu trong mỗi lần rolling update.
4. **`initialDelaySeconds` quá ngắn** cho app khởi động chậm (Spring Boot, JVM): liveness probe fail ngay trong lúc app đang boot → restart loop vô tận, không bao giờ app kịp lên.

**Debug thực tế**:
```bash
kubectl describe pod <pod>   # xem event "Liveness probe failed" / "Readiness probe failed"
kubectl logs <pod> --previous  # xem log trước khi bị kill (nếu do liveness)
```

## Detailed Answer (EN)
| | **Liveness Probe** | **Readiness Probe** |
|---|---|---|
| Question answered | "Is the container still alive?" | "Is the container ready to receive traffic?" |
| On failure | kubelet **kills and restarts the container** | Pod is **removed from the Service's Endpoints** (no new traffic) but **not restarted** |
| Purpose | Detect deadlocks/hangs that need a restart to recover | Avoid sending traffic to a Pod that hasn't finished loading config/cache/DB connections |

There's also a **Startup Probe** (often forgotten): for slow-starting apps — while the startup probe hasn't passed, the liveness/readiness probes are **suspended**, preventing the app from being killed unfairly while it's still warming up (e.g. a JVM loading a 60s cache).

Full example configuration:
```yaml
livenessProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 3
  timeoutSeconds: 2

readinessProbe:
  httpGet:
    path: /healthz/ready
    port: 8080
  periodSeconds: 5
  failureThreshold: 2

startupProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  periodSeconds: 5
  failureThreshold: 30   # allows up to 150s for the app to start
```

**Common misconfigurations — the key interview point**:
1. **Sharing one endpoint for both probes, and that endpoint also checks the DB connection**: when the DB is slow/briefly unreachable, the liveness probe fails too → kubelet **restarts the whole Pod fleet at once** even though the app itself is fine, only a dependency is down → causing a **fleet-wide crash loop** instead of just pausing traffic. This is the classic mistake: **liveness probes should never check external dependencies**, only "is this process still responding to a basic request". Dependency checks belong in the readiness probe.
2. **`failureThreshold`/`periodSeconds` too aggressive** (e.g. fail after 2 × 2s = 4s): under load, the app naturally responds slower (GC pause, traffic spike) → gets killed en masse → adds more load to the remaining Pods → **cascading failure**.
3. **No readiness probe at all**: the Pod receives traffic as soon as it's `Running`, even if the app hasn't finished loading config/DB connection pools → returns 500s for the first requests on every rolling update.
4. **`initialDelaySeconds` too short** for a slow-starting app (Spring Boot, JVM): the liveness probe fails while the app is still booting → an endless restart loop, the app never gets a chance to come up.

**Real-world debugging**:
```bash
kubectl describe pod <pod>     # look for "Liveness probe failed" / "Readiness probe failed" events
kubectl logs <pod> --previous  # inspect logs before it was killed (if liveness-caused)
```
