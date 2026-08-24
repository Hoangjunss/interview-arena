---
id: container-image-signing-cosign-sigstore
position: devops
technology: security-devsecops
level: senior
tags: [supply-chain-security, container-security, sigstore, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một cơ chế đảm bảo chỉ image đã được ký (signed) bởi pipeline CI hợp lệ mới được phép chạy trong cluster Kubernetes production. Bạn sẽ dùng công nghệ gì và xử lý các edge case nào?

## Question (EN)
Design a mechanism to ensure only images signed by a legitimate CI pipeline can run in a production Kubernetes cluster. What technology would you use, and what edge cases must you handle?

## Đáp án chi tiết (VI)
Đây là bài toán **artifact signing + admission control**, cốt lõi của supply-chain security ở mức trưởng thành cao (tương ứng SLSA level 2-3).

**Kiến trúc tổng thể:**
1. **Ký image** ngay sau khi build thành công trong CI, trước khi push lên registry.
2. **Lưu chữ ký** kèm image (registry hỗ trợ OCI artifact, hoặc transparency log riêng).
3. **Admission controller** trong cluster chặn mọi image chưa được ký hoặc ký sai trước khi cho phép schedule Pod.

**Công nghệ: Sigstore (cosign + Fulcio + Rekor)**
- **Cosign**: công cụ ký/verify image, hỗ trợ cả keyless signing (không cần quản lý private key thủ công) lẫn key-based truyền thống.
- **Fulcio**: CA cấp chứng chỉ ngắn hạn dựa trên OIDC identity (VD: GitHub Actions workflow identity) — thay vì lưu private key tĩnh dễ leak.
- **Rekor**: transparency log công khai, bất biến — ghi lại mọi lần ký, giúp audit và phát hiện ký giả mạo.

**Ký image trong CI (GitHub Actions, keyless):**
```yaml
- name: Sign image
  run: |
    cosign sign --yes \
      registry.internal/myapp@${{ steps.build.outputs.digest }}
  env:
    COSIGN_EXPERIMENTAL: "1"  # bật keyless signing qua OIDC token của GitHub Actions
```

**Enforce trong cluster bằng Kyverno policy:**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signature
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-signature
      match:
        resources:
          kinds: [Pod]
      verifyImages:
        - imageReferences:
            - "registry.internal/*"
          attestors:
            - entries:
                - keyless:
                    issuer: "https://token.actions.githubusercontent.com"
                    subject: "https://github.com/myorg/myrepo/.github/workflows/build.yml@refs/heads/main"
```
Với cấu hình này, chỉ image được ký bởi đúng workflow `build.yml` trên branch `main` của repo `myorg/myrepo` mới được phép chạy — nếu ai đó build và push image thủ công từ máy cá nhân (dù có quyền push registry), Pod sẽ bị admission controller từ chối.

**Edge case cần xử lý:**
| Edge case | Cách xử lý |
|---|---|
| Image base cũ đã chạy trước khi bật policy | Migration plan: bật ở chế độ `Audit` trước, rà soát toàn bộ workload đang chạy, whitelist tạm thời image legacy, rồi mới chuyển `Enforce` |
| CI cần rebuild lại image cũ (hotfix) từ commit cũ | Đảm bảo pipeline ký lại theo đúng identity, không bypass bằng cách build local rồi push tay |
| Rekor/Fulcio downtime | Cosign cache kết quả verify gần nhất trong thời gian ngắn; cần SLA rõ ràng và fallback (báo động thay vì block hoàn toàn nếu identity đã verify trước đó trong X phút) — trade-off giữa availability và security phải được leadership duyệt trước |
| Multi-arch image (manifest list) | Ký digest của manifest list, không chỉ digest của từng arch riêng lẻ, tránh trường hợp 1 kiến trúc bị swap ngầm |
| Registry mirror/pull-through cache | Đảm bảo digest không đổi qua mirror; verify theo digest (immutable) chứ không theo tag (mutable, có thể bị move) |
| Base image công khai (Docker Hub) không có chữ ký nội bộ | Chỉ enforce cho image build bởi CI nội bộ (namespace `registry.internal/*`); base image công khai được kiểm soát riêng qua SCA/vulnerability scanning, không nằm trong scope của policy này |

**Trade-off cần cân nhắc khi trình bày với leadership:**
- Enforce cứng ngay từ đầu dễ gây outage diện rộng nếu có workload chưa kịp migrate — nên rollout theo namespace, bắt đầu từ non-critical trước.
- Keyless signing phụ thuộc vào tính khả dụng của Fulcio/Rekor (Sigstore public instance hoặc self-hosted) — với hệ thống air-gapped hoặc yêu cầu độ trễ cực thấp, cần cân nhắc self-host toàn bộ Sigstore stack.

## Detailed Answer (EN)
This is an **artifact signing + admission control** problem — core to a mature (SLSA level 2-3 equivalent) supply-chain security posture.

**Overall architecture:**
1. **Sign the image** immediately after a successful CI build, before pushing to the registry.
2. **Store the signature** alongside the image (OCI-artifact-capable registry, or a separate transparency log).
3. An **admission controller** in the cluster blocks any unsigned or incorrectly signed image before allowing a Pod to be scheduled.

**Technology: Sigstore (cosign + Fulcio + Rekor)**
- **Cosign**: signs/verifies images, supports both keyless signing (no manual private-key management) and traditional key-based signing.
- **Fulcio**: a CA that issues short-lived certificates based on OIDC identity (e.g., a GitHub Actions workflow identity) instead of storing a long-lived private key that can leak.
- **Rekor**: a public, immutable transparency log recording every signing event, enabling audit and detection of forged signatures.

**Signing an image in CI (GitHub Actions, keyless):**
```yaml
- name: Sign image
  run: |
    cosign sign --yes \
      registry.internal/myapp@${{ steps.build.outputs.digest }}
  env:
    COSIGN_EXPERIMENTAL: "1"  # enable keyless signing via GitHub Actions OIDC token
```

**Enforcing in-cluster with a Kyverno policy:**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signature
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-signature
      match:
        resources:
          kinds: [Pod]
      verifyImages:
        - imageReferences:
            - "registry.internal/*"
          attestors:
            - entries:
                - keyless:
                    issuer: "https://token.actions.githubusercontent.com"
                    subject: "https://github.com/myorg/myrepo/.github/workflows/build.yml@refs/heads/main"
```
With this config, only images signed by exactly the `build.yml` workflow on the `main` branch of `myorg/myrepo` are allowed to run — if someone builds and manually pushes an image from a laptop (even with registry push access), the admission controller rejects the Pod.

**Edge cases to handle:**
| Edge case | Handling |
|---|---|
| Legacy images already running before the policy is enabled | Migration plan: enable in `Audit` mode first, review all running workloads, temporarily allowlist legacy images, then switch to `Enforce` |
| CI needs to rebuild an old image (hotfix) from an old commit | Ensure the pipeline re-signs with the correct identity — don't bypass by building locally and pushing manually |
| Rekor/Fulcio downtime | Cosign caches recent verification results briefly; define a clear SLA and fallback (alert instead of hard-blocking if the identity was already verified within X minutes) — the availability-vs-security trade-off needs leadership sign-off |
| Multi-arch images (manifest lists) | Sign the manifest-list digest, not just each per-arch digest, to prevent a single architecture being swapped silently |
| Registry mirror/pull-through cache | Ensure the digest is unchanged through the mirror; verify by digest (immutable), not by tag (mutable, can be moved) |
| Public base images (Docker Hub) without internal signatures | Only enforce for images built by internal CI (`registry.internal/*` namespace); public base images are governed separately via SCA/vulnerability scanning, out of this policy's scope |

**Trade-offs to raise with leadership:**
- Hard-enforcing from day one risks a wide outage if some workloads haven't migrated — roll out per-namespace, starting with non-critical workloads.
- Keyless signing depends on Fulcio/Rekor availability (Sigstore's public instance or self-hosted) — for air-gapped systems or ultra-low-latency requirements, consider self-hosting the full Sigstore stack.
