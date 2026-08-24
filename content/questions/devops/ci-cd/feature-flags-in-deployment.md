---
id: feature-flags-in-deployment
position: devops
technology: ci-cd
level: mid
tags: [feature-flags, deployment-strategy, continuous-delivery]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Feature flag là gì và vì sao nó giúp tách rời việc "deploy" khỏi việc "release" tính năng? Nêu ví dụ thực tế và các loại feature flag phổ biến.

## Question (EN)
What is a feature flag and why does it help decouple "deploying" code from "releasing" a feature? Give a real example and the common types of feature flags.

## Đáp án chi tiết (VI)
**Feature flag** (còn gọi feature toggle) là một cơ chế điều kiện trong code cho phép bật/tắt một tính năng **tại runtime, không cần deploy lại**. Đây là công cụ cốt lõi giúp áp dụng Continuous Deployment an toàn với trunk-based development.

**Tách "deploy" khỏi "release":**
- **Deploy** = đưa code mới lên production (code đã tồn tại trên server).
- **Release** = bật tính năng đó cho người dùng thấy/sử dụng.

Nhờ feature flag, code có thể được merge vào `main` và deploy lên production **ngay cả khi tính năng chưa hoàn thiện** — miễn là flag đang tắt, code đó không chạy, không ảnh hưởng user. Điều này giải quyết mâu thuẫn giữa trunk-based development (merge liên tục vào main) và việc tính năng lớn cần nhiều tuần để hoàn thành.

**Ví dụ code:**
```javascript
if (featureFlags.isEnabled('new-checkout-flow', { userId })) {
  return renderNewCheckout();
} else {
  return renderLegacyCheckout();
}
```

**Các loại feature flag phổ biến:**

| Loại | Mục đích | Vòng đời |
|---|---|---|
| **Release flag** | Ẩn tính năng chưa hoàn thiện, tách deploy khỏi release | Ngắn hạn — xóa sau khi release 100% |
| **Experiment flag (A/B test)** | So sánh 2 phiên bản để đo hiệu quả | Ngắn/trung hạn — xóa sau khi có kết luận |
| **Ops flag (kill switch)** | Tắt nhanh tính năng gây sự cố mà không cần rollback deploy | Dài hạn, giữ lại như safety valve |
| **Permission flag** | Bật tính năng theo gói dịch vụ/user tier (ví dụ premium feature) | Vĩnh viễn, gắn với business logic |

**Rollout dần theo % hoặc theo nhóm user (targeting):**
```json
{
  "flag": "new-checkout-flow",
  "rollout": { "percentage": 10, "segments": ["beta-testers"] }
}
```
Kết hợp với canary deployment: tăng % dần trong khi theo dõi metrics, nếu lỗi thì tắt flag ngay (nhanh hơn nhiều so với rollback deploy vì không cần build/deploy lại).

**Công cụ:** LaunchDarkly, Unleash (open-source), Flagsmith, hoặc tự xây bằng config service + cache (Redis) cho hệ thống nhỏ.

**Pitfall/trade-off quan trọng:**
- **Nợ kỹ thuật (flag debt):** để flag tồn tại quá lâu sau khi release 100% khiến code đầy `if/else` rác, khó đọc, khó test (test phải cover cả 2 nhánh). Cần quy trình dọn dẹp flag định kỳ.
- **Kiểm thử phức tạp hơn:** với N flag độc lập, có 2^N tổ hợp trạng thái cần cân nhắc test — thực tế không thể test hết, nên ưu tiên test các tổ hợp có khả năng xảy ra.
- **Flag đánh giá ở đâu:** đánh giá phía client (dễ bị người dùng thấy code chưa release qua devtools) vs phía server (an toàn hơn nhưng cần gọi thêm 1 network hop nếu không cache tốt).
- Flag không nên dùng để thay thế feature branch mãi mãi — nó là công cụ chuyển tiếp, không phải kiến trúc vĩnh viễn.

## Detailed Answer (EN)
A **feature flag** (or feature toggle) is a conditional mechanism in code that lets you turn a feature on/off **at runtime, without redeploying**. It's a core tool for safely practicing Continuous Deployment with trunk-based development.

**Decoupling "deploy" from "release":**
- **Deploy** = shipping new code to production (the code now exists on the server).
- **Release** = turning that feature on so users see/use it.

With feature flags, code can be merged into `main` and deployed to production **even while a feature is incomplete** — as long as the flag is off, that code path never runs and users are unaffected. This resolves the tension between trunk-based development (merging into main continuously) and large features that take weeks to finish.

**Code example:**
```javascript
if (featureFlags.isEnabled('new-checkout-flow', { userId })) {
  return renderNewCheckout();
} else {
  return renderLegacyCheckout();
}
```

**Common types of feature flags:**

| Type | Purpose | Lifecycle |
|---|---|---|
| **Release flag** | Hide an incomplete feature, decouple deploy from release | Short-lived — removed after 100% release |
| **Experiment flag (A/B test)** | Compare two variants to measure impact | Short/medium-lived — removed once concluded |
| **Ops flag (kill switch)** | Quickly disable a feature causing an incident without rolling back the deploy | Long-lived, kept as a safety valve |
| **Permission flag** | Gate a feature by plan/user tier (e.g. premium feature) | Permanent, tied to business logic |

**Gradual rollout by percentage or user segment (targeting):**
```json
{
  "flag": "new-checkout-flow",
  "rollout": { "percentage": 10, "segments": ["beta-testers"] }
}
```
Combined with canary deployment: ramp the percentage up while watching metrics, and flip the flag off instantly if something breaks (much faster than a deploy rollback since no rebuild/redeploy is needed).

**Tools:** LaunchDarkly, Unleash (open-source), Flagsmith, or a homegrown config service + cache (Redis) for smaller systems.

**Important pitfalls/trade-offs:**
- **Flag debt:** letting a flag linger long after 100% release clutters the code with dead `if/else` branches, hurting readability and testing (tests must cover both branches). Set up a regular flag-cleanup process.
- **Testing complexity:** with N independent flags, there are 2^N possible state combinations to consider — in practice you can't test them all, so prioritize the realistic combinations.
- **Where evaluation happens:** client-side evaluation (users can peek at unreleased code via devtools) vs server-side (safer but adds a network hop if not cached well).
- Flags should not be used as a permanent substitute for feature branches — they're a transitional tool, not a permanent architecture.