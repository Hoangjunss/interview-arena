---
id: quiz-csharp-khac-biet-cot-loi-gia-struct-value-type-va-class-reference-type-trong-c-la-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa struct (value type) và class (reference type) trong C# là gì?

## Đáp án trắc nghiệm
- [ ] struct luôn nằm trên heap, còn class luôn nằm trên stack
- [ ] class được copy theo giá trị, còn struct được truyền theo tham chiếu
- [x] struct là value type, copy theo giá trị; class là reference type
- [ ] struct không thể có method hay property, chỉ chứa field

## Giải thích (VI)
struct là value type: biến chứa trực tiếp dữ liệu, khi gán hay truyền vào hàm sẽ copy toàn bộ giá trị. class là reference type: biến chỉ giữ tham chiếu tới object trên heap, nên nhiều biến có thể cùng trỏ về một object và cùng thấy thay đổi. Đây là điểm quyết định hành vi copy và so sánh.

### Giải thích các phương án:
- **struct luôn nằm trên heap, còn class luôn nằm trên stack** (Sai): Ngược so với thực tế và cũng quá tuyệt đối: class instance nằm trên heap; struct nằm nơi nó được khai báo (stack cho local, nhưng nằm trong heap khi là field của class hoặc bị boxing).
- **class được copy theo giá trị, còn struct được truyền theo tham chiếu** (Sai): Đảo ngược hoàn toàn: class truyền theo tham chiếu (copy con trỏ), struct copy theo giá trị.
- **struct là value type, copy theo giá trị; class là reference type** (Đúng): Đây là điểm phân biệt nền tảng: value type copy toàn bộ dữ liệu khi gán/truyền, reference type chỉ copy con trỏ nên nhiều biến cùng trỏ về một object. Biến kiểu class chỉ giữ tham chiếu tới object trên heap nên nhiều biến cùng trỏ về một object.
- **struct không thể có method hay property, chỉ chứa field** (Sai): struct trong C# có thể có method, property, constructor, và implement interface — chỉ không hỗ trợ kế thừa.
