---
id: vong-doi-mot-loi-defect-life-cycle-di-qua-nhung-trang-thai-nao
position: backend
technology: quản-lý-lỗi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời một lỗi (Defect Life Cycle) đi qua những trạng thái nào?

## Question (EN)
What states does a Defect Life Cycle go through?

## Đáp án chi tiết (VI)
Luồng chuẩn từ lúc phát hiện tới lúc đóng:\
\
1. **New** — tester vừa log lỗi.\
2. **Assigned** — lead/PM giao cho một dev.\
3. **Open / In Progress** — dev tiếp nhận và đang sửa.\
4. **Fixed** — dev báo đã sửa xong.\
5. **Retest** — tester kiểm lại trên build mới.\
6. **Closed** — retest pass, đóng lỗi. Nếu vẫn còn → **Reopened**, quay lại bước sửa.\
\
Các nhánh phụ hay gặp: **Rejected** (không phải lỗi), **Duplicate** (trùng lỗi đã có), **Deferred** (hoãn sang release sau). Ngữ cảnh và tên trạng thái có thể khác nhau tùy công cụ (Jira, Bugzilla), nhưng bộ khung New → ... → Closed là bất biến.

## Detailed Answer (EN)
The standard flow from discovery to closure:\
\
1. **New** — the tester has just logged the defect.\
2. **Assigned** — a lead/PM assigns it to a developer.\
3. **Open / In Progress** — the developer picks it up and starts fixing.\
4. **Fixed** — the developer reports it as fixed.\
5. **Retest** — the tester re-checks on the new build.\
6. **Closed** — retest passes, the defect is closed. If it still fails → **Reopened**, back to fixing.\
\
Common side branches: **Rejected** (not a defect), **Duplicate** (same as an existing one), **Deferred** (postponed to a later release). State names vary by tool (Jira, Bugzilla), but the New → ... → Closed skeleton is invariant.
