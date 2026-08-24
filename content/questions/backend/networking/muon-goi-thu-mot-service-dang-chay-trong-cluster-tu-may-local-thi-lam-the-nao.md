---
id: muon-goi-thu-mot-service-dang-chay-trong-cluster-tu-may-local-thi-lam-the-nao
position: backend
technology: networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn gọi thử một Service đang chạy trong cluster từ máy local thì làm thế nào?

## Question (EN)
How do you call a Service running inside the cluster from your local machine?

## Đáp án chi tiết (VI)
Dùng **`kubectl port-forward`** — nó mở một tunnel từ port trên máy bạn tới Pod/Service trong cluster, đi qua API server nên **không cần mở firewall hay tạo Service public**.\
\
```bash\
kubectl port-forward svc/api 8080:80        # localhost:8080 -\u003e Service port 80\
kubectl port-forward pod/api-7c9d 5005:5005 # forward thang vao mot Pod\
```\
\
Đặc điểm cần nhớ:\
- Chỉ **tồn tại trong lúc lệnh còn chạy**, dành cho debug/dev — không phải cách expose production.\
- Forward tới Service thì kubectl chọn **một Pod** phía sau, không load-balance nhiều Pod.\
- Chỉ hoạt động với **TCP**.\
\
So sánh nhanh với các cách khác: **NodePort** mở port trên mọi node (dùng cho cluster nội bộ), **LoadBalancer** xin IP public từ cloud, **Ingress** gom nhiều service dưới một entrypoint HTTP. `port-forward` là lựa chọn nhẹ nhất khi chỉ cần kiểm tra tạm.

## Detailed Answer (EN)
Use **`kubectl port-forward`** — it opens a tunnel from a local port to a Pod/Service inside the cluster through the API server, so **no firewall change or public Service is needed**.\
\
```bash\
kubectl port-forward svc/api 8080:80        # localhost:8080 -\u003e Service port 80\
kubectl port-forward pod/api-7c9d 5005:5005 # forward straight to one Pod\
```\
\
Things to remember:\
- It **lives only while the command runs** — a debug/dev tool, not a way to expose production.\
- Forwarding to a Service picks **one Pod** behind it; it does not load-balance across Pods.\
- It works for **TCP** only.\
\
Quick comparison: **NodePort** opens a port on every node (internal clusters), **LoadBalancer** requests a public IP from the cloud, **Ingress** groups many services behind one HTTP entrypoint. `port-forward` is the lightest option for a quick check.
