---
id: what-is-a-ci-runner
position: devops
technology: ci-cd
level: junior
tags: [ci-cd-fundamentals, github-actions, infrastructure]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI runner (agent/executor) là gì? Khác nhau giữa hosted runner và self-hosted runner ra sao? Khi nào nên dùng self-hosted?

## Question (EN)
What is a CI runner (agent/executor)? What's the difference between a hosted runner and a self-hosted runner? When should you use self-hosted?

## Đáp án chi tiết (VI)
**Runner** (GitHub Actions gọi là "runner", GitLab CI gọi là "runner"/"executor", Jenkins gọi là "agent") là **máy tính thực sự thực thi các bước trong pipeline** — checkout code, chạy lệnh build/test, deploy. Server điều phối CI (control plane) chỉ lên lịch job và gửi job tới runner; runner mới là nơi lệnh thực sự chạy.

**Hosted runner (managed bởi nền tảng CI):**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest   # GitHub cung cấp máy ảo tạm thời
```
- GitHub/GitLab quản lý toàn bộ hạ tầng: cấp máy ảo mới cho mỗi job, cài sẵn tool phổ biến (Node, Docker, Java...), hủy máy sau khi job xong (ephemeral).
- Ưu điểm: không cần bảo trì, scale tự động, sẵn sàng dùng ngay.
- Nhược điểm: giới hạn tài nguyên (CPU/RAM cố định theo tier), tính phí theo phút với private repo, không truy cập được mạng nội bộ (VPC riêng), giới hạn thời gian chạy tối đa (GitHub: 6 giờ/job).

**Self-hosted runner:**
```yaml
jobs:
  build:
    runs-on: [self-hosted, linux, gpu]  # máy của công ty tự quản lý
```
- Công ty tự cài đặt và quản lý máy chạy runner (VM, bare-metal, hoặc pod Kubernetes).
- Ưu điểm:
  - Truy cập được tài nguyên nội bộ (DB nội bộ, VPC riêng) mà hosted runner không với tới.
  - Tùy chỉnh phần cứng (GPU cho ML pipeline, CPU/RAM lớn cho build nặng).
  - Không tính phí theo phút của nền tảng CI (nhưng vẫn tốn chi phí hạ tầng tự vận hành).
  - Cache hiệu quả hơn nếu runner không bị hủy sau mỗi job (persistent runner).
- Nhược điểm:
  - Phải tự bảo trì, vá lỗi bảo mật, scale (autoscaling runner qua Kubernetes/Docker).
  - Rủi ro bảo mật cao hơn nếu chạy PR từ fork công khai — attacker có thể chạy code tùy ý trên máy nội bộ của bạn (đặc biệt nguy hiểm với `pull_request_target` trên GitHub Actions).
  - Nếu không cấu hình ephemeral (mỗi job = 1 máy mới), state có thể rò rỉ giữa các job (ví dụ file tạm của job trước ảnh hưởng job sau).

**Khi nào chọn self-hosted:**
- Cần truy cập tài nguyên trong mạng nội bộ (VPC, on-premise DB) mà hosted runner (public internet only) không kết nối được.
- Cần phần cứng đặc biệt: GPU, ARM architecture, RAM/CPU lớn hơn tier hosted runner cho phép.
- Khối lượng CI rất lớn khiến chi phí hosted runner theo phút vượt quá chi phí tự vận hành máy chủ riêng.
- Yêu cầu compliance cần dữ liệu build không rời khỏi hạ tầng công ty.

**Pitfall bảo mật kinh điển:** Chạy self-hosted runner cho public repository mà cho phép trigger từ pull_request của fork bên ngoài — kẻ tấn công có thể mở PR chứa workflow độc hại, khi runner chạy sẽ thực thi code tùy ý trên máy nội bộ công ty (đọc secrets, pivot vào mạng nội bộ). GitHub khuyến cáo mạnh mẽ **không** dùng self-hosted runner cho public repo trừ khi kiểm soát rất chặt (require approval cho fork PR).

## Detailed Answer (EN)
A **runner** (GitHub Actions calls it "runner", GitLab CI calls it "runner"/"executor", Jenkins calls it "agent") is **the actual machine that executes the steps of a pipeline** — checking out code, running build/test commands, deploying. The CI control plane only schedules jobs and dispatches them to a runner; the runner is where commands actually run.

**Hosted runner (managed by the CI platform):**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest   # GitHub provisions a temporary VM
```
- GitHub/GitLab manages the entire infrastructure: spins up a fresh VM per job, pre-installs common tools (Node, Docker, Java...), and tears the machine down after the job (ephemeral).
- Pros: zero maintenance, auto-scaling, ready to use instantly.
- Cons: fixed resource limits (CPU/RAM per tier), billed per minute for private repos, no access to internal networks (private VPC), maximum runtime limits (GitHub: 6 hours/job).

**Self-hosted runner:**
```yaml
jobs:
  build:
    runs-on: [self-hosted, linux, gpu]  # a company-managed machine
```
- The company installs and manages its own runner machines (VM, bare-metal, or Kubernetes pods).
- Pros:
  - Access to internal resources (internal DB, private VPC) that a hosted runner can't reach.
  - Custom hardware (GPU for ML pipelines, large CPU/RAM for heavy builds).
  - No per-minute CI platform billing (though you still pay for running your own infrastructure).
  - More effective caching if the runner isn't torn down after every job (persistent runner).
- Cons:
  - You must maintain it yourself: security patching, scaling (autoscaling runners via Kubernetes/Docker).
  - Higher security risk when running PRs from public forks — an attacker can run arbitrary code on your internal machine (especially dangerous with GitHub Actions' `pull_request_target`).
  - If not configured to be ephemeral (one fresh machine per job), state can leak between jobs (e.g. a prior job's temp files affecting the next).

**When to choose self-hosted:**
- You need access to internal-network resources (VPC, on-premise DB) that a public-internet-only hosted runner can't reach.
- You need special hardware: GPUs, ARM architecture, or more RAM/CPU than the hosted tier allows.
- CI volume is high enough that per-minute hosted-runner billing exceeds the cost of running your own servers.
- Compliance requires build data to never leave company infrastructure.

**Classic security pitfall:** Running a self-hosted runner on a public repository that allows triggering from an external fork's pull request — an attacker can open a PR containing a malicious workflow, and when the runner executes it, arbitrary code runs on your internal machine (reading secrets, pivoting into the internal network). GitHub strongly advises **against** using self-hosted runners on public repos unless tightly controlled (requiring approval for fork PRs).