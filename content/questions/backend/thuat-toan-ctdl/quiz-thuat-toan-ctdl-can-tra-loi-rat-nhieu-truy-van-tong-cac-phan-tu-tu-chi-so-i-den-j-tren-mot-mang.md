---
id: quiz-thuat-toan-ctdl-can-tra-loi-rat-nhieu-truy-van-tong-cac-phan-tu-tu-chi-so-i-den-j-tren-mot-mang
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần trả lời rất nhiều truy vấn "tổng các phần tử từ chỉ số i đến j" trên một mảng không đổi. Kỹ thuật phù hợp là gì?

## Đáp án trắc nghiệm
- [ ] Băm mỗi cặp (i, j) rồi cache kết quả đã tính
- [ ] Sắp xếp mảng trước rồi tìm kiếm nhị phân hai đầu mút
- [ ] Duyệt lại từ i đến j cho mỗi truy vấn, đã là tối ưu
- [x] Dựng mảng tổng tiền tố, mỗi truy vấn là một phép trừ

## Giải thích (VI)
Tổng tiền tố. Dựng prefix[k] = a[0] + … + a[k−1] một lần với chi phí O(n), sau đó tổng đoạn [i, j] là prefix[j+1] − prefix[i], mỗi truy vấn O(1). Đổi O(n) bộ nhớ phụ lấy thời gian trả lời hằng số.

### Giải thích các phương án:
- **Băm mỗi cặp (i, j) rồi cache kết quả đã tính** (Sai): Có tới n²/2 cặp nên bộ đệm phình to mà vẫn không nhanh hơn tiền tố.
- **Sắp xếp mảng trước rồi tìm kiếm nhị phân hai đầu mút** (Sai): Sắp xếp phá vỡ thứ tự chỉ số, mà truy vấn lại hỏi theo chỉ số.
- **Duyệt lại từ i đến j cho mỗi truy vấn, đã là tối ưu** (Sai): Cách này O(n) mỗi truy vấn, lãng phí khi số truy vấn lớn.
- **Dựng mảng tổng tiền tố, mỗi truy vấn là một phép trừ** (Đúng): Tiền xử lý O(n) rồi mỗi truy vấn là prefix[j+1] − prefix[i], tức O(1).
