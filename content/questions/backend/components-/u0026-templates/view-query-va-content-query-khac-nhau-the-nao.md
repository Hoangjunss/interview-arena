---
id: view-query-va-content-query-khac-nhau-the-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
View query và content query khác nhau thế nào?

## Question (EN)
How are view queries different from content queries?

## Đáp án chi tiết (VI)
View query đọc element/component nằm trong template của chính component; content query đọc nội dung parent project vào qua `ng-content`.\
\
Ví dụ signal query hiện đại:\
```typescript\
@Component({ template: `\u003cinput #searchBox /\u003e` })\
export class SearchPanel {\
  searchBox = viewChild\u003cElementRef\u003cHTMLInputElement\u003e\u003e(\\"searchBox\\")\
\
  focus() {\
    this.searchBox()?.nativeElement.focus()\
  }\
}\
```\
Dùng query khi cần tương tác với child component/directive hoặc DOM API thật. Không dùng query chỉ để truyền data; việc đó nên qua input/output hoặc service/store.

## Detailed Answer (EN)
A view query reads an element/component declared in the component own template; a content query reads content projected by a parent through `ng-content`.\
\
Modern signal query example:\
```typescript\
@Component({ template: `\u003cinput #searchBox /\u003e` })\
export class SearchPanel {\
  searchBox = viewChild\u003cElementRef\u003cHTMLInputElement\u003e\u003e(\\"searchBox\\")\
\
  focus() {\
    this.searchBox()?.nativeElement.focus()\
  }\
}\
```\
Use queries when you need to interact with a child component/directive or a real DOM API. Do not use queries just to pass data; use inputs/outputs or a service/store for that.
