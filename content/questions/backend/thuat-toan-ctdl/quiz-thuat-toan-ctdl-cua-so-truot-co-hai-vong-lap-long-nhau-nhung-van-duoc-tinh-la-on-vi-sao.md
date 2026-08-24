---
id: quiz-thuat-toan-ctdl-cua-so-truot-co-hai-vong-lap-long-nhau-nhung-van-duoc-tinh-la-on-vi-sao
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cửa sổ trượt có hai vòng lặp lồng nhau nhưng vẫn được tính là O(n). Vì sao?

## Đáp án trắc nghiệm
- [ ] Vòng trong luôn chạy đúng một lần với mọi đầu vào
- [ ] Vì cửa sổ có kích thước cố định nên vòng trong là hằng số
- [ ] Vì biên trái được tính lại bằng công thức chứ không lặp
- [x] Mỗi phần tử chỉ vào và rời khỏi cửa sổ đúng một lần

## Giải thích (VI)
Vì phải đếm tổng số bước chứ không nhân số vòng. Biên phải đi tối đa n bước, biên trái cũng chỉ đi tối đa n bước và không bao giờ lùi, nên tổng công việc bị chặn bởi 2n. Vòng lồng nhau không tự động có nghĩa là O(n²).

### Giải thích các phương án:
- **Vòng trong luôn chạy đúng một lần với mọi đầu vào** (Sai): Có lần nó chạy nhiều bước, chỉ là tổng cộng lại vẫn bị chặn.
- **Vì cửa sổ có kích thước cố định nên vòng trong là hằng số** (Sai): Cửa sổ co giãn tự do trong biến thể tổng quát, kích thước không cố định.
- **Vì biên trái được tính lại bằng công thức chứ không lặp** (Sai): Có cài đặt như vậy nhưng bản dịch từng bước vẫn là O(n), nên đó không phải lý do.
- **Mỗi phần tử chỉ vào và rời khỏi cửa sổ đúng một lần** (Đúng): Tổng số bước của cả hai con trỏ bị chặn bởi 2n dù chúng nằm lồng nhau.
