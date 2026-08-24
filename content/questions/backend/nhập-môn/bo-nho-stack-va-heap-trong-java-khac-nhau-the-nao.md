---
id: bo-nho-stack-va-heap-trong-java-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bộ nhớ Stack và Heap trong Java khác nhau thế nào?

## Question (EN)
What is the difference between Stack and Heap memory in Java?

## Đáp án chi tiết (VI)
**Stack** lưu biến local + tham chiếu, cấp riêng mỗi thread, tự giải phóng khi method kết thúc (LIFO). **Heap** lưu object thật, **chia sẻ giữa mọi thread**, do Garbage Collector dọn.\
\
```java\
void demo() {\
  int x = 5;               // x nằm trên STACK\
  Person p = new Person(); // tham chiếu p ở stack, object Person ở HEAP\
}                          // hết method: x + p rời stack, object chờ GC\
```\
\
**Vì sao tách:** stack nhanh (chỉ dịch con trỏ) nhưng nhỏ + ngắn hạn theo method; heap lớn, sống lâu, nhưng cần GC nên chậm hơn.\
\
**Lưu ý:**\
- Đệ quy quá sâu → **`StackOverflowError`** (tràn stack).\
- Quá nhiều object sống lâu → **`OutOfMemoryError: Java heap space`** (tràn heap).\
- 2 biến cùng trỏ 1 object trên heap → sửa qua biến này, biến kia thấy đổi theo.\
\
**Tóm lại:** primitive + reference ở stack, object luôn ở heap. \\"Java pass-by-value\\" = copy *cái reference*, không copy object.

## Detailed Answer (EN)
$82
