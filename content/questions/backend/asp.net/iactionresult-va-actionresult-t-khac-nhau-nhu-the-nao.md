---
id: iactionresult-va-actionresult-t-khac-nhau-nhu-the-nao
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`IActionResult` và `ActionResult\u003cT\u003e` khác nhau như thế nào?

## Question (EN)
What is the difference between IActionResult and ActionResult\u003cT\u003e in ASP.NET Core?

## Đáp án chi tiết (VI)
`IActionResult` là interface cho tất cả action return types. `ActionResult` là implementation non-generic. `ActionResult\u003cT\u003e` cho phép trả về cả typed response thành công lẫn error results. Các implementation phổ biến: `OkObjectResult` (200), `NotFoundResult` (404), `BadRequestResult` (400), `CreatedAtActionResult` (201). Dùng `ActionResult\u003cT\u003e` trong Web API để đặc tả rõ kiểu trả về.

## Detailed Answer (EN)
`IActionResult` is the interface for all action return types. `ActionResult` is the non-generic implementation. `ActionResult\u003cT\u003e` enables returning either a successful typed response or error results in the same method. Common implementations: `OkObjectResult` (200), `NotFoundResult` (404), `BadRequestResult` (400). Use `ActionResult\u003cT\u003e` in Web APIs to clearly specify the success return type.
