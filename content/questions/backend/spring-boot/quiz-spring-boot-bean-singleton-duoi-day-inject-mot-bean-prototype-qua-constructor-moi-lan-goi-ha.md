---
id: quiz-spring-boot-bean-singleton-duoi-day-inject-mot-bean-prototype-qua-constructor-moi-lan-goi-ha
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bean singleton dưới đây inject một bean prototype qua constructor. Mỗi lần gọi handle(), nó có nhận một Task mới không?

## Đáp án trắc nghiệm
- [x] Không — Worker là singleton nên Task chỉ được inject đúng một lần lúc khởi tạo
- [ ] Lỗi khởi động — không được inject bean prototype vào bean singleton
- [ ] Có — Spring tự nhận diện prototype và inject một provider, nên mỗi handle() nhận Task mới mà không cần thêm gì
- [ ] Có — vì Task là prototype nên Spring tạo Task mới mỗi lần Worker truy cập tới nó

## Giải thích (VI)
Không. Worker là singleton nên Spring chỉ inject Task một lần — lúc khởi tạo Worker. Dù Task khai báo prototype, mọi lần handle() sau đó đều dùng lại chính instance đã inject đó. Prototype chỉ tạo mới tại thời điểm inject/getBean, không phải mỗi lần truy cập. Muốn Task mới mỗi lần, dùng ObjectProvider , method @Lookup, hoặc gọi getBean().

### Giải thích các phương án:
- **Không — Worker là singleton nên Task chỉ được inject đúng một lần lúc khởi tạo** (Đúng): Đúng: scope prototype chỉ tạo instance mới tại thời điểm inject; singleton chỉ được inject một lần nên nó giữ mãi một prototype instance cho mọi lần gọi handle().
- **Lỗi khởi động — không được inject bean prototype vào bean singleton** (Sai): Sai: Spring cho phép inject prototype vào singleton; nó chỉ không tạo instance mới về sau — không có lỗi khởi động.
- **Có — Spring tự nhận diện prototype và inject một provider, nên mỗi handle() nhận Task mới mà không cần thêm gì** (Sai): Sai: Spring KHÔNG tự làm điều này với inject trực tiếp; muốn có instance mới phải chủ động dùng ObjectProvider/@Lookup hoặc getBean.
- **Có — vì Task là prototype nên Spring tạo Task mới mỗi lần Worker truy cập tới nó** (Sai): Sai: prototype tạo instance mới mỗi lần INJECT/getBean, không phải mỗi lần truy cập; Worker chỉ được inject một lần.
