---
id: quiz-cs-fundamentals-khac-biet-co-ban-ve-chi-phi-gia-mang-array-va-danh-sach-lien-ket-linked-list-la
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cơ bản về chi phí giữa mảng (array) và danh sách liên kết (linked list) là gì?

## Đáp án trắc nghiệm
- [x] Mảng truy cập chỉ số O(1), chèn giữa O(n); linked list thì ngược lại
- [ ] Cả hai đều O(1) cho truy cập, chỉ khác ở cách cấp phát bộ nhớ
- [ ] Mảng dùng ít bộ nhớ hơn vì chỉ lưu con trỏ chứ không lưu trực tiếp dữ liệu
- [ ] Linked list nhanh hơn mảng ở mọi thao tác vì không phải cấp phát lại bộ nhớ

## Giải thích (VI)
Mảng lưu liền kề nên truy cập theo chỉ số là O(1), nhưng chèn/xoá ở giữa phải dịch phần tử nên O(n). Linked list chèn/xoá chỉ cần nối lại con trỏ — O(1) khi đã cầm con trỏ tới vị trí — nhưng truy cập phần tử thứ k phải duyệt từ đầu nên O(n).

### Giải thích các phương án:
- **Mảng truy cập chỉ số O(1), chèn giữa O(n); linked list thì ngược lại** (Đúng): Mảng nằm liền kề nên địa chỉ phần tử tính được bằng phép toán; linked list phải đi theo con trỏ từ đầu, đổi lại chèn/xoá chỉ cần nối lại vài con trỏ.
- **Cả hai đều O(1) cho truy cập, chỉ khác ở cách cấp phát bộ nhớ** (Sai): Truy cập phần tử thứ k của linked list buộc phải duyệt qua k nút trước đó, nên là O(n) chứ không phải O(1).
- **Mảng dùng ít bộ nhớ hơn vì chỉ lưu con trỏ chứ không lưu trực tiếp dữ liệu** (Sai): Ngược lại: mảng lưu trực tiếp phần tử, còn linked list tốn thêm một con trỏ (hoặc hai với danh sách hai chiều) cho mỗi nút.
- **Linked list nhanh hơn mảng ở mọi thao tác vì không phải cấp phát lại bộ nhớ** (Sai): Linked list chậm hơn hẳn ở truy cập theo chỉ số và ở duyệt tuần tự do mỗi nút nằm rải rác trong bộ nhớ, gây cache miss liên tục.
