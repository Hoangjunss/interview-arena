---
id: quiz-git-tag-trong-git-khac-branch-o-diem-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tag trong Git khác branch ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Tag tự động được tạo mỗi khi merge vào main
- [x] Tag là con trỏ CỐ ĐỊNH tới một commit; branch là con trỏ DI ĐỘNG
- [ ] Tag chỉ tồn tại trên remote, không có ở local
- [ ] Tag lưu toàn bộ mã nguồn tại thời điểm đó, branch chỉ lưu tham chiếu

## Giải thích (VI)
Tag ghim cố định vào một commit — dùng để đánh dấu bản phát hành. Branch di chuyển theo commit mới. Một điểm hay quên: git push KHÔNG đẩy tag, phải git push --tags hoặc git push origin <tên-tag>.

### Giải thích các phương án:
- **Tag tự động được tạo mỗi khi merge vào main** (Sai): Tag luôn được tạo thủ công hoặc bởi quy trình CI.
- **Tag là con trỏ CỐ ĐỊNH tới một commit; branch là con trỏ DI ĐỘNG** (Đúng): Branch là con trỏ DI ĐỘNG, tự tiến lên mỗi lần commit. Khác biệt cốt lõi nằm ở việc con trỏ có di chuyển hay không. Branch tự tiến lên mỗi lần commit, còn tag đứng yên kể cả khi có commit mới.
- **Tag chỉ tồn tại trên remote, không có ở local** (Sai): Tag tồn tại ở local và phải push riêng mới lên remote.
- **Tag lưu toàn bộ mã nguồn tại thời điểm đó, branch chỉ lưu tham chiếu** (Sai): Cả hai đều chỉ là con trỏ tới một commit.
