---
id: quiz-kubernetes-persistentvolume-pv-va-persistentvolumeclaim-pvc-quan-he-voi-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PersistentVolume (PV) và PersistentVolumeClaim (PVC) quan hệ với nhau thế nào?

## Đáp án trắc nghiệm
- [ ] PV thuộc về Pod, PVC thuộc về Node
- [x] PVC là YÊU CẦU lưu trữ do phía phát triển khai báo
- [ ] PV và PVC là hai tên gọi của cùng một tài nguyên
- [ ] PVC là bản sao lưu của PV

## Giải thích (VI)
PVC là đơn yêu cầu ("tôi cần 20Gi, ghi được từ một Node"), PV là ổ đĩa thật đáp ứng yêu cầu đó. Có StorageClass thì PV được cấp phát tự động khi PVC xuất hiện. Nhờ tách hai lớp, manifest ứng dụng không cần biết hạ tầng lưu trữ bên dưới là gì.

### Giải thích các phương án:
- **PV thuộc về Pod, PVC thuộc về Node** (Sai): Cả hai đều là tài nguyên API độc lập, không thuộc Pod hay Node.
- **PVC là YÊU CẦU lưu trữ do phía phát triển khai báo** (Đúng): Tách yêu cầu khỏi việc cấp phát giúp Pod không phụ thuộc hạ tầng lưu trữ cụ thể. Nó nêu dung lượng và chế độ truy cập cần có; PV là tài nguyên thật đáp ứng nó.
- **PV và PVC là hai tên gọi của cùng một tài nguyên** (Sai): Chúng là hai tài nguyên riêng biệt, gắn với nhau khi khớp yêu cầu.
- **PVC là bản sao lưu của PV** (Sai): Không có quan hệ sao lưu nào ở đây.
