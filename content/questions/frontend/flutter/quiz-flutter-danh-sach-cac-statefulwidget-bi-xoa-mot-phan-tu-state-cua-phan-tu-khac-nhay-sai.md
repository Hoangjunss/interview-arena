---
id: quiz-flutter-danh-sach-cac-statefulwidget-bi-xoa-mot-phan-tu-state-cua-phan-tu-khac-nhay-sai
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Danh sách các StatefulWidget bị xoá một phần tử, state của phần tử khác nhảy sai chỗ. Nguyên nhân?

## Đáp án trắc nghiệm
- [ ] Vì các phần tử chưa được bọc trong RepaintBoundary
- [x] Thiếu key nên Flutter ghép widget theo vị trí
- [ ] Vì ListView tái dùng widget như RecyclerView của Android
- [ ] Vì setState được gọi trước khi danh sách kịp cập nhật

## Giải thích (VI)
Thiếu key . Khi ghép widget mới với element cũ, Flutter so theo kiểu và vị trí, nên xoá phần tử giữa danh sách khiến các phần tử sau dồn lên và nhận nhầm State cũ. Thêm ValueKey theo id của dữ liệu là hết.

### Giải thích các phương án:
- **Vì các phần tử chưa được bọc trong RepaintBoundary** (Sai): RepaintBoundary liên quan tới vùng vẽ lại, không liên quan tới danh tính phần tử.
- **Thiếu key nên Flutter ghép widget theo vị trí** (Đúng): Không có key thì việc ghép dựa vào kiểu và thứ tự, nên phần tử sau dồn lên nhận element cũ.
- **Vì ListView tái dùng widget như RecyclerView của Android** (Sai): Flutter dựng widget mới chứ không tái dùng theo kiểu view holder.
- **Vì setState được gọi trước khi danh sách kịp cập nhật** (Sai): Thứ tự gọi setState không đổi cách Flutter ghép element.
