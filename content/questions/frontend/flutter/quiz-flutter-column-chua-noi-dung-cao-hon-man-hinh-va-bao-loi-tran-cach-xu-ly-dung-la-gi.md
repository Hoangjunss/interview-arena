---
id: quiz-flutter-column-chua-noi-dung-cao-hon-man-hinh-va-bao-loi-tran-cach-xu-ly-dung-la-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Column chứa nội dung cao hơn màn hình và báo lỗi tràn. Cách xử lý đúng là gì?

## Đáp án trắc nghiệm
- [ ] Giảm kích thước font cho tới khi vừa màn hình
- [ ] Bọc Column trong Expanded để nó tự co lại
- [x] Bọc trong SingleChildScrollView để cuộn được
- [ ] Đặt mainAxisSize thành MainAxisSize.min

## Giải thích (VI)
Bọc bằng SingleChildScrollView để nội dung dài trở thành vùng cuộn. Với danh sách nhiều phần tử thì dùng ListView để chỉ dựng phần đang nhìn thấy. Giảm cỡ chữ hay bỏ bớt nội dung chỉ né được trên đúng thiết bị đang thử.

### Giải thích các phương án:
- **Giảm kích thước font cho tới khi vừa màn hình** (Sai): Chỉ né triệu chứng trên một thiết bị, máy nhỏ hơn hoặc cỡ chữ hệ thống lớn sẽ tràn lại.
- **Bọc Column trong Expanded để nó tự co lại** (Sai): Expanded giới hạn chiều cao Column nhưng các widget con vẫn giữ nguyên nên vẫn tràn.
- **Bọc trong SingleChildScrollView để cuộn được** (Đúng): Cuộn cho Column chiều cao không giới hạn, phần vượt màn hình trở thành vùng cuộn thay vì tràn.
- **Đặt mainAxisSize thành MainAxisSize.min** (Sai): Thuộc tính này chỉ co Column theo con, không giúp gì khi tổng chiều cao con đã vượt màn hình.
