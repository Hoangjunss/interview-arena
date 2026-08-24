---
id: quiz-flutter-quy-tac-bo-cuc-cot-loi-cua-flutter-duoc-phat-bieu-the-nao
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy tắc bố cục cốt lõi của Flutter được phát biểu thế nào?

## Đáp án trắc nghiệm
- [x] Ràng buộc đi xuống, kích thước đi lên, cha đặt vị trí
- [ ] Kích thước được tính hai lượt như trong CSS flexbox
- [ ] Mọi widget đều nhận kích thước từ MediaQuery của màn hình
- [ ] Con tự chọn kích thước rồi cha phải nới ra cho vừa

## Giải thích (VI)
Ràng buộc đi xuống, kích thước đi lên, cha đặt vị trí. Cha đưa xuống khoảng rộng và cao cho phép, con tự chọn kích thước trong khoảng đó rồi báo ngược lên, cuối cùng cha quyết định đặt con ở đâu. Hầu hết lỗi bố cục là hiểu sai một trong ba bước này.

### Giải thích các phương án:
- **Ràng buộc đi xuống, kích thước đi lên, cha đặt vị trí** (Đúng): Con chỉ chọn kích thước trong khoảng cha cho phép, còn toạ độ do cha quyết định.
- **Kích thước được tính hai lượt như trong CSS flexbox** (Sai): Flutter đi một lượt xuống và một lượt lên, không phải mô hình của flexbox.
- **Mọi widget đều nhận kích thước từ MediaQuery của màn hình** (Sai): MediaQuery chỉ mô tả màn hình, ràng buộc thực tế do widget cha trực tiếp đưa xuống.
- **Con tự chọn kích thước rồi cha phải nới ra cho vừa** (Sai): Cha không nới theo con, con vượt ràng buộc thì sinh lỗi tràn.
