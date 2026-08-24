---
id: muon-response-chi-chua-field-da-thuc-su-duoc-set-khong-kem-gia-tri-mac-dinh-lam
position: backend
technology: serialization
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn response chỉ chứa field đã thực sự được set, không kèm giá trị mặc định — làm thế nào?

## Question (EN)
How do you make a response contain only the fields that were actually set, without defaults?

## Đáp án chi tiết (VI)
Dùng `response_model_exclude_unset=True` trên decorator của path operation. FastAPI sẽ serialize model bằng `exclude_unset`, tức bỏ qua mọi field chưa được gán tường minh khi tạo object.\
\
```python\
class Item(BaseModel):\
    name: str\
    description: str | None = None\
    price: float\
    tax: float = 10.5\
\
@app.get(\\"/items/{item_id}\\

## Detailed Answer (EN)
Use `response_model_exclude_unset=True` on the path operation decorator. FastAPI then serializes the model with `exclude_unset`, dropping every field that was not explicitly assigned when the object was built.\
\
```python\
class Item(BaseModel):\
    name: str\
    description: str | None = None\
    price: float\
    tax: float = 10.5\
\
@app.get(\\"/items/{item_id}\\
