---
id: pickling-unpickling-la-gi-vi-sao-unpickle-du-lieu-khong-tin-cay-lai-nguy-hiem
position: backend
technology: standard-library
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pickling/unpickling là gì? Vì sao unpickle dữ liệu không tin cậy lại nguy hiểm?

## Question (EN)
What are pickling/unpickling, and why is unpickling untrusted data dangerous?

## Đáp án chi tiết (VI)
`pickle` **serialize** một object Python thành byte stream và **deserialize** ngược lại (dựng lại object). Khác JSON: giữ được cấu trúc Python phức tạp (object tùy biến, tham chiếu vòng) nhưng chỉ Python đọc được và không cross-language.\
\
**Nguy hiểm:** quá trình unpickle có thể **gọi constructor/hàm bất kỳ** (qua hook như `__reduce__`), nên một payload độc hại khiến `pickle.loads` **thực thi mã tùy ý (RCE)** ngay lúc load — không cần gọi thêm gì.\
\
Quy tắc: **không bao giờ** unpickle dữ liệu từ nguồn không tin cậy (request, file upload, cache dùng chung). Trao đổi qua mạng dùng JSON; nếu buộc phải pickle, ký HMAC và chỉ chấp nhận dữ liệu tự sinh.

## Detailed Answer (EN)
`pickle` **serializes** a Python object into a byte stream and **deserializes** it back (reconstructing the object). Unlike JSON, it preserves complex Python structures (custom objects, cyclic references) but is Python-only and not cross-language.\
\
**The danger:** unpickling can **call arbitrary constructors/functions** (via hooks like `__reduce__`), so a malicious payload makes `pickle.loads` **execute arbitrary code (RCE)** at load time — nothing else needs to be invoked.\
\
Rule: **never** unpickle data from an untrusted source (requests, uploads, shared caches). Use JSON for data crossing a trust boundary; if you must pickle, HMAC-sign it and accept only self-produced data.
