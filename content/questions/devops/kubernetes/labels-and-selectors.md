---
id: labels-and-selectors
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, fundamentals, labels]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Label, annotation và selector trong Kubernetes khác nhau như thế nào? Cho ví dụ một tình huống dùng selector sai gây lỗi thực tế.

## Question (EN)
How do labels, annotations, and selectors differ in Kubernetes? Give an example of a real bug caused by a wrong selector.

## Đáp án chi tiết (VI)
| | **Label** | **Annotation** |
|---|---|---|
| Mục đích | Định danh, phân loại object để **query/select** | Gắn metadata bổ sung, **không dùng để select** |
| Dùng bởi | Service selector, Deployment selector, `kubectl get -l` | Công cụ bên ngoài đọc (Ingress controller config, Prometheus scrape config, changelog, owner info) |
| Ràng buộc | Key/value ngắn, theo format quy định (63 ký tự, alphanumeric + `-_.`) | Không giới hạn nhiều, có thể chứa JSON/text dài |
| Ví dụ | `app: api`, `env: prod`, `tier: backend` | `kubernetes.io/change-cause: "fix bug #123"`, `prometheus.io/scrape: "true"` |

**Selector** là cách các object khác **tham chiếu tới** Pod dựa trên label:
- **Equality-based**: `app=api,env=prod`
- **Set-based** (linh hoạt hơn, dùng trong `matchExpressions`): `env in (prod, staging)`, `tier notin (frontend)`

Selector xuất hiện ở nhiều chỗ quan trọng: `Service.spec.selector`, `Deployment.spec.selector`, `NetworkPolicy.spec.podSelector`, `nodeSelector`/`affinity`.

**Ví dụ lỗi thực tế do selector sai** — tình huống rất hay gặp:
```yaml
# Service
spec:
  selector:
    app: api
    version: v2      # <-- lỡ thêm field này khi copy-paste

# Deployment Pod template
metadata:
  labels:
    app: api
    version: v1       # <-- Pod thực tế đang chạy version v1
```
Kết quả: `kubectl get endpoints api-svc` trả về **rỗng** — Service không tìm thấy Pod nào khớp đủ **tất cả** label trong selector (selector là phép AND, không phải OR). Traffic gọi vào Service bị timeout/connection refused dù Pod vẫn `Running` và healthy bình thường — người mới dễ đi tìm lỗi ở tầng network/firewall trong khi gốc rễ chỉ là label mismatch.

**Cách debug chuẩn**:
```bash
kubectl get svc api-svc -o yaml | grep -A3 selector   # xem Service đang chọn label gì
kubectl get pods --show-labels                        # xem Pod thực tế có label gì
kubectl get endpoints api-svc                          # rỗng => xác nhận vấn đề nằm ở selector/label
```

**Lưu ý thêm**: `Deployment.spec.selector` là **immutable** sau khi tạo và **phải là tập con** của `template.metadata.labels` — nếu không, `kubectl apply` sẽ báo lỗi validation ngay từ đầu.

## Detailed Answer (EN)
| | **Label** | **Annotation** |
|---|---|---|
| Purpose | Identify/categorize objects for **querying/selecting** | Attach extra metadata, **not used for selection** |
| Used by | Service selector, Deployment selector, `kubectl get -l` | External tools that read it (Ingress controller config, Prometheus scrape config, changelog, owner info) |
| Constraints | Short key/value, restricted format (63 chars, alphanumeric + `-_.`) | Far less restrictive, can hold JSON/long text |
| Example | `app: api`, `env: prod`, `tier: backend` | `kubernetes.io/change-cause: "fix bug #123"`, `prometheus.io/scrape: "true"` |

A **selector** is how other objects **reference** Pods based on labels:
- **Equality-based**: `app=api,env=prod`
- **Set-based** (more flexible, used in `matchExpressions`): `env in (prod, staging)`, `tier notin (frontend)`

Selectors appear in many critical places: `Service.spec.selector`, `Deployment.spec.selector`, `NetworkPolicy.spec.podSelector`, `nodeSelector`/`affinity`.

**Example of a real bug from a wrong selector** — a very common scenario:
```yaml
# Service
spec:
  selector:
    app: api
    version: v2      # <-- accidentally added during copy-paste

# Deployment Pod template
metadata:
  labels:
    app: api
    version: v1       # <-- Pods actually running are v1
```
Result: `kubectl get endpoints api-svc` returns **empty** — the Service finds no Pod matching **all** labels in the selector (selectors are AND, not OR). Calls to the Service time out/get connection-refused even though the Pods are `Running` and healthy — beginners often go hunting for the bug at the network/firewall layer while the root cause is simply a label mismatch.

**Standard debugging flow**:
```bash
kubectl get svc api-svc -o yaml | grep -A3 selector   # what labels does the Service select?
kubectl get pods --show-labels                        # what labels do the actual Pods carry?
kubectl get endpoints api-svc                          # empty => confirms a selector/label mismatch
```

**Additional note**: `Deployment.spec.selector` is **immutable** after creation and **must be a subset** of `template.metadata.labels` — otherwise `kubectl apply` rejects it with a validation error upfront.
