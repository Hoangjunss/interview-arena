---
id: paging-va-segmentation-khac-nhau-the-nao-x86-64-dung-co-che-nao
position: backend
technology: memory-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Paging và Segmentation khác nhau thế nào? x86-64 dùng cơ chế nào?

## Question (EN)
How do Paging and Segmentation differ? Which mechanism does x86-64 use?

## Đáp án chi tiết (VI)
Paging chia physical memory thành các frame kích thước cố định (4KB, 2MB, 1GB huge pages), và virtual memory thành pages cùng kích thước — OS map pages lên frames qua page table. Fragmentation chỉ là internal (page cuối có thể dư), không có external fragmentation. Segmentation chia memory thành các segment logic kích thước khác nhau (code, data, stack, heap) — phản ánh structure của program; có external fragmentation vì segment size biến động.\
\
x86-64 trên thực tế dùng paging là primary mechanism: 4-level page table (PML4→PDPT→PD→PT) với page size 4KB mặc định; segmentation vẫn tồn tại nhưng flat segmentation (base=0, limit=max) — essentially disabled. Linux dùng huge pages (2MB/1GB) để giảm TLB pressure cho database workloads: PostgreSQL và Redis benefit từ transparent huge pages. Thực tế lập trình: stack overflow = page fault khi access stack guard page; segfault = access unmapped virtual address.

## Detailed Answer (EN)
Paging divides physical memory into fixed-size frames (4KB, 2MB, 1GB huge pages) and virtual memory into pages of the same size — the OS maps pages to frames via page tables. Fragmentation is only internal (the last page of an allocation may be partially unused); there is no external fragmentation. Segmentation divides memory into variable-size logical segments (code, data, stack, heap) that reflect program structure; it suffers from external fragmentation because segment sizes vary.\
\
In practice, x86-64 uses paging as the primary mechanism: a 4-level page table (PML4→PDPT→PD→PT) with a default page size of 4KB; segmentation still exists but uses flat segmentation (base=0, limit=max) — effectively disabled. Linux uses huge pages (2MB/1GB) to reduce TLB pressure for database workloads: PostgreSQL and Redis benefit from transparent huge pages. Practical implications: a stack overflow is a page fault on the stack guard page; a segfault is an access to an unmapped virtual address.
