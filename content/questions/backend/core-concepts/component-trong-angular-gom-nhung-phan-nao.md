---
id: component-trong-angular-gom-nhung-phan-nao
position: backend
technology: core-concepts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Component trong Angular gồm những phần nào?

## Question (EN)
What parts make up an Angular component?

## Đáp án chi tiết (VI)
Component là building block chính của Angular UI.\
\
Một component thường gồm class TypeScript chứa state/logic, template HTML chứa binding, style CSS scoped theo component và metadata trong `@Component` như `selector`, `templateUrl`, `styleUrl`, `imports`. Với standalone component, dependency được khai báo trực tiếp trong `imports` thay vì cần NgModule.

## Detailed Answer (EN)
A component is the main building block of Angular UI.\
\
It usually contains a TypeScript class for state and logic, an HTML template for bindings, component-scoped CSS, and `@Component` metadata such as `selector`, `templateUrl`, `styleUrl`, and `imports`. With standalone components, dependencies are declared directly in `imports` instead of requiring an NgModule.
