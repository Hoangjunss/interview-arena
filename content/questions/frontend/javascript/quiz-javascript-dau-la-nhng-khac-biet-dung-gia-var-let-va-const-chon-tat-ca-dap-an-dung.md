---
id: quiz-javascript-dau-la-nhng-khac-biet-dung-gia-var-let-va-const-chon-tat-ca-dap-an-dung
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đâu là những khác biệt đúng giữa var, let và const? (chọn tất cả đáp án đúng)

## Đáp án trắc nghiệm
- [ ] var không thể khai báo trùng tên trong cùng scope
- [x] var có function scope, còn let/const có block scope

## Giải thích (VI)
var là function-scoped, let/const là block-scoped và có TDZ; const khoá việc gán lại nhưng không đóng băng nội dung object. Ngược lại, var cho phép khai báo trùng tên trong cùng scope — chính let/const mới cấm điều đó.

### Giải thích các phương án:
- **var không thể khai báo trùng tên trong cùng scope** (Sai): Ngược lại: var cho phép re-declare cùng tên trong cùng scope mà không lỗi; let/const mới cấm re-declare.
- **var có function scope, còn let/const có block scope** (Đúng): var chỉ giới hạn trong function gần nhất (bỏ qua block {}), trong khi let/const bị giới hạn trong block.
