---
id: helm-vs-kustomize-gitops
position: devops
technology: gitops-release-mgmt
level: mid
tags: [helm, kustomize, kubernetes, gitops]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Helm và Kustomize khi dùng làm công cụ quản lý config trong một GitOps repo. Nên chọn cái nào cho bài toán quản lý nhiều môi trường?

## Question (EN)
Compare Helm and Kustomize as config-management tools inside a GitOps repo. Which should you choose for managing multiple environments?

## Đáp án chi tiết (VI)
Cả Helm và Kustomize đều giải quyết cùng một vấn đề — **tránh lặp lại YAML giữa các môi trường** — nhưng theo hai triết lý khác nhau.

**Helm — templating engine với package manager:**
```
mychart/
  Chart.yaml
  values.yaml          # default values
  values-staging.yaml  # override cho staging
  values-prod.yaml     # override cho prod
  templates/
    deployment.yaml     # dùng {{ .Values.replicas }}
```
```bash
helm template mychart -f values-prod.yaml
# hoặc quản lý qua ArgoCD Application trỏ tới Helm source + valueFiles
```
- Dùng **Go template syntax** (`{{ }}`) để tham số hoá manifest.
- Có khái niệm **Chart** đóng gói, versioned, publish lên registry (OCI hoặc ChartMuseum) — dễ tái sử dụng chart chung cho nhiều team/service.
- Có **hooks** (pre-install, post-upgrade) hỗ trợ tác vụ như DB migration trước khi deploy.
- Nhược điểm: template Go rất khó đọc khi logic phức tạp (nested if/range), khó debug lỗi YAML render sai.

**Kustomize — patch-based overlay, không templating:**
```
base/
  deployment.yaml
  kustomization.yaml
overlays/
  staging/
    kustomization.yaml   # patchesStrategicMerge, replicas: 2
  prod/
    kustomization.yaml   # patchesStrategicMerge, replicas: 5
```
```yaml
# overlays/prod/kustomization.yaml
resources:
  - ../../base
patches:
  - patch: |-
      - op: replace
        path: /spec/replicas
        value: 5
    target:
      kind: Deployment
      name: order-service
```
- Không templating — chỉ **patch** (strategic merge patch hoặc JSON 6902 patch) lên base YAML thuần.
- YAML luôn hợp lệ ở mọi giai đoạn (dễ đọc, dễ diff bằng `kubectl diff`/`kustomize build`).
- Tích hợp **native trong `kubectl`** (`kubectl apply -k`) — không cần cài thêm binary.
- Nhược điểm: khó tái sử dụng chéo giữa nhiều service khác nhau như Helm chart (không có khái niệm "chart chung cho nhiều team"), không có package registry/versioning chuẩn.

**So sánh trực tiếp:**

| Tiêu chí | Helm | Kustomize |
|---|---|---|
| Cách tham số hoá | Template (Go template) | Patch (overlay) |
| Độ dễ đọc | Khó hơn khi logic phức tạp | Dễ đọc, YAML thuần |
| Tái sử dụng cross-team | Rất tốt (Chart + registry) | Hạn chế hơn |
| Lifecycle hooks | Có (pre/post install/upgrade) | Không có khái niệm hook |
| Native trong kubectl | Không (cần binary `helm`) | Có (`kubectl apply -k`) |
| Tích hợp ArgoCD/Flux | Rất tốt (cả hai đều hỗ trợ native) | Rất tốt (cả hai đều hỗ trợ native) |
| Rollback | `helm rollback` built-in | Không có khái niệm release/rollback riêng — dựa vào Git revert |

**Khuyến nghị cho multi-environment:**
- Nếu **service được tái sử dụng ở nhiều team/tổ chức** (ví dụ chart Redis, Postgres operator dùng chung) → Helm, tận dụng chart registry công khai (Bitnami, official charts).
- Nếu chỉ quản lý **cấu hình nội bộ theo môi trường** cho service riêng của công ty, ưu tiên đơn giản/dễ review → Kustomize, cấu trúc `base + overlays` rất tự nhiên khớp với mô hình "directory-per-environment" trong GitOps.
- Thực tế phổ biến nhất: **kết hợp cả hai** — dùng Helm chart cho phần lõi ứng dụng (đóng gói, versioned), rồi dùng Kustomize để "post-render" patch thêm theo từng môi trường (ArgoCD hỗ trợ native `kustomize` + `helm` combo qua field `source.helm` kèm `kustomize.patches`).

**Pitfall:** dùng Helm nhưng để quá nhiều logic điều kiện phức tạp (`{{ if and .Values.a .Values.b }}`) trong template khiến chart trở thành "lập trình bằng YAML" — cực khó maintain và debug. Nếu logic phức tạp tới mức này, nên cân nhắc Kustomize hoặc tool khác (cdk8s, Jsonnet) sinh YAML bằng ngôn ngữ lập trình thật.

## Detailed Answer (EN)
Both Helm and Kustomize solve the same problem — **avoiding YAML duplication across environments** — but through two different philosophies.

**Helm — a templating engine with a package manager:**
```
mychart/
  Chart.yaml
  values.yaml          # default values
  values-staging.yaml  # staging overrides
  values-prod.yaml     # prod overrides
  templates/
    deployment.yaml     # uses {{ .Values.replicas }}
```
```bash
helm template mychart -f values-prod.yaml
# or manage via an ArgoCD Application pointing at a Helm source + valueFiles
```
- Uses **Go template syntax** (`{{ }}`) to parameterize manifests.
- Has the concept of a **Chart** — packaged, versioned, published to a registry (OCI or ChartMuseum) — easy to reuse a shared chart across teams/services.
- Has **hooks** (pre-install, post-upgrade) supporting tasks like DB migrations before deploying.
- Downside: Go templates get hard to read with complex logic (nested if/range), and rendering bugs are hard to debug.

**Kustomize — patch-based overlays, no templating:**
```
base/
  deployment.yaml
  kustomization.yaml
overlays/
  staging/
    kustomization.yaml   # patchesStrategicMerge, replicas: 2
  prod/
    kustomization.yaml   # patchesStrategicMerge, replicas: 5
```
```yaml
# overlays/prod/kustomization.yaml
resources:
  - ../../base
patches:
  - patch: |-
      - op: replace
        path: /spec/replicas
        value: 5
    target:
      kind: Deployment
      name: order-service
```
- No templating — only **patching** (strategic merge patch or JSON 6902 patch) applied on top of plain base YAML.
- YAML remains valid at every stage (easy to read, easy to diff with `kubectl diff`/`kustomize build`).
- **Native to `kubectl`** (`kubectl apply -k`) — no extra binary needed.
- Downside: harder to reuse across many different services like a Helm chart (no notion of "a chart shared across teams"), no standard package registry/versioning.

**Direct comparison:**

| Criteria | Helm | Kustomize |
|---|---|---|
| Parameterization | Templating (Go template) | Patching (overlay) |
| Readability | Harder with complex logic | Easy to read, plain YAML |
| Cross-team reuse | Very good (Chart + registry) | More limited |
| Lifecycle hooks | Yes (pre/post install/upgrade) | No hook concept |
| Native to kubectl | No (needs the `helm` binary) | Yes (`kubectl apply -k`) |
| ArgoCD/Flux integration | Very good (both support it natively) | Very good (both support it natively) |
| Rollback | `helm rollback` built in | No dedicated release/rollback concept — relies on Git revert |

**Recommendation for multi-environment setups:**
- If a **service is reused across many teams/organizations** (e.g. a shared Redis chart, a Postgres operator) → Helm, leveraging public chart registries (Bitnami, official charts).
- If you're just managing **internal per-environment config** for a company's own service, prioritizing simplicity/reviewability → Kustomize; its `base + overlays` structure maps naturally onto the "directory-per-environment" GitOps pattern.
- The most common real-world approach: **combine both** — use a Helm chart for the application core (packaged, versioned), then use Kustomize to "post-render" additional per-environment patches (ArgoCD natively supports the `helm` + `kustomize` combo via the `source.helm` field plus `kustomize.patches`).

**Pitfall:** using Helm but stuffing too much complex conditional logic (`{{ if and .Values.a .Values.b }}`) into templates turns the chart into "programming in YAML" — extremely hard to maintain and debug. If logic gets this complex, consider Kustomize or a tool that generates YAML with a real programming language (cdk8s, Jsonnet) instead.
