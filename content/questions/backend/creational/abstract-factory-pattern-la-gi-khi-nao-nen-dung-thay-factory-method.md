---
id: abstract-factory-pattern-la-gi-khi-nao-nen-dung-thay-factory-method
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract Factory pattern là gì? Khi nào nên dùng thay Factory Method?

## Question (EN)
What is the Abstract Factory pattern? When should you use it instead of Factory Method?

## Đáp án chi tiết (VI)
Abstract Factory cung cấp interface để tạo ra các 'family' of related objects mà không cần specify concrete class. \
\
**Ví dụ:** `interface UIFactory { createButton(): Button; createCheckbox(): Checkbox; }` với `WindowsUIFactory` và `MacUIFactory` implement — đảm bảo Button và Checkbox luôn cùng theme. Khác Factory Method: Factory Method tạo một loại product, Abstract Factory tạo nhiều loại product có quan hệ với nhau. Dùng Abstract Factory khi: cần đảm bảo consistency giữa các component liên quan (UI theme, cross-platform widgets, database driver + connection pool); khi hệ thống cần support nhiều 'variant' và bạn muốn swap toàn bộ variant cùng lúc. Không dùng khi: chỉ có một loại product cần tạo (Factory Method đủ); khi family chỉ có một variant. Trong React, pattern này xuất hiện dưới dạng Context + Provider cung cấp nhiều service liên quan.

## Detailed Answer (EN)
Abstract Factory provides an interface for creating a family of related objects without specifying their concrete classes. \
\
**Example:** `interface UIFactory { createButton(): Button; createCheckbox(): Checkbox; }` with `WindowsUIFactory` and `MacUIFactory` implementing it — guaranteeing that Button and Checkbox always share the same theme. Difference from Factory Method: Factory Method creates one type of product; Abstract Factory creates multiple related product types. Use Abstract Factory when you need consistency among related components (UI themes, cross-platform widgets, database driver + connection pool), or when the system must support multiple 'variants' and you want to swap the entire variant at once. Skip it when only one product type needs to be created (Factory Method is enough) or when the family has only one variant. In React, this pattern appears as a Context + Provider that supplies several related services.
