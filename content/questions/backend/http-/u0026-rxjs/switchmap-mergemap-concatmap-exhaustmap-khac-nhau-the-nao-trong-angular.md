---
id: switchmap-mergemap-concatmap-exhaustmap-khac-nhau-the-nao-trong-angular
position: backend
technology: http-\u0026-rxjs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`switchMap`, `mergeMap`, `concatMap`, `exhaustMap` khác nhau thế nào trong Angular?

## Question (EN)
How do `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap` differ in Angular?

## Đáp án chi tiết (VI)
`switchMap` hủy request trước và lấy request mới nhất, phù hợp search/autocomplete.\
\
Ví dụ search box:\
```typescript\
results$ = this.search.valueChanges.pipe(\
  debounceTime(300),\
  distinctUntilChanged(),\
  switchMap(term =\u003e this.http.get\u003cSearchResult[]\u003e(\\"/api/search\\

## Detailed Answer (EN)
`switchMap` cancels the previous request and keeps the latest, fitting search/autocomplete.\
\
Search box example:\
```typescript\
results$ = this.search.valueChanges.pipe(\
  debounceTime(300),\
  distinctUntilChanged(),\
  switchMap(term =\u003e this.http.get\u003cSearchResult[]\u003e(\\"/api/search\\
