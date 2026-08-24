---
id: rollback-git-revert-vs-manual
position: devops
technology: gitops-release-mgmt
level: mid
tags: [gitops, git, incident-response]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi production gặp sự cố do bản deploy mới, nên rollback bằng `git revert` hay can thiệp thủ công vào cluster? Phân tích ưu nhược điểm và quy trình cụ thể.

## Question (EN)
When production breaks due to a new deployment, should you roll back via `git revert` or intervene manually on the cluster? Analyze the trade-offs and walk through the concrete process.

## Đáp án chi tiết (VI)
Trong mô hình GitOps, **rollback đúng cách luôn nên đi qua Git**, không phải sửa tay cluster — nhưng thực tế có những tình huống cần cân nhắc thời gian.

**Cách 1: `git revert` (khuyến nghị, "đúng chuẩn GitOps")**
```bash
# Tìm commit gây lỗi trong config repo
git log --oneline apps/order-service/prod/

# Revert commit đó (tạo commit mới đảo ngược thay đổi)
git revert <bad-commit-sha> --no-edit
git push origin main
# ArgoCD/Flux tự động phát hiện thay đổi và sync về version cũ
```
- **Ưu điểm**:
  - Giữ nguyên **audit trail đầy đủ**: lịch sử Git thể hiện rõ "deploy → phát hiện lỗi → revert", không mất dấu vết.
  - **Đồng bộ với reconciliation loop**: không tạo drift giữa Git và cluster, tránh việc agent tự động ghi đè lại sửa tay sau đó (nếu `selfHeal` bật).
  - Có thể **review** commit revert như PR bình thường trước khi push (dù trong sự cố khẩn thường skip review, nhưng vẫn có lịch sử).
  - Dễ áp dụng đồng loạt cho **nhiều môi trường** nếu lỗi xuất hiện ở cả staging/prod.
- **Nhược điểm**: có độ trễ nhất định (thời gian CI/CD chạy lại pipeline, thời gian reconcile của agent — thường vài chục giây tới vài phút tuỳ cấu hình polling/webhook).

**Cách 2: can thiệp thủ công (`kubectl rollout undo`, `kubectl scale`, `kubectl edit`)**
```bash
kubectl rollout undo deployment/order-service -n prod
```
- **Ưu điểm**: **nhanh nhất có thể** — hữu ích khi sự cố nghiêm trọng (P1/SEV1), mỗi giây downtime đều tốn kém, không có thời gian chờ pipeline.
- **Nhược điểm nghiêm trọng**:
  - Tạo **drift** ngay lập tức giữa Git và cluster.
  - Nếu GitOps agent có `selfHeal: true`, nó sẽ **tự động ghi đè ngược lại** bản sửa tay này về đúng version lỗi trong Git (vì Git vẫn "nghĩ" version mới là đúng) → sự cố quay lại một cách khó hiểu.
  - Mất audit trail rõ ràng — người khác nhìn Git sẽ không biết cluster thực tế đang chạy gì.

**Quy trình khuyến nghị kết hợp cả hai (chuẩn thực chiến ở công ty lớn):**
```
1. Phát hiện sự cố (alert từ monitoring)
2. QUYẾT ĐỊNH THEO MỨC ĐỘ:
   - Nếu SEV1 và cần dừng ngay: tạm thời kubectl rollout undo
     ĐỒNG THỜI tắt automated sync / để agent ở chế độ manual
     (ví dụ: argocd app set order-service --sync-policy none)
     để tránh bị ghi đè ngược
   - Nếu có vài phút: git revert trực tiếp, để agent tự sync
3. Sau khi ổn định: BẮT BUỘC đưa Git về khớp với trạng thái đã
   rollback (git revert nếu chưa làm ở bước 2), rồi bật lại
   automated sync
4. Viết postmortem, gắn kèm link commit lỗi + commit revert
```

**Điểm mấu chốt cần nhớ khi phỏng vấn:** GitOps không cấm can thiệp khẩn cấp, nhưng **luôn phải đưa Git về khớp lại với thực tế ngay sau đó** — nếu không, hệ thống rơi vào trạng thái "Git nói dối" và lần reconcile tiếp theo sẽ gây sự cố lặp lại.

## Detailed Answer (EN)
In a GitOps model, the **correct rollback should always go through Git**, not manual cluster edits — but real incidents sometimes force a time trade-off.

**Approach 1: `git revert` (recommended, "GitOps-correct")**
```bash
# Find the offending commit in the config repo
git log --oneline apps/order-service/prod/

# Revert that commit (creates a new commit undoing the change)
git revert <bad-commit-sha> --no-edit
git push origin main
# ArgoCD/Flux automatically detects the change and syncs back to the old version
```
- **Pros**:
  - Preserves a **full audit trail**: Git history clearly shows "deploy → issue found → revert," nothing lost.
  - **Stays in sync with the reconciliation loop**: no drift is created between Git and the cluster, avoiding the agent later overwriting a manual fix (if `selfHeal` is on).
  - Can be **reviewed** like a normal PR before pushing (though under real incident pressure review is often skipped, the history remains).
  - Easy to apply consistently across **multiple environments** if the bug exists in both staging and prod.
- **Cons**: some inherent delay (CI/CD pipeline re-run time, agent reconcile time — typically tens of seconds to a few minutes depending on polling/webhook config).

**Approach 2: manual intervention (`kubectl rollout undo`, `kubectl scale`, `kubectl edit`)**
```bash
kubectl rollout undo deployment/order-service -n prod
```
- **Pros**: **fastest possible** — useful for a severe incident (P1/SEV1) where every second of downtime is costly and there's no time to wait on a pipeline.
- **Serious cons**:
  - Creates **immediate drift** between Git and the cluster.
  - If the GitOps agent has `selfHeal: true`, it will **automatically overwrite** this manual fix back to the buggy version in Git (since Git still "thinks" the new version is correct) → the incident confusingly recurs.
  - Loses a clear audit trail — anyone reading Git won't know what's actually running in the cluster.

**Recommended combined process (real-world practice at larger companies):**
```
1. Detect the incident (monitoring alert)
2. DECIDE BASED ON SEVERITY:
   - If SEV1 and immediate action is needed: temporarily
     kubectl rollout undo WHILE ALSO disabling automated sync /
     switching the agent to manual mode
     (e.g.: argocd app set order-service --sync-policy none)
     to prevent it being overwritten back
   - If there are a few minutes to spare: git revert directly,
     let the agent auto-sync
3. Once stabilized: MANDATORY — bring Git back in line with the
   rolled-back state (git revert if not already done in step 2),
   then re-enable automated sync
4. Write a postmortem, linking the offending commit + the revert commit
```

**Key point to remember for interviews:** GitOps doesn't forbid emergency manual intervention, but **Git must always be brought back in sync with reality immediately afterward** — otherwise the system falls into a "Git is lying" state, and the next reconciliation will reproduce the same incident.
