---
id: helm-charts-basics
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, helm, packaging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Helm giải quyết vấn đề gì mà `kubectl apply` thuần không làm được? Giải thích các thành phần chính của một Helm chart và cách quản lý version/rollback.

## Question (EN)
What problem does Helm solve that plain `kubectl apply` doesn't? Explain the main parts of a Helm chart and how versioning/rollback works.

## Đáp án chi tiết (VI)
**Helm** là package manager cho Kubernetes, giải quyết 3 vấn đề chính mà YAML thuần gặp phải:

1. **Templating/tái sử dụng**: một ứng dụng deploy ở `dev`/`staging`/`prod` cần khác nhau về replicas, resource, domain... — copy-paste 3 bộ YAML gần giống nhau rất khó bảo trì. Helm dùng **Go template** để tham số hóa 1 bộ chart, chỉ đổi `values.yaml` theo môi trường.
2. **Quản lý vòng đời như 1 package**: install/upgrade/rollback/uninstall nguyên một "ứng dụng" (gồm nhiều resource: Deployment, Service, ConfigMap, Ingress...) như 1 đơn vị, thay vì `kubectl apply -f` từng file rời rạc không có khái niệm "release" hay lịch sử.
3. **Chia sẻ/tái sử dụng chart công khai**: cài PostgreSQL/Redis/nginx-ingress production-grade chỉ với 1 lệnh `helm install` từ chart đã được cộng đồng kiểm chứng, thay vì tự viết YAML từ đầu.

**Cấu trúc 1 Helm chart**:
```
mychart/
  Chart.yaml          # metadata: tên, version chart, version app
  values.yaml          # giá trị mặc định cho template
  templates/
    deployment.yaml     # template dùng {{ .Values.xxx }}
    service.yaml
    _helpers.tpl         # định nghĩa helper function/template dùng chung
  charts/               # sub-chart (dependency)
```

Ví dụ template:
```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-api
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```
```yaml
# values.yaml
replicaCount: 3
image:
  repository: myrepo/api
  tag: "1.4.0"
resources:
  requests: { cpu: "250m", memory: "256Mi" }
```

**Quản lý version/rollback** — mỗi lần `helm install`/`upgrade` tạo ra 1 **revision**, Helm lưu lịch sử (dạng Secret trong cluster theo mặc định từ Helm 3):
```bash
helm install myapp ./mychart -f values-prod.yaml
helm upgrade myapp ./mychart --set image.tag=1.5.0
helm history myapp                   # xem các revision
helm rollback myapp 2                # rollback về revision 2
helm diff upgrade myapp ./mychart -f values-prod.yaml   # (plugin) xem trước thay đổi
```

**Lưu ý/gotcha production thường bị hỏi**:
- **Helm 2 vs Helm 3**: Helm 2 cần **Tiller** (server-side component chạy trong cluster với quyền cao) — là lỗ hổng bảo mật lớn (giống vấn đề cluster-admin). Helm 3 **bỏ Tiller hoàn toàn**, chạy client-side, dùng RBAC của user hiện tại — nên luôn dùng Helm 3+.
- `helm upgrade` mặc định **không xóa resource** không còn tồn tại trong chart mới nếu bạn đổi tên resource giữa các version — cần cẩn trọng khi refactor chart.
- Với resource nhạy cảm (Secret, PVC) cần cẩn thận với annotation `helm.sh/resource-policy: keep` để tránh Helm xóa mất khi `helm uninstall`.
- Chart phức tạp nên viết **unit test** bằng `helm-unittest` hoặc ít nhất `helm template` + `kubectl apply --dry-run=server` trong CI trước khi merge, tránh lỗi template runtime chỉ phát hiện lúc deploy thật.

## Detailed Answer (EN)
**Helm** is Kubernetes' package manager, solving three main problems plain YAML runs into:

1. **Templating/reuse**: an app deployed to `dev`/`staging`/`prod` needs different replicas, resources, domains, etc. — copy-pasting three nearly-identical YAML sets is hard to maintain. Helm uses **Go templates** to parameterize a single chart, only swapping `values.yaml` per environment.
2. **Lifecycle management as one package**: install/upgrade/rollback/uninstall an entire "application" (many resources: Deployment, Service, ConfigMap, Ingress, ...) as a single unit, instead of `kubectl apply -f`-ing disjoint files with no concept of a "release" or history.
3. **Sharing/reusing public charts**: install a production-grade PostgreSQL/Redis/nginx-ingress with one `helm install` command from a community-vetted chart, instead of writing YAML from scratch.

**Structure of a Helm chart**:
```
mychart/
  Chart.yaml          # metadata: chart name, chart version, app version
  values.yaml          # default values for the templates
  templates/
    deployment.yaml     # template using {{ .Values.xxx }}
    service.yaml
    _helpers.tpl         # shared helper functions/templates
  charts/               # sub-charts (dependencies)
```

Example template:
```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-api
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```
```yaml
# values.yaml
replicaCount: 3
image:
  repository: myrepo/api
  tag: "1.4.0"
resources:
  requests: { cpu: "250m", memory: "256Mi" }
```

**Version management/rollback** — every `helm install`/`upgrade` creates a new **revision**, and Helm keeps a history (stored as a Secret in the cluster by default since Helm 3):
```bash
helm install myapp ./mychart -f values-prod.yaml
helm upgrade myapp ./mychart --set image.tag=1.5.0
helm history myapp                   # list revisions
helm rollback myapp 2                # roll back to revision 2
helm diff upgrade myapp ./mychart -f values-prod.yaml   # (plugin) preview changes
```

**Production notes/gotchas often asked about**:
- **Helm 2 vs. Helm 3**: Helm 2 required **Tiller** (a server-side component running in the cluster with high privileges) — a major security hole (similar to the cluster-admin problem). Helm 3 **removed Tiller entirely**, runs client-side, and uses the current user's own RBAC — always use Helm 3+.
- `helm upgrade` by default does **not** clean up resources no longer present in a new chart version if you rename resources between versions — be careful when refactoring a chart.
- For sensitive resources (Secrets, PVCs), be careful with the `helm.sh/resource-policy: keep` annotation to prevent Helm from deleting them on `helm uninstall`.
- Complex charts should have **unit tests** via `helm-unittest`, or at minimum run `helm template` + `kubectl apply --dry-run=server` in CI before merging, to catch template runtime errors before they only surface at real deploy time.
