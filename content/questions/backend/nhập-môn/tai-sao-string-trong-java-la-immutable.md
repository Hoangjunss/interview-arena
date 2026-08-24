---
id: tai-sao-string-trong-java-la-immutable
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao String trong Java là immutable?

## Question (EN)
Why are Strings immutable in Java?

## Đáp án chi tiết (VI)
**String immutable** = tạo xong không sửa được nội dung; mọi thao tác \\"đổi\\" thực ra tạo object mới. Lý do thiết kế:\
\
- **String pool dùng chung:** literal `\\"hello\\"` được cache, nhiều biến trỏ chung. Nếu sửa được, đổi qua 1 biến sẽ phá mọi biến khác.\
- **Thread-safe miễn phí:** bất biến → nhiều thread đọc chung không cần khóa.\
- **An toàn làm key `HashMap`:** hashCode cố định → entry không bị \\"lạc\\" sau khi put.\
- **Bảo mật:** password/URL/classloader path không bị đổi ngầm sau khi đã kiểm tra.\
\
```java\
String s = \\"hi\\";\
s.concat(\\" there\\");    // tạo object MỚI, KHÔNG đổi s\
System.out.println(s); // vẫn \\"hi\\"\
s = s.concat(\\"!\\");     // muốn giữ thì gán lại\
```\
\
**Lưu ý:** nối chuỗi trong vòng lặp bằng `+` đẻ hàng loạt object rác → dùng **`StringBuilder`**. Dữ liệu nhạy cảm nên để `char[]` thay String (xóa được khỏi bộ nhớ; String nằm lại trong pool tới khi GC).

## Detailed Answer (EN)
**String is immutable** = once created its content cannot change; every \\"modifying\\" operation actually creates a new object. Design reasons:\
\
- **Shared String pool:** the literal `\\"hello\\"` is cached and shared by many variables. If it were mutable, changing one would corrupt all the others.\
- **Free thread safety:** immutable → many threads read it without locking.\
- **Safe `HashMap` key:** a fixed hashCode means entries are never \\"lost\\" after `put`.\
- **Security:** passwords/URLs/classloader paths cannot be silently altered after a check.\
\
```java\
String s = \\"hi\\";\
s.concat(\\" there\\");    // creates a NEW object, does NOT change s\
System.out.println(s); // still \\"hi\\"\
s = s.concat(\\"!\\");     // reassign if you want to keep it\
```\
\
**Note:** concatenating in a loop with `+` spawns piles of garbage objects → use **`StringBuilder`**. For sensitive data prefer `char[]` over String (you can wipe it; a String lingers in the pool until GC).
