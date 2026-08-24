---
id: arima-la-gi-va-tinh-dung-stationarity-quan-trong-the-nao-trong-chuoi-thoi-gian
position: backend
technology: time-series
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ARIMA là gì và tính dừng (stationarity) quan trọng thế nào trong chuỗi thời gian?

## Question (EN)
What is ARIMA, and why does stationarity matter in time series?

## Đáp án chi tiết (VI)
**Tính dừng (stationarity)** — một chuỗi dừng có các tính chất thống kê (trung bình, phương sai, tự tương quan) **không đổi theo thời gian**. Đa số mô hình chuỗi thời gian giả định chuỗi dừng, vì chỉ khi đó cấu trúc quá khứ mới ngoại suy được cho tương lai. Chuỗi có **xu hướng (trend)** hoặc **mùa vụ (seasonality)** thường không dừng.\
- Kiểm tra: nhìn biểu đồ; **ACF** giảm chậm là dấu hiệu không dừng; kiểm định **ADF** / **KPSS**.\
- Làm cho dừng: **lấy sai phân (differencing)**; biến đổi log/Box-Cox để ổn định phương sai.\
\
**ARIMA(p, d, q)** kết hợp ba thành phần:\
- **AR(p)** — hồi quy trên `p` giá trị trễ của chính chuỗi.\
- **I(d)** — số lần **lấy sai phân** để chuỗi trở nên dừng.\
- **MA(q)** — hồi quy trên `q` sai số dự báo trễ.\
\
Quy trình: chọn `d` để đạt dừng, xác định `p, q` qua ACF/PACF hoặc tiêu chí AIC/BIC. Với dữ liệu mùa vụ dùng **SARIMA** (thêm thành phần theo chu kỳ mùa).

## Detailed Answer (EN)
**Stationarity** — a stationary series has statistical properties (mean, variance, autocorrelation) that are **constant over time**. Most time-series models assume stationarity, because only then does the past structure extrapolate to the future. Series with a **trend** or **seasonality** are typically non-stationary.\
- Checking: inspect the plot; a slowly-decaying **ACF** signals non-stationarity; use the **ADF** / **KPSS** tests.\
- Making it stationary: **differencing**; log/Box-Cox transforms to stabilize the variance.\
\
**ARIMA(p, d, q)** combines three parts:\
- **AR(p)** — regression on `p` lagged values of the series itself.\
- **I(d)** — the number of **differences** taken to make the series stationary.\
- **MA(q)** — regression on `q` lagged forecast errors.\
\
Workflow: choose `d` for stationarity, then pick `p, q` via ACF/PACF or AIC/BIC. For seasonal data use **SARIMA** (adds seasonal-period terms).
