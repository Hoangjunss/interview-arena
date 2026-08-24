---
id: what-is-a-merge-queue
position: devops
technology: ci-cd
level: junior
tags: [ci-cd-fundamentals, branching-strategy, github-actions]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Merge queue là gì và nó giải quyết vấn đề gì mà việc chỉ chạy CI trên từng PR riêng lẻ không giải quyết được?

## Question (EN)
What is a merge queue, and what problem does it solve that running CI on individual PRs alone cannot?

## Đáp án chi tiết (VI)
**Vấn đề cần giải quyết:** Khi nhiều PR được review và pass CI riêng lẻ dựa trên `main` tại thời điểm PR đó được tạo, nhưng nếu 2 PR merge gần như đồng thời, PR thứ hai merge vào **một `main` đã khác** so với lúc nó được test — dù từng PR riêng lẻ đều "xanh", tổ hợp của chúng có thể fail. Đây gọi là **"semantic conflict"** hay vấn đề "not rebased at merge time".

**Ví dụ cụ thể:**
- PR A: đổi tên hàm `calculateTax()` thành `computeTax()`, cập nhật mọi chỗ gọi, CI pass.
- PR B: thêm 1 chỗ gọi mới đến `calculateTax()` (được viết dựa trên `main` cũ, trước khi PR A merge), CI cũng pass vì test dựa trên `main` tại thời điểm đó.
- PR A merge trước. Sau đó PR B merge vào — `main` giờ đã không còn `calculateTax()`, code PR B lỗi runtime, nhưng **không ai phát hiện vì CI của PR B đã chạy VÀ PASS trước đó** (dựa trên state cũ).

**Cách giải quyết truyền thống (không có merge queue):** yêu cầu mỗi PR phải rebase/update từ `main` mới nhất và chạy lại CI ngay trước khi merge ("Require branches to be up to date before merging"). Nhưng cách này gây **nghẽn cổ chai** khi nhiều PR merge liên tục — mỗi PR merge xong lại khiến các PR khác "outdated", phải rebase và chạy lại CI, tạo vòng lặp vô tận nếu tốc độ merge nhanh hơn tốc độ CI chạy xong.

**Merge queue giải quyết bằng cách:**
1. Dev bấm "Add to merge queue" thay vì merge trực tiếp.
2. Hệ thống tự động xếp hàng các PR, **test PR theo tổ hợp tuần tự với các PR đứng trước nó trong hàng đợi** (giả lập trạng thái `main` sau khi các PR trước đã merge) — không phải test với `main` hiện tại đã lỗi thời.
3. Nếu tổ hợp pass, tự động merge; nếu fail, tự động loại khỏi hàng đợi và thông báo cho tác giả, không làm nghẽn các PR khác phía sau.
4. Có thể batch nhiều PR để test cùng lúc (speculative checks) nhằm tăng throughput.

```yaml
# GitHub merge queue - cấu hình trong branch protection
Settings > Branches > main > Require merge queue
  Merge method: squash
  Build concurrency: 5
  Require status checks to pass: ci-build, ci-test
```

**Lợi ích cụ thể:**

| Không có merge queue | Có merge queue |
|---|---|
| `main` có thể bị breaking do tổ hợp 2 PR "xanh" riêng lẻ | Mọi merge đều được test đúng tổ hợp thực tế sẽ có trên `main` |
| Rebase thủ công liên tục khi merge nhanh, dev tốn thời gian chờ | Tự động xử lý hàng đợi, dev chỉ cần "add to queue" và đi làm việc khác |
| Dễ xảy ra tình trạng `main` đỏ (broken) yêu cầu revert khẩn cấp | `main` gần như luôn xanh vì chỉ tổ hợp đã test pass mới được merge |

**Khi nào cần merge queue:** team có nhiều dev (>10) merge liên tục vào cùng 1 nhánh chính, đặc biệt quan trọng với trunk-based development có tần suất merge cao — càng nhiều merge/ngày, xác suất semantic conflict càng tăng.

**Pitfall:** Với team nhỏ, merge tần suất thấp (vài PR/ngày), merge queue có thể là over-engineering — thêm độ trễ (chờ hàng đợi) và độ phức tạp không cần thiết so với lợi ích nhận được.

## Detailed Answer (EN)
**The problem to solve:** When multiple PRs are reviewed and pass CI independently based on `main` at the time each PR was created, but if two PRs merge nearly simultaneously, the second PR merges into **a `main` that has already changed** from when it was tested — even though each PR was individually "green," their combination can fail. This is called a **"semantic conflict"** or the "not rebased at merge time" problem.

**Concrete example:**
- PR A: renames `calculateTax()` to `computeTax()`, updates every call site, CI passes.
- PR B: adds a new call to `calculateTax()` (written against the older `main`, before PR A merged), also passes CI since it was tested against `main` at that earlier point.
- PR A merges first. Then PR B merges — `main` no longer has `calculateTax()`, PR B's code breaks at runtime, but **no one caught it because PR B's CI already ran AND PASSED earlier** (against stale state).

**The traditional fix (without a merge queue):** require every PR to rebase/update from the latest `main` and re-run CI right before merging ("Require branches to be up to date before merging"). But this creates a **bottleneck** when many PRs merge in quick succession — each merge makes every other pending PR "outdated," forcing a rebase and a fresh CI run, creating an endless loop if merges happen faster than CI can finish.

**A merge queue solves this by:**
1. A developer clicks "Add to merge queue" instead of merging directly.
2. The system automatically queues PRs, **testing each PR in combination sequentially with the PRs ahead of it in the queue** (simulating what `main` will look like after those earlier PRs merge) — not against the now-stale current `main`.
3. If the combination passes, it auto-merges; if it fails, it's automatically removed from the queue and the author is notified, without blocking the PRs behind it.
4. Multiple PRs can be batched and tested together (speculative checks) to increase throughput.

```yaml
# GitHub merge queue - configured under branch protection
Settings > Branches > main > Require merge queue
  Merge method: squash
  Build concurrency: 5
  Require status checks to pass: ci-build, ci-test
```

**Concrete benefits:**

| Without a merge queue | With a merge queue |
|---|---|
| `main` can break from the combination of two individually "green" PRs | Every merge is tested against the exact combination that will actually land on `main` |
| Constant manual rebasing during fast merge activity, wasting developer time | The queue handles it automatically; developers just "add to queue" and move on |
| `main` frequently ends up broken, requiring emergency reverts | `main` stays green almost always, since only tested combinations get merged |

**When you need a merge queue:** a team with many developers (>10) merging continuously into the same main branch, especially important for high-frequency trunk-based development — the more merges per day, the higher the probability of a semantic conflict.

**Pitfall:** For a small team with low merge frequency (a few PRs/day), a merge queue can be over-engineering — adding latency (waiting in the queue) and unnecessary complexity relative to the benefit gained.