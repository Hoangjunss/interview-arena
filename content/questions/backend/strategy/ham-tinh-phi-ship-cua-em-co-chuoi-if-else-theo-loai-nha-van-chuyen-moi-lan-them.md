---
id: ham-tinh-phi-ship-cua-em-co-chuoi-if-else-theo-loai-nha-van-chuyen-moi-lan-them
position: backend
technology: strategy
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm tính phí ship của em có chuỗi if/else theo loại nhà vận chuyển, mỗi lần thêm hãng mới lại phải sửa hàm đó. Em refactor thế nào?

## Question (EN)
My shipping-fee function is a long if/else over carrier type, and every new carrier means editing it again. How do I refactor?

## Đáp án chi tiết (VI)
Đây là mùi code **switch statements** thường gặp: một hàm phân nhánh theo *loại* và phải sửa mỗi khi có loại mới. Cách xử lý là tách mỗi nhánh thành một **strategy** cùng interface, rồi chọn strategy qua một bảng tra.\
\
```ts\
interface ShippingRate {\
  calculate(order: Order): number\
}\
\
const rates: Record\u003cstring, ShippingRate\u003e = {\
  ghtk: { calculate: (o) =\u003e 15000 + o.weightKg * 4000 },\
  ghn: { calculate: (o) =\u003e 18000 + o.weightKg * 3500 },\
}\
\
function shippingFee(carrier: string, order: Order) {\
  const rate = rates[carrier]\
  if (!rate) throw new Error(`unknown carrier: ${carrier}`)\
  return rate.calculate(order)\
}\
```\
\
Thêm hãng mới = thêm một entry, không đụng vào `shippingFee`. Mỗi công thức tách riêng nên test được độc lập.\
\
**Đừng làm quá:** nếu chỉ có 2 nhánh và chúng gần như không đổi, `if/else` vẫn dễ đọc hơn. Chuyển sang Strategy khi nhánh đã bắt đầu **lặp lại ở nhiều chỗ** hoặc mỗi nhánh dài hơn vài dòng.

## Detailed Answer (EN)
This is the classic **switch statements** smell: one function branching on a *type*, edited every time a new type appears. The fix is to extract each branch into a **strategy** behind one interface, then pick the strategy from a lookup table.\
\
```ts\
interface ShippingRate {\
  calculate(order: Order): number\
}\
\
const rates: Record\u003cstring, ShippingRate\u003e = {\
  ghtk: { calculate: (o) =\u003e 15000 + o.weightKg * 4000 },\
  ghn: { calculate: (o) =\u003e 18000 + o.weightKg * 3500 },\
}\
\
function shippingFee(carrier: string, order: Order) {\
  const rate = rates[carrier]\
  if (!rate) throw new Error(`unknown carrier: ${carrier}`)\
  return rate.calculate(order)\
}\
```\
\
A new carrier is a new entry; `shippingFee` never changes. Each formula is isolated, so it can be tested on its own.\
\
**Do not overdo it:** with two stable branches, `if/else` reads better. Move to Strategy once the branching is **duplicated in several places** or each branch grows past a few lines.
