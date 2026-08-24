---
id: imagepullpolicy-explained
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, containers, images]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`imagePullPolicy` có những giá trị nào và mặc định là gì? Vì sao dùng tag `:latest` trong production lại bị coi là anti-pattern?

## Question (EN)
What values can `imagePullPolicy` take, and what's the default? Why is using the `:latest` tag in production considered an anti-pattern?

## Đáp án chi tiết (VI)
`imagePullPolicy` quyết định kubelet có pull lại image trước khi tạo container hay không:

| Giá trị | Hành vi |
|---|---|
| `IfNotPresent` | Chỉ pull nếu image chưa có trong cache local của node |
| `Always` | **Luôn** pull lại từ registry, dù đã có local — kubelet gọi registry để check digest, nếu trùng thì dùng cache, không trùng thì pull mới |
| `Never` | Không bao giờ pull, chỉ dùng image đã có sẵn local — fail nếu chưa có |

**Giá trị mặc định phụ thuộc vào tag**:
- Nếu tag là `:latest` hoặc **không ghi tag** → mặc định `Always`.
- Nếu tag cụ thể (VD `:1.4.0`) → mặc định `IfNotPresent`.

**Vì sao `:latest` là anti-pattern trong production** (câu hỏi rất hay gặp):
1. **Không tái lập được (non-reproducible)**: `:latest` trỏ tới image nào tùy thời điểm push — 2 lần deploy cùng manifest YAML có thể chạy 2 image code khác nhau hoàn toàn. Rollback bằng `kubectl rollout undo` sẽ **không hoạt động đúng** vì ReplicaSet cũ vẫn ghi `:latest`, khi tạo lại Pod nó pull bản mới nhất (có thể chính là bản lỗi) chứ không phải bản cũ đã chạy ổn định.
2. **`imagePullPolicy: Always` bắt buộc theo `:latest`** → mỗi lần Pod bị restart/reschedule (kể cả do node reboot, không liên quan gì tới deploy) đều phải gọi registry, tăng độ trễ khởi động và **rủi ro registry down làm Pod không start được** dù code không đổi.
3. **Khó audit**: không biết chính xác image nào đang chạy ở Pod nào tại một thời điểm, gây khó khăn khi debug incident ("bug này xuất hiện từ commit nào?").
4. **Cache mismatch giữa các node**: node A pull `:latest` lúc 9h sáng, node B pull lúc 5h chiều — hai Pod trong cùng Deployment chạy **code khác nhau** dù cùng tag.

**Best practice**: luôn dùng tag bất biến — semantic version (`1.4.0`) hoặc tốt hơn là **image digest** (`myrepo/api@sha256:abcd1234...`) để đảm bảo 100% cùng 1 image binary, kết hợp CI/CD tự động tag theo git commit SHA.

```yaml
containers:
  - name: api
    image: myrepo/api@sha256:9f2c1a...   # digest — không thể đổi ngầm
    imagePullPolicy: IfNotPresent
```

## Detailed Answer (EN)
`imagePullPolicy` controls whether kubelet re-pulls an image before creating a container:

| Value | Behavior |
|---|---|
| `IfNotPresent` | Only pull if the image isn't already cached locally on the node |
| `Always` | **Always** pull from the registry, even if cached locally — kubelet checks the digest against the registry; if it matches, the cache is used, otherwise a fresh pull happens |
| `Never` | Never pull, only use an image already present locally — fails if it's not there |

**The default depends on the tag**:
- If the tag is `:latest` or **no tag is given** → defaults to `Always`.
- If a specific tag is used (e.g. `:1.4.0`) → defaults to `IfNotPresent`.

**Why `:latest` is an anti-pattern in production** (a very common interview point):
1. **Non-reproducible**: `:latest` points to whatever image was pushed most recently — deploying the same YAML manifest twice can pull two completely different code versions. `kubectl rollout undo` **won't work correctly** because the old ReplicaSet still references `:latest`; recreating its Pods pulls the newest image (possibly the very buggy one), not the previously-stable version.
2. **`imagePullPolicy: Always` is forced with `:latest`** → every time a Pod restarts/reschedules (even from an unrelated node reboot), it must call the registry, adding startup latency and **risking a registry outage preventing the Pod from starting** even though the code hasn't changed.
3. **Hard to audit**: you can't tell exactly which image is running in which Pod at a given time, which makes incident debugging ("which commit introduced this bug?") much harder.
4. **Cache mismatch across nodes**: node A pulls `:latest` at 9am, node B pulls it at 5pm — two Pods in the same Deployment end up running **different code** despite the same tag.

**Best practice**: always use immutable tags — semantic versions (`1.4.0`) or, better, an **image digest** (`myrepo/api@sha256:abcd1234...`) to guarantee the exact same binary, combined with CI/CD tagging images by git commit SHA automatically.

```yaml
containers:
  - name: api
    image: myrepo/api@sha256:9f2c1a...   # digest — cannot silently change
    imagePullPolicy: IfNotPresent
```
