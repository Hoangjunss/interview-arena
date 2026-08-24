---
id: incident-postmortem-culture
position: devops
technology: monitoring-observability
level: mid
tags: [incident-management, postmortem, sre]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Blameless postmortem là gì và vì sao nó quan trọng? Một postmortem tốt nên có những phần nào?

## Question (EN)
What is a blameless postmortem, and why does it matter? What should a good postmortem document include?

## Đáp án chi tiết (VI)
**Postmortem** (còn gọi là incident review/retrospective) là tài liệu phân tích sau khi 1 sự cố (incident) đã được giải quyết, nhằm hiểu **nguyên nhân gốc** và tìm hành động cải thiện để tránh lặp lại, chứ không phải để "trừng phạt" ai.

**Blameless** nghĩa là: postmortem tập trung vào **hệ thống và quy trình**, không quy trách nhiệm cá nhân ("ai đã gõ lệnh sai" không quan trọng bằng "vì sao hệ thống cho phép 1 lệnh sai gây ra outage lớn đến vậy").

**Vì sao quan trọng**:
- Nếu văn hóa có xu hướng đổ lỗi cá nhân, kỹ sư sẽ **che giấu lỗi** hoặc trì hoãn báo cáo sự cố vì sợ bị khiển trách — làm chậm quá trình phát hiện và khắc phục, và tệ hơn là mất đi cơ hội học hỏi từ sự cố.
- Hầu hết sự cố lớn không phải do "1 người ngu ngốc" mà do **nhiều lớp phòng thủ cùng thất bại** (theo mô hình Swiss Cheese) — con người chỉ là 1 lớp, còn có thiếu code review, thiếu test, thiếu canary deploy, thiếu alert kịp thời... Đổ lỗi cho 1 cá nhân bỏ qua toàn bộ các lớp phòng thủ khác đáng ra phải ngăn được sự cố.
- Văn hóa blameless khuyến khích engineer **chủ động chia sẻ chi tiết** (kể cả sai lầm của chính mình) vì biết sẽ không bị trừng phạt, giúp bức tranh sự cố đầy đủ và chính xác hơn.

**Cấu trúc một postmortem tốt**:
1. **Summary**: tóm tắt ngắn gọn — điều gì xảy ra, ảnh hưởng tới ai, trong bao lâu.
2. **Impact**: định lượng cụ thể (số user bị ảnh hưởng, doanh thu mất, SLO/error budget bị burn bao nhiêu %).
3. **Timeline**: mốc thời gian chi tiết — khi nào sự cố bắt đầu, khi nào được phát hiện (detect), khi nào bắt đầu xử lý, khi nào resolve. Từ đây tính được **MTTD** (mean time to detect) và **MTTR** (mean time to resolve).
4. **Root cause analysis**: dùng kỹ thuật như "5 Whys" để đào sâu tới nguyên nhân gốc thay vì dừng ở triệu chứng bề mặt.
5. **What went well / What went wrong**: đánh giá khách quan cả điểm tốt (ví dụ alert đã fire đúng lúc) lẫn điểm cần cải thiện (ví dụ runbook thiếu thông tin).
6. **Action items**: danh sách hành động cụ thể, có **owner** và **deadline** rõ ràng — đây là phần quan trọng nhất, postmortem không có action item là postmortem vô giá trị.

**Ví dụ 5 Whys**: "API bị 500 lỗi" → Vì sao? "DB connection pool cạn" → Vì sao? "1 query chậm bất thường giữ connection quá lâu" → Vì sao? "Thiếu index cho cột mới thêm tuần trước" → Vì sao? "Migration thêm cột không kèm review cho index cần thiết" → Vì sao? "Checklist review migration không có mục kiểm tra index" → **Action item**: thêm mục kiểm tra index vào checklist review migration.

**Pitfall thường gặp**:
- Postmortem chỉ có 1 action item duy nhất là "thêm alert" — dễ dẫn tới alert fatigue nếu không giải quyết nguyên nhân gốc.
- Không follow-up action item sau đó — nhiều tổ chức viết postmortem rất kỹ nhưng action item không bao giờ được thực hiện, khiến sự cố tương tự lặp lại.
- Không public/share postmortem rộng rãi trong tổ chức — mất cơ hội để team khác học hỏi từ sự cố.

## Detailed Answer (EN)
A **postmortem** (also called an incident review/retrospective) is a document analyzing an incident after it's been resolved, aimed at understanding the **root cause** and identifying improvement actions to prevent recurrence — not at "punishing" anyone.

**Blameless** means: the postmortem focuses on **systems and processes**, not individual blame ("who typed the wrong command" matters far less than "why did the system allow one wrong command to cause such a large outage").

**Why it matters**:
- If the culture tends toward blaming individuals, engineers will **hide mistakes** or delay reporting incidents out of fear of reprimand — slowing detection and remediation, and worse, losing the opportunity to learn from the incident.
- Most major incidents aren't caused by "one careless person" but by **multiple layers of defense failing together** (the Swiss Cheese model) — the human action is just one layer; there's usually also missing code review, missing tests, missing canary deploys, missing timely alerts... Blaming one individual ignores all the other defense layers that should have caught the issue.
- A blameless culture encourages engineers to **proactively share details** (including their own mistakes) knowing they won't be punished, producing a fuller and more accurate picture of the incident.

**Structure of a good postmortem**:
1. **Summary**: a brief overview — what happened, who was affected, for how long.
2. **Impact**: concrete quantification (number of users affected, revenue lost, % of SLO/error budget burned).
3. **Timeline**: a detailed timeline — when the incident started, when it was detected, when remediation began, when it was resolved. This yields **MTTD** (mean time to detect) and **MTTR** (mean time to resolve).
4. **Root cause analysis**: use a technique like "5 Whys" to dig down to the actual root cause instead of stopping at the surface symptom.
5. **What went well / What went wrong**: an objective assessment of both good points (e.g. the alert fired promptly) and areas to improve (e.g. the runbook lacked information).
6. **Action items**: a concrete list of actions with a clear **owner** and **deadline** — this is the most important part; a postmortem with no action items is worthless.

**5 Whys example**: "API returned 500 errors" → Why? "DB connection pool exhausted" → Why? "An unusually slow query held a connection too long" → Why? "Missing index for a column added last week" → Why? "The migration adding the column wasn't reviewed for needed indexes" → Why? "The migration review checklist has no index-check item" → **Action item**: add an index-check item to the migration review checklist.

**Common pitfalls**:
- A postmortem whose only action item is "add an alert" — easily leads to alert fatigue if the root cause isn't actually addressed.
- No follow-up on action items afterward — many organizations write very thorough postmortems but never actually complete the action items, letting similar incidents recur.
- Not publishing/sharing the postmortem widely within the organization — a missed opportunity for other teams to learn from the incident.
