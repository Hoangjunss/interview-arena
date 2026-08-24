---
id: thiet-ke-dich-vu-tim-dia-diem-gan-day-tim-tai-xe-quan-an-quanh-ban-danh-index-kh
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế dịch vụ tìm địa điểm gần đây (tìm tài xế/quán ăn quanh bạn). Đánh index không gian (geospatial) thế nào?

## Question (EN)
Design a nearby-places service (find drivers/restaurants around you). How do you index geospatial data?

## Đáp án chi tiết (VI)
**Yêu cầu**: cho tọa độ (lat, lng) + bán kính, trả nhanh các điểm gần; cập nhật vị trí động (tài xế di chuyển).\
\
**Vấn đề**: truy vấn 2 chiều (lat/lng) không map tốt lên B-tree một chiều → cần index không gian.\
\
**Các cách index**:\
- **Geohash**: mã hóa (lat, lng) thành chuỗi; hai điểm chung tiền tố càng dài thì càng gần nhau. Dễ lưu, dễ đánh index theo prefix, dễ shard. Nhược: hai điểm sát biên ô có prefix khác nhau → phải quét thêm các ô lân cận.\
- **Quadtree**: chia mặt phẳng đệ quy thành 4 ô; ô đông điểm chia nhỏ hơn → thích ứng theo mật độ. Truy vấn theo vùng tốt nhưng cây động khó phân tán hơn geohash.\
- (S2 cells của Google là biến thể nâng cao.)\
\
**Kiến trúc**: vị trí động lưu Redis (Geo commands) hoặc grid in-memory; điểm tĩnh (nhà hàng) trong DB có geospatial index. Truy vấn: tìm ô chứa điểm + các ô kề → lọc rồi tính khoảng cách chính xác.\
\
**Đánh đổi / bottleneck**: chọn độ chi tiết geohash (precision) cân giữa số ô phải quét và số điểm mỗi ô; khu trung tâm đông đúc là *hot partition*.

## Detailed Answer (EN)
$7a
