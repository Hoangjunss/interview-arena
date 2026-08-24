---
id: named-arguments-va-constructor-property-promotion-trong-php-8-giai-quyet-van-de
position: backend
technology: php-8
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Named arguments và constructor property promotion trong PHP 8 giải quyết vấn đề gì?

## Question (EN)
What problems do PHP 8 named arguments and constructor property promotion solve?

## Đáp án chi tiết (VI)
**Constructor property promotion** cho phép khai báo và gán property ngay trên tham số constructor, bỏ đi phần lặp `private X $x; ... $this-\u003ex = $x;`.\
\
```php\
final class Money\
{\
    public function __construct(\
        public readonly int $amount,\
        public readonly string $currency = 'VND',\
    ) {}\
}\
```\
\
**Named arguments** cho phép truyền tham số **theo tên** thay vì theo thứ tự:\
\
```php\
$order = new Order(userId: 7, note: null, couponCode: 'SALE10');\
htmlspecialchars($text, double_encode: false);   // bỏ qua các tham số giữa\
```\
\
Lợi ích: gọi hàm nhiều tham số boolean/null dễ đọc hơn, và **bỏ qua được tham số optional ở giữa** mà không phải truyền lại giá trị mặc định.\
\
**Cần lưu ý:** khi đã có người dùng named argument, **tên tham số trở thành phần của API công khai** — đổi tên tham số là breaking change. Named argument phải đứng **sau** các positional argument, và không được truyền trùng một tham số hai lần.

## Detailed Answer (EN)
**Constructor property promotion** declares and assigns properties directly on constructor parameters, removing the `private X $x; ... $this-\u003ex = $x;` boilerplate.\
\
```php\
final class Money\
{\
    public function __construct(\
        public readonly int $amount,\
        public readonly string $currency = 'VND',\
    ) {}\
}\
```\
\
**Named arguments** pass parameters **by name** instead of by position:\
\
```php\
$order = new Order(userId: 7, note: null, couponCode: 'SALE10');\
htmlspecialchars($text, double_encode: false);   // skip the parameters in between\
```\
\
Benefits: calls with many boolean/null parameters become readable, and you can **skip optional parameters in the middle** without restating their defaults.\
\
**Caveat:** once callers use named arguments, **parameter names become part of the public API** — renaming one is a breaking change. Named arguments must come **after** positional ones, and the same parameter cannot be passed twice.
