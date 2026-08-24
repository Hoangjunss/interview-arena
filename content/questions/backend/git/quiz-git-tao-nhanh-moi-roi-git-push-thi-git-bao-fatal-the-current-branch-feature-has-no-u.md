---
id: quiz-git-tao-nhanh-moi-roi-git-push-thi-git-bao-fatal-the-current-branch-feature-has-no-u
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tạo nhánh mới rồi git push thì Git báo fatal: The current branch feature has no upstream branch. Vì sao?

## Đáp án trắc nghiệm
- [ ] Vì bạn không có quyền ghi lên repository
- [ ] Vì nhánh chưa có commit nào nên không có gì để push
- [x] Nhánh local chưa gắn với nhánh nào trên remote
- [ ] Vì tên nhánh chứa ký tự không hợp lệ

## Giải thích (VI)
Nhánh local mới chưa có nhánh đối ứng trên remote. git push -u origin feature vừa đẩy lên vừa thiết lập liên kết theo dõi; sau đó git push và git pull trần đều biết đích. -u là viết tắt của --set-upstream.

### Giải thích các phương án:
- **Vì bạn không có quyền ghi lên repository** (Sai): Lỗi phân quyền sẽ báo permission denied, không phải no upstream.
- **Vì nhánh chưa có commit nào nên không có gì để push** (Sai): Lỗi này về liên kết upstream, không phải về việc có commit hay không.
- **Nhánh local chưa gắn với nhánh nào trên remote** (Đúng): Nhánh mới tạo cục bộ chưa có upstream cho tới khi được đặt tường minh. Gắn bằng git push -u origin feature, từ lần sau chỉ cần git push.
- **Vì tên nhánh chứa ký tự không hợp lệ** (Sai): Thông báo lỗi tên nhánh không hợp lệ sẽ khác hẳn.
