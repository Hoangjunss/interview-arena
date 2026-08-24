---
id: ham-sinh-uuid-dung-math-random-goi-network-thi-test-ra-sao-ma-ket-qua-van-on-din
position: backend
technology: đầu-vào-ngẫu-nhiên
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm sinh UUID / dùng `Math.random` / gọi network thì test ra sao mà kết quả vẫn ổn định?

## Question (EN)
How do you keep tests deterministic when code uses UUIDs, `Math.random`, or network calls?

## Đáp án chi tiết (VI)
Mọi nguồn không xác định phải được **đẩy ra biên** rồi thay bằng giá trị cố định trong test.\
\
**Ngẫu nhiên và UUID:** đừng gọi trực tiếp trong hàm nghiệp vụ; nhận qua tham số hoặc mock module sinh id.\
\
```ts\
vi.mock('./id', () =\u003e ({ newId: () =\u003e 'order-0001' }))\
// hoặc: createOrder(input, { newId: () =\u003e 'order-0001' })\
```\
\
**Network:** chặn ở tầng HTTP thay vì mock hàm gọi API, để code parse/xử lý lỗi vẫn chạy thật.\
\
```ts\
server.use(http.get('/api/orders/:id', () =\u003e HttpResponse.json({ id: '1', amount: 500 })))\
```\
\
Các điểm không xác định khác cũng phải xử lý, nếu không sẽ thành test lúc xanh lúc đỏ:\
\
- **Thứ tự phần tử**: DB không đảm bảo thứ tự khi không có `ORDER BY` → assert theo tập hợp hoặc sort trước khi so sánh.\
- **Số dấu phẩy động**: dùng `toBeCloseTo` thay `toBe`.\
- **Locale**: `toLocaleString` khác nhau giữa máy dev và CI → cố định locale.\
\
Mục tiêu: chạy test 100 lần trên 3 máy khác nhau phải ra cùng kết quả. Test không xác định sẽ nhanh chóng bị cả nhóm bỏ qua khi nó đỏ.

## Detailed Answer (EN)
$86
