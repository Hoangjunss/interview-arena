---
id: sli-slo-sla-difference
position: devops
technology: monitoring-observability
level: junior
tags: [sre, sli, slo, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt SLI, SLO và SLA. Cho ví dụ cụ thể cho một API thanh toán.

## Question (EN)
Distinguish between SLI, SLO, and SLA. Give a concrete example for a payment API.

## Đáp án chi tiết (VI)
Ba khái niệm này liên quan chặt chẽ nhưng phục vụ mục đích khác nhau:

| | Định nghĩa | Đối tượng | Ví dụ |
|---|---|---|---|
| **SLI** (Service Level Indicator) | Chỉ số đo lường thực tế | Kỹ thuật, nội bộ | "Tỉ lệ request trả về trong < 300ms" |
| **SLO** (Service Level Objective) | Mục tiêu nội bộ cho SLI | Kỹ thuật/sản phẩm, nội bộ | "99.9% request phải trả về trong < 300ms trong 30 ngày" |
| **SLA** (Service Level Agreement) | Cam kết hợp đồng với khách hàng, có phạt nếu vi phạm | Kinh doanh, bên ngoài | "Cam kết uptime 99.5%, nếu vi phạm hoàn tiền X%" |

**Ví dụ cho API thanh toán `/payment/charge`**:
- **SLI**: tỉ lệ request thành công (`status=200`) trong tổng số request, đo mỗi phút bằng Prometheus.
- **SLO**: "99.95% request `/payment/charge` phải thành công trong cửa sổ rolling 30 ngày" — đây là mục tiêu nội bộ team đặt ra, chặt hơn SLA để có buffer an toàn.
- **SLA**: "Chúng tôi cam kết với merchant uptime 99.9%, nếu dưới mức này sẽ hoàn phí giao dịch tháng đó" — đây là cam kết hợp đồng, thường lỏng hơn SLO nội bộ.

**Quan hệ giữa 3 khái niệm**: SLO luôn nên **chặt hơn** SLA (ví dụ SLO 99.95% > SLA 99.9%) để team có "khoảng đệm" phản ứng trước khi vi phạm SLA thực sự xảy ra và bị phạt hợp đồng. SLI là dữ liệu thô để tính cả SLO lẫn theo dõi SLA.

**Pitfall thường gặp**:
- Đặt SLO 100% là phi thực tế và tốn kém — 99.99% vs 99.999% khác nhau rất nhiều về chi phí kỹ thuật (mỗi số 9 thêm vào tốn nhiều hơn theo cấp số). Cần chọn SLO dựa trên nhu cầu thực tế của người dùng, không phải "càng cao càng tốt".
- Không phải mọi API cần cùng SLO — API core (thanh toán) cần SLO cao hơn API phụ (gợi ý sản phẩm), team hay mắc lỗi áp SLO đồng nhất cho mọi endpoint.
- SLA thường do sales/business cam kết mà không tham khảo kỹ thuật, dẫn đến SLA "hứa" cao hơn khả năng thực tế hệ thống đáp ứng — cần review kỹ thuật trước khi ký SLA.

## Detailed Answer (EN)
These three concepts are closely related but serve different purposes:

| | Definition | Audience | Example |
|---|---|---|---|
| **SLI** (Service Level Indicator) | An actual measured metric | Engineering, internal | "% of requests returning in < 300ms" |
| **SLO** (Service Level Objective) | An internal target for the SLI | Engineering/product, internal | "99.9% of requests must return in < 300ms over 30 days" |
| **SLA** (Service Level Agreement) | A contractual commitment to customers, with penalties for violation | Business, external | "99.5% uptime guaranteed, or a refund of X% applies" |

**Example for the `/payment/charge` API**:
- **SLI**: the ratio of successful (`status=200`) requests to total requests, measured every minute via Prometheus.
- **SLO**: "99.95% of `/payment/charge` requests must succeed within a rolling 30-day window" — an internal team target, stricter than the SLA to leave a safety buffer.
- **SLA**: "We guarantee merchants 99.9% uptime; falling below that refunds that month's transaction fees" — a contractual commitment, usually looser than the internal SLO.

**Relationship between the three**: an SLO should always be **stricter** than the SLA (e.g. SLO 99.95% > SLA 99.9%) so the team has a "buffer" to react before an actual SLA breach and contractual penalty occur. The SLI is the raw data used to compute both the SLO and to track SLA compliance.

**Common pitfalls**:
- Setting an SLO of 100% is unrealistic and expensive — 99.99% vs 99.999% differ enormously in engineering cost (each additional "nine" costs exponentially more). SLOs should be chosen based on actual user needs, not "higher is always better".
- Not every API needs the same SLO — a core API (payments) needs a higher SLO than a secondary one (product recommendations); teams commonly make the mistake of applying one uniform SLO to every endpoint.
- SLAs are often committed to by sales/business without engineering input, resulting in an SLA that promises more than the system can realistically deliver — always have engineering review an SLA before it's signed.
