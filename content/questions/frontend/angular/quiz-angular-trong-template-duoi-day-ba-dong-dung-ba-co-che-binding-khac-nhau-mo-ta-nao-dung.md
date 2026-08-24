---
id: quiz-angular-trong-template-duoi-day-ba-dong-dung-ba-co-che-binding-khac-nhau-mo-ta-nao-dung
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong template dưới đây, ba dòng dùng ba cơ chế binding khác nhau. Mô tả nào đúng?

## Đáp án trắc nghiệm
- [ ] (click)="save()" chỉ chạy được nếu save được khai báo trong template chứ không phải trong class
- [ ] [src] gán vào HTML attribute, còn {{ }} gán vào property — hai cái tương đương nhau
- [ ] Cả ba đều là two-way binding, dữ liệu tự đồng bộ hai chiều
- [x] Interpolation đưa giá trị vào text; [prop] gán property; (event) nghe sự kiện

## Giải thích (VI)
Interpolation {{ expr }} chèn giá trị vào nội dung text. Property binding [prop]="expr" gán vào property của DOM element hoặc input của component, chiều component → template. Event binding (event)="handler()" chạy phương thức của class khi sự kiện xảy ra, chiều template → component. Muốn gán HTML attribute thật thì dùng [attr.aria-label].

### Giải thích các phương án:
- **(click)="save()" chỉ chạy được nếu save được khai báo trong template chứ không phải trong class** (Sai): Biểu thức trong template được đánh giá trong ngữ cảnh của class component.
- **[src] gán vào HTML attribute, còn {{ }} gán vào property — hai cái tương đương nhau** (Sai): [src] gán vào property của DOM element chứ không phải attribute; muốn gán attribute phải dùng [attr.x].
- **Cả ba đều là two-way binding, dữ liệu tự đồng bộ hai chiều** (Sai): Chỉ [(ngModel)] (kết hợp property + event) mới là two-way; ba dạng trên đều một chiều.
- **Interpolation đưa giá trị vào text; [prop] gán property; (event) nghe sự kiện** (Đúng): Đúng: ba cơ chế khác nhau về đích đến và chiều dữ liệu — [prop] đi component → template, (event) đi template → component.
