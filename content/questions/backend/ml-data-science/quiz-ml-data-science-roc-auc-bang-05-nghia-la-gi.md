---
id: quiz-ml-data-science-roc-auc-bang-05-nghia-la-gi
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ROC-AUC bằng 0,5 nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Dữ liệu bị mất cân bằng nghiêm trọng
- [ ] Mô hình dự đoán đúng 50% số mẫu
- [ ] Mô hình có độ chính xác trung bình khá
- [x] Phân biệt không hơn đoán ngẫu nhiên

## Giải thích (VI)
Mô hình không phân biệt được hai lớp, ngang với đoán ngẫu nhiên. AUC là xác suất mô hình chấm điểm một mẫu dương ngẫu nhiên cao hơn một mẫu âm ngẫu nhiên — 1,0 là hoàn hảo, 0,5 là vô dụng.

### Giải thích các phương án:
- **Dữ liệu bị mất cân bằng nghiêm trọng** (Sai): AUC không phản ánh trực tiếp mức mất cân bằng.
- **Mô hình dự đoán đúng 50% số mẫu** (Sai): AUC không phải tỉ lệ dự đoán đúng.
- **Mô hình có độ chính xác trung bình khá** (Sai): 0,5 là mức tệ nhất về khả năng phân biệt.
- **Phân biệt không hơn đoán ngẫu nhiên** (Đúng): Đường ROC trùng với đường chéo của đoán ngẫu nhiên.
