---
id: quiz-git-git-rebase-main-dung-o-nhanh-feature-khac-git-merge-main-o-diem-cot-loi-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
git rebase main (đứng ở nhánh feature) khác git merge main ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] Rebase nhanh hơn merge vì không phải tải dữ liệu từ remote
- [ ] Rebase chỉ dùng được khi hai nhánh chưa phân kỳ
- [x] Rebase phát lại từng commit của feature lên trên commit cuối của main
- [ ] Rebase tự động giải quyết conflict, merge thì bắt xử lý thủ công

## Giải thích (VI)
Rebase nhấc các commit của feature đặt lại lên đầu main, tạo commit mới với hash mới → lịch sử phẳng, không merge commit. Merge giữ nguyên commit cũ và thêm một commit hợp nhất → lịch sử giữ đúng dấu vết phân nhánh nhưng rẽ nhiều hơn.

### Giải thích các phương án:
- **Rebase nhanh hơn merge vì không phải tải dữ liệu từ remote** (Sai): Cả hai đều là thao tác cục bộ; tốc độ không phải điểm khác biệt.
- **Rebase chỉ dùng được khi hai nhánh chưa phân kỳ** (Sai): Rebase sinh ra chính là để xử lý trường hợp đã phân kỳ.
- **Rebase phát lại từng commit của feature lên trên commit cuối của main** (Đúng): Merge giữ nguyên commit cũ và thêm một merge commit có hai cha. Rebase viết lại commit, merge giữ nguyên và hợp nhất — đây là khác biệt gốc. Nó tạo ra các commit MỚI có hash khác và cho lịch sử tuyến tính; merge thì giữ nguyên commit cũ và thêm một merge commit có hai cha.
- **Rebase tự động giải quyết conflict, merge thì bắt xử lý thủ công** (Sai): Cả hai đều có thể sinh conflict cần xử lý tay.
