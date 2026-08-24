---
id: init-containers-and-sidecar-patterns
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, architecture, containers]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh init container, sidecar container, và ambassador/adapter container pattern. Từ Kubernetes 1.29, native sidecar container thay đổi gì so với cách làm sidecar truyền thống, và nó giải quyết vấn đề gì với lifecycle của Job?

## Question (EN)
Compare init containers, sidecar containers, and the ambassador/adapter container patterns. Since Kubernetes 1.29, how do native sidecar containers change the traditional sidecar approach, and what Job lifecycle problem does that solve?

## Đáp án chi tiết (VI)
**Init container**: chạy **tuần tự, chạy xong mới tới container tiếp theo**, tất cả init container phải **exit 0 thành công** trước khi main container nào được khởi động. Dùng cho: chờ dependency sẵn sàng, chạy migration, clone code/config vào volume dùng chung, tạo file config động trước khi app start.
```yaml
initContainers:
  - name: wait-db
    image: busybox
    command: ['sh', '-c', 'until nc -z db 5432; do sleep 2; done']
```

**Sidecar container (truyền thống, trước 1.29)**: chạy **song song** với main container trong cùng Pod, chia sẻ network/volume — dùng cho log shipper (Fluent Bit), service mesh proxy (Envoy), cert rotation agent. Vấn đề lịch sử: về mặt kỹ thuật sidecar truyền thống **chỉ là một container thường** trong `spec.containers[]`, không có khái niệm "phụ trợ" ở API level, gây ra 2 vấn đề lớn:
1. **Job không kết thúc được**: nếu Job có main container + sidecar (VD Envoy proxy để gọi service mesh trong lúc chạy batch job), main container exit 0 xong nhưng **sidecar vẫn chạy mãi** (proxy không tự biết khi nào dừng) → Job **không bao giờ chuyển `Completed`**, phải tự implement cơ chế kill sidecar thủ công (gọi API `/quitquitquit` của Envoy, hoặc script phức tạp).
2. **Thứ tự start/stop không đảm bảo**: không có gì đảm bảo sidecar (VD Envoy) sẵn sàng **trước** khi main container start gọi network qua nó — gây race condition lúc khởi động (main container gọi service mesh nhưng proxy chưa listen).

**Ambassador/Adapter pattern** (thường triển khai dưới dạng sidecar) — khác biệt về **mục đích** chứ không phải cơ chế:
- **Ambassador**: sidecar đóng vai trò **proxy ra ngoài** cho main container — main container chỉ cần gọi `localhost`, ambassador lo việc discovery/routing/retry tới service thật (ví dụ Envoy sidecar trong Istio).
- **Adapter**: sidecar **chuẩn hóa output** của main container cho hệ thống ngoài (VD: main container log ra format riêng, adapter đọc và chuyển thành format Prometheus/statsd chuẩn để hệ thống giám sát chung hiểu được).

**Native Sidecar Container (Kubernetes 1.29 stable, `SidecarContainers` feature gate)** — thay đổi ở **API level**: định nghĩa sidecar bằng cách đặt nó trong `initContainers[]` nhưng thêm `restartPolicy: Always`:
```yaml
initContainers:
  - name: envoy-proxy
    image: envoyproxy/envoy:v1.28
    restartPolicy: Always      # đánh dấu đây là native sidecar, không phải init container thường
    # ...
containers:
  - name: main-app
    image: myapp:1.0
```

**Native sidecar giải quyết 2 vấn đề trên như thế nào**:
1. **Thứ tự khởi động đảm bảo**: kubelet start sidecar (trong danh sách initContainers) **trước**, chờ nó đạt trạng thái `Running` (và pass readiness probe nếu có) rồi mới start main container — loại bỏ race condition lúc khởi động mà sidecar truyền thống gặp phải.
2. **Job/Pod kết thúc đúng cách**: khi **tất cả container thường (không phải sidecar) đã exit 0**, kubelet **tự động gửi SIGTERM để tắt các native sidecar** — Job giờ có thể chuyển `Completed` bình thường mà không cần hack thủ công để kill Envoy/proxy.
3. **Thứ tự tắt hợp lý khi Pod bị terminate**: native sidecar bị dừng **sau cùng** (theo thứ tự ngược lại lúc khởi động) — đảm bảo main container vẫn còn proxy/log-shipper hoạt động trong lúc nó tự graceful shutdown, tránh mất log/request cuối cùng.

**Điểm hay bị hỏi thêm — trade-off khi migrate**: native sidecar (đặt trong `initContainers` với `restartPolicy: Always`) là feature **mới**, cần kiểm tra service mesh/tool bên thứ 3 (Istio, Linkerd) đã hỗ trợ config theo cách mới này chưa — nhiều bản cũ của các tool đó vẫn tự inject sidecar theo kiểu container thường trong `containers[]` (dùng chung `postStart`/`preStop` hook để cố gắng đồng bộ thủ công), nên khi nâng cấp Kubernetes lên 1.29+ cần verify lại toàn bộ mesh injection webhook có tận dụng đúng native sidecar hay chưa để tránh vẫn dính lại vấn đề Job không completed cũ.

## Detailed Answer (EN)
**Init container**: runs **sequentially, one after another finishes**; every init container must **exit 0 successfully** before any main container starts. Used for: waiting on a dependency, running migrations, cloning code/config into a shared volume, generating dynamic config before the app starts.
```yaml
initContainers:
  - name: wait-db
    image: busybox
    command: ['sh', '-c', 'until nc -z db 5432; do sleep 2; done']
```

**Sidecar container (traditional, pre-1.29)**: runs **alongside** the main container in the same Pod, sharing network/volumes — used for log shippers (Fluent Bit), service mesh proxies (Envoy), cert rotation agents. Historical problem: a traditional sidecar was technically **just an ordinary container** in `spec.containers[]`, with no "auxiliary" concept at the API level, causing two major issues:
1. **A Job never completes**: if a Job has a main container plus a sidecar (e.g. an Envoy proxy for service-mesh calls during a batch job), the main container exits 0 but the **sidecar keeps running forever** (the proxy has no idea when to stop) → the Job **never transitions to `Completed`**, forcing you to implement manual sidecar-kill logic (calling Envoy's `/quitquitquit` API, or a complex script).
2. **No guaranteed start/stop ordering**: nothing ensures the sidecar (e.g. Envoy) is ready **before** the main container starts making network calls through it — causing startup race conditions (the main container calls the mesh but the proxy isn't listening yet).

**Ambassador/Adapter pattern** (usually implemented as a sidecar) — differ in **purpose**, not mechanism:
- **Ambassador**: a sidecar that acts as an **outbound proxy** for the main container — the main container just calls `localhost`, and the ambassador handles discovery/routing/retries to the real service (e.g. an Envoy sidecar in Istio).
- **Adapter**: a sidecar that **normalizes the main container's output** for an external system (e.g. the main container logs in a custom format, and the adapter reads and converts it into a standard Prometheus/statsd format the shared monitoring system understands).

**Native Sidecar Containers (stable in Kubernetes 1.29, `SidecarContainers` feature gate)** — change things at the **API level**: a sidecar is defined by placing it in `initContainers[]` but with `restartPolicy: Always`:
```yaml
initContainers:
  - name: envoy-proxy
    image: envoyproxy/envoy:v1.28
    restartPolicy: Always      # marks this as a native sidecar, not a regular init container
    # ...
containers:
  - name: main-app
    image: myapp:1.0
```

**How native sidecars solve the two problems above**:
1. **Guaranteed startup ordering**: kubelet starts the sidecar (in the initContainers list) **first**, waits for it to reach `Running` (and pass its readiness probe if any) before starting the main container — eliminating the startup race condition traditional sidecars suffered from.
2. **Correct Job/Pod completion**: once **all ordinary (non-sidecar) containers have exited 0**, kubelet **automatically sends SIGTERM to shut down native sidecars** — a Job can now transition to `Completed` normally, with no manual hack needed to kill the Envoy/proxy.
3. **Sensible shutdown ordering when a Pod terminates**: native sidecars stop **last** (in reverse startup order) — ensuring the main container still has its proxy/log-shipper working while it gracefully shuts down, avoiding lost logs/final requests.

**A point often probed further — migration trade-offs**: native sidecars (defined in `initContainers` with `restartPolicy: Always`) are a **relatively new** feature, so you need to check whether your service mesh/third-party tooling (Istio, Linkerd) already supports this new config style — many older versions of these tools still inject sidecars as ordinary containers in `containers[]` (relying on `postStart`/`preStop` hooks to manually approximate synchronization), so when upgrading to Kubernetes 1.29+, you must verify the mesh's injection webhook actually leverages native sidecars — otherwise you're still stuck with the old "Job never completes" problem.
