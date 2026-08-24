---
id: phan-manh-trong-internal-va-phan-manh-ngoai-external-khac-nhau-the-nao
position: backend
technology: bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân mảnh trong (internal) và phân mảnh ngoài (external) khác nhau thế nào?

## Question (EN)
How do internal and external fragmentation differ?

## Đáp án chi tiết (VI)
Cả hai đều là bộ nhớ bị lãng phí, nhưng ở dạng khác nhau.\
\
**Internal fragmentation**: phần dư BÊN TRONG một khối đã cấp mà không dùng tới. Xảy ra khi cấp phát theo đơn vị cố định — ví dụ cần 3KB nhưng cấp cả một trang 4KB → 1KB thừa nằm trong trang, không ai dùng được. Paging luôn có internal fragmentation (trung bình nửa trang ở trang cuối).\
\
**External fragmentation**: bộ nhớ trống bị chia nhỏ thành nhiều mảnh rời rạc xen kẽ giữa các vùng đã cấp. Tổng free đủ lớn nhưng không mảnh liền kề nào đủ chứa yêu cầu. Xảy ra với cấp phát theo phân đoạn / kích thước thay đổi (segmentation, variable partition).\
\
**Khắc phục**: paging loại bỏ external fragmentation (mọi khung cùng kích thước, không cần vùng liền kề). External fragmentation còn có thể giảm bằng compaction (dồn vùng đã cấp lại) — tốn kém. Internal giảm bằng cách chọn kích thước trang/khối phù hợp.

## Detailed Answer (EN)
Both are wasted memory, but in different forms.\
\
**Internal fragmentation**: the unused leftover space INSIDE an allocated block. It happens with fixed-size allocation — e.g. you need 3KB but get a whole 4KB page → 1KB is wasted inside the page. Paging always has internal fragmentation (about half a page on the last page).\
\
**External fragmentation**: free memory broken into many scattered pieces interleaved with allocated regions. The total free space is large enough, but no single contiguous chunk can satisfy a request. It happens with segmentation / variable-size allocation.\
\
**Remedies**: paging eliminates external fragmentation (all frames the same size, no contiguity needed). External fragmentation can also be reduced by compaction (relocating allocated regions together) — expensive. Internal fragmentation is reduced by choosing an appropriate page/block size.
