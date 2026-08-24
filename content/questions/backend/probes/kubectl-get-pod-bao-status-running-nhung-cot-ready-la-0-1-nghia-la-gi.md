---
id: kubectl-get-pod-bao-status-running-nhung-cot-ready-la-0-1-nghia-la-gi
position: backend
technology: probes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`kubectl get pod` báo STATUS `Running` nhưng cột READY là `0/1` — nghĩa là gì?

## Question (EN)
`kubectl get pod` shows STATUS `Running` but READY is `0/1` — what does that mean?

## Đáp án chi tiết (VI)
Container **đã chạy** nhưng **readiness probe chưa pass**, nên Pod chưa được coi là sẵn sàng nhận traffic.\
\
Hai cột nói hai chuyện khác nhau:\
- **STATUS** = trạng thái vòng đời của Pod (`Pending`, `Running`, `Succeeded`...). `Running` chỉ có nghĩa container đã được start.\
- **READY `x/y`** = số container đã pass readiness trên tổng số container. `0/1` nghĩa là Service **sẽ không route** request vào Pod này — nó bị loại khỏi danh sách Endpoints.\
\
Kiểm tra theo thứ tự:\
\
```bash\
kubectl describe pod \u003cname\u003e   # xem Events: \\"Readiness probe failed: ...\\"\
kubectl logs \u003cname\u003e           # app đã listen đúng port chưa\
```\
\
Nguyên nhân hay gặp: probe trỏ sai `path`/`port`, app cần thời gian khởi động lâu hơn `initialDelaySeconds`, hoặc endpoint health phụ thuộc một dependency đang lỗi. Nếu READY mãi `0/1` mà không restart thì gần như chắc chắn là readiness (liveness fail sẽ làm container restart và cột RESTARTS tăng).

## Detailed Answer (EN)
The container **is running**, but its **readiness probe has not passed**, so the Pod is not considered ready to serve traffic.\
\
The two columns report different things:\
- **STATUS** = the Pod lifecycle phase (`Pending`, `Running`, `Succeeded`...). `Running` only means containers were started.\
- **READY `x/y`** = how many containers passed readiness out of the total. `0/1` means the Service **will not route** requests to this Pod — it is excluded from the Endpoints list.\
\
Check in this order:\
\
```bash\
kubectl describe pod \u003cname\u003e   # look at Events: \\"Readiness probe failed: ...\\"\
kubectl logs \u003cname\u003e           # is the app actually listening on the port\
```\
\
Common causes: the probe points at the wrong `path`/`port`, the app boots slower than `initialDelaySeconds`, or the health endpoint depends on a broken dependency. If READY stays `0/1` without restarts, it is almost certainly readiness — a failing liveness probe restarts the container and bumps the RESTARTS column.
