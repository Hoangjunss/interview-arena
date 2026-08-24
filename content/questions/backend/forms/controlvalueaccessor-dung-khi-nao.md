---
id: controlvalueaccessor-dung-khi-nao
position: backend
technology: forms
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ControlValueAccessor dùng khi nào?

## Question (EN)
When should you use ControlValueAccessor?

## Đáp án chi tiết (VI)
ControlValueAccessor là adapter giữa Angular Forms API và custom UI component.\
\
Skeleton tối thiểu:\
```typescript\
export class RatingInput implements ControlValueAccessor {\
  value = 0\
  disabled = false\
  private onChange = (value: number) =\u003e {}\
  private onTouched = () =\u003e {}\
\
  writeValue(value: number) { this.value = value }\
  registerOnChange(fn: (value: number) =\u003e void) { this.onChange = fn }\
  registerOnTouched(fn: () =\u003e void) { this.onTouched = fn }\
  setDisabledState(disabled: boolean) { this.disabled = disabled }\
}\
```\
Lỗi phổ biến là emit change trong `writeValue`, gây loop.

## Detailed Answer (EN)
ControlValueAccessor is the adapter between Angular Forms API and a custom UI component.\
\
Minimal skeleton:\
```typescript\
export class RatingInput implements ControlValueAccessor {\
  value = 0\
  disabled = false\
  private onChange = (value: number) =\u003e {}\
  private onTouched = () =\u003e {}\
\
  writeValue(value: number) { this.value = value }\
  registerOnChange(fn: (value: number) =\u003e void) { this.onChange = fn }\
  registerOnTouched(fn: () =\u003e void) { this.onTouched = fn }\
  setDisabledState(disabled: boolean) { this.disabled = disabled }\
}\
```\
A common bug is emitting change from `writeValue`, which creates loops.
