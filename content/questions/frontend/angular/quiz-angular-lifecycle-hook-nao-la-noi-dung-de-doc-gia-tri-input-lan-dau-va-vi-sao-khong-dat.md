---
id: quiz-angular-lifecycle-hook-nao-la-noi-dung-de-doc-gia-tri-input-lan-dau-va-vi-sao-khong-dat
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifecycle hook nào là nơi đúng để đọc giá trị @Input() lần đầu và vì sao không đặt ở constructor?

## Đáp án trắc nghiệm
- [ ] ngOnDestroy — vì đó là hook chạy sau cùng nên chắc chắn input đã có giá trị
- [ ] ngAfterViewInit — vì input thuộc về view nên phải chờ view khởi tạo xong
- [x] ngOnInit — constructor chạy trước khi Angular gán giá trị input
- [ ] Constructor — Angular gán input trước khi gọi constructor

## Giải thích (VI)
Dùng ngOnInit. Thứ tự là: constructor → gán input → ngOnChanges → ngOnInit → ngAfterViewInit → ... → ngOnDestroy. Constructor chạy lúc instance vừa tạo nên input còn undefined; vì vậy constructor chỉ nên nhận dependency, còn khởi tạo dựa trên input đặt ở ngOnInit. Muốn phản ứng mỗi lần input đổi thì dùng ngOnChanges hoặc signal input kèm computed/effect.

### Giải thích các phương án:
- **ngOnDestroy — vì đó là hook chạy sau cùng nên chắc chắn input đã có giá trị** (Sai): ngOnDestroy chạy khi component bị huỷ, quá muộn để khởi tạo.
- **ngAfterViewInit — vì input thuộc về view nên phải chờ view khởi tạo xong** (Sai): Input không phụ thuộc vào view; ngAfterViewInit dành cho việc truy cập phần tử trong template.
- **ngOnInit — constructor chạy trước khi Angular gán giá trị input** (Đúng): Đúng: input được gán trong lượt change detection đầu, sau constructor và trước ngOnInit — đọc ở constructor thì input vẫn là undefined.
- **Constructor — Angular gán input trước khi gọi constructor** (Sai): Ngược lại: constructor chạy khi instance vừa được tạo, trước khi input được gán.
