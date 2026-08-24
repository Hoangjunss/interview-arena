---
id: quiz-html-css-thuoc-tinh-id-va-class-trong-html-khac-nhau-o-diem-cot-loi-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thuộc tính id và class trong HTML khác nhau ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] Không có khác biệt về hành vi, chỉ là hai cách đặt tên khác nhau
- [ ] id dùng cho CSS, còn class chỉ dùng cho JavaScript
- [x] id phải duy nhất trên trang; class dùng lại được nhiều lần
- [ ] Một phần tử có thể có nhiều id nhưng chỉ có một class

## Giải thích (VI)
id phải duy nhất trên toàn trang, mỗi giá trị chỉ thuộc về một phần tử — dùng cho anchor link (#section) và getElementById(). class tái sử dụng được: nhiều phần tử chia sẻ cùng class, và một phần tử mang được nhiều class. Trong CSS, #id có specificity cao hơn .class nên khó override — vì vậy nên ưu tiên class để style.

### Giải thích các phương án:
- **Không có khác biệt về hành vi, chỉ là hai cách đặt tên khác nhau** (Sai): Khác biệt là thật: id duy nhất và có specificity cao hơn hẳn trong CSS; anchor link #ten-id và getElementById() chỉ hoạt động với id.
- **id dùng cho CSS, còn class chỉ dùng cho JavaScript** (Sai): Cả hai đều dùng được ở cả CSS (#id, .class) lẫn JavaScript (getElementById, querySelector, getElementsByClassName) — khác biệt nằm ở tính duy nhất, không phải nơi sử dụng.
- **id phải duy nhất trên trang; class dùng lại được nhiều lần** (Đúng): class dùng lại được cho nhiều phần tử và 1 phần tử có thể mang nhiều class. Đúng theo spec: id là định danh duy nhất (dùng cho anchor #section, getElementById()); class là nhãn nhóm tái sử dụng, khai báo nhiều class cách nhau bằng dấu cách. Một phần tử mang được nhiều class cùng lúc nhưng chỉ một id duy nhất.
- **Một phần tử có thể có nhiều id nhưng chỉ có một class** (Sai): Ngược lại hoàn toàn: mỗi phần tử chỉ có một id, nhưng thuộc tính class chứa được nhiều tên class cách nhau bằng dấu cách.
