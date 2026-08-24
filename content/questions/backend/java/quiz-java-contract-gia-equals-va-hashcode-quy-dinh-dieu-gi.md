---
id: quiz-java-contract-gia-equals-va-hashcode-quy-dinh-dieu-gi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Contract giữa equals() và hashCode() quy định điều gì?

## Đáp án trắc nghiệm
- [ ] Nếu a.hashCode() bằng b.hashCode() thì a.equals(b) phải là true — hashCode trùng nghĩa là cùng một giá trị
- [x] Nếu a.equals(b) thì a.hashCode() phải bằng b.hashCode(); chiều ngược lại không bắt buộc
- [ ] hashCode() phải trả về giá trị duy nhất cho mỗi object khác nhau, nếu không HashMap sẽ hoạt động sai
- [ ] Chỉ cần override hashCode() là đủ, vì equals() mặc định của Object đã so sánh nội dung field

## Giải thích (VI)
Contract: nếu a.equals(b) là true thì a.hashCode() bắt buộc bằng b.hashCode(). Chiều ngược lại không yêu cầu — hai object khác nhau có thể trùng hashCode (collision hợp lệ). Lý do: HashMap/HashSet tìm bucket bằng hashCode trước rồi mới so equals, nên hai object "bằng nhau" phải rơi cùng bucket. Vì vậy luôn override cả hai method với cùng tập field.

### Giải thích các phương án:
- **Nếu a.hashCode() bằng b.hashCode() thì a.equals(b) phải là true — hashCode trùng nghĩa là cùng một giá trị** (Sai): Đảo ngược contract: hashCode chỉ có 2^32 giá trị nên collision là tất yếu; trùng hashCode hoàn toàn không suy ra equals.
- **Nếu a.equals(b) thì a.hashCode() phải bằng b.hashCode(); chiều ngược lại không bắt buộc** (Đúng): Đúng contract trong javadoc của Object: equals kéo theo hashCode bằng nhau; hai object khác nhau được phép trùng hashCode (collision) và HashMap xử lý bằng equals() trong bucket.
- **hashCode() phải trả về giá trị duy nhất cho mỗi object khác nhau, nếu không HashMap sẽ hoạt động sai** (Sai): Không thể và không cần unique — số object có thể vượt xa 2^32; HashMap được thiết kế để xử lý collision bằng linked list/tree trong bucket.
- **Chỉ cần override hashCode() là đủ, vì equals() mặc định của Object đã so sánh nội dung field** (Sai): equals() mặc định của Object so sánh reference (giống ==), không so nội dung — muốn so theo giá trị phải override cả equals() lẫn hashCode().
