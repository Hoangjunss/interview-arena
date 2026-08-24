---
id: da-kubectl-apply-mot-ingress-nhung-truy-cap-domain-khong-ra-gi-vi-sao
position: backend
technology: ingress
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đã `kubectl apply` một Ingress nhưng truy cập domain không ra gì. Vì sao?

## Question (EN)
I applied an Ingress but the domain returns nothing. Why?

## Đáp án chi tiết (VI)
Ingress chỉ là **bản mô tả luật routing**, nó không tự xử lý request. Muốn nó có tác dụng phải có **Ingress controller** đang chạy trong cluster (ingress-nginx, Traefik, HAProxy, hoặc controller của cloud provider).\
\
Checklist khi Ingress \\"không làm gì\\":\
1. **Có controller chưa** — `kubectl get pods -A | grep ingress`. Cluster trống thì tạo Ingress bao nhiêu cũng vô nghĩa.\
2. **`ingressClassName` có khớp không** — Ingress không chỉ đúng class thì controller bỏ qua nó.\
3. **`ADDRESS` đã được gán chưa** — `kubectl get ingress`; cột ADDRESS rỗng nghĩa là chưa controller nào nhận.\
4. **DNS đã trỏ về IP của controller Service chưa** (thường là một Service `LoadBalancer`).\
5. **Backend Service có Endpoints không** — `kubectl get endpoints \u003csvc\u003e`; rỗng thì Ingress trả 503.\
\
Tóm lại: Ingress = luật, controller = thứ thực thi luật. Thiếu vế thứ hai thì không có gì chạy.

## Detailed Answer (EN)
An Ingress is only a **routing rule description** — it does not handle requests itself. It takes effect only when an **Ingress controller** is running in the cluster (ingress-nginx, Traefik, HAProxy, or a cloud provider controller).\
\
Checklist when an Ingress \\"does nothing\\":\
1. **Is a controller installed** — `kubectl get pods -A | grep ingress`. Without one, an Ingress object is inert.\
2. **Does `ingressClassName` match** — a controller ignores Ingresses that do not name its class.\
3. **Is `ADDRESS` populated** — `kubectl get ingress`; an empty ADDRESS means no controller claimed it.\
4. **Does DNS point at the controller Service IP** (usually a `LoadBalancer` Service).\
5. **Does the backend Service have Endpoints** — `kubectl get endpoints \u003csvc\u003e`; empty means the Ingress returns 503.\
\
In short: the Ingress is the rule, the controller is what enforces it. Missing the second half means nothing happens.
