---
id: quiz-angular-phat-bieu-nao-sau-day-sai-ve-standalone-component
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về standalone component?

## Đáp án trắc nghiệm
- [ ] Bỏ được lớp trung gian NgModule nên ít file khai báo lặp và ít lỗi vặt
- [ ] Lazy load thẳng một component bằng loadComponent, không cần bọc module
- [x] Loại bỏ hoàn toàn dependency injection — service không cần provider nữa
- [ ] Component tự khai báo phụ thuộc qua mảng imports, không cần declarations

## Giải thích (VI)
Standalone component tự khai báo phụ thuộc trong imports của chính nó, nên không cần NgModule để declarations/exports. Kết quả: ít file trung gian, phụ thuộc nằm cạnh nơi dùng, lazy load thẳng bằng loadComponent. Dependency injection không đổi — service vẫn dùng providedIn: "root" hoặc provider theo route.

### Giải thích các phương án:
- **Bỏ được lớp trung gian NgModule nên ít file khai báo lặp và ít lỗi vặt** (Sai): Phát biểu đúng: lỗi quên declare/export trong NgModule ("component is not a known element") là nhóm lỗi phổ biến mà standalone loại bỏ phần lớn.
- **Lazy load thẳng một component bằng loadComponent, không cần bọc module** (Sai): Phát biểu đúng: router nhận thẳng component standalone, không cần module chỉ để chia bundle.
- **Loại bỏ hoàn toàn dependency injection — service không cần provider nữa** (Đúng): Đây là chỗ sai: standalone không đụng tới DI. Service vẫn dùng providedIn: "root" hoặc provider ở cấp route/component.
- **Component tự khai báo phụ thuộc qua mảng imports, không cần declarations** (Sai): Phát biểu đúng: phụ thuộc nằm ngay cạnh nơi dùng, đọc file component là thấy đủ.
