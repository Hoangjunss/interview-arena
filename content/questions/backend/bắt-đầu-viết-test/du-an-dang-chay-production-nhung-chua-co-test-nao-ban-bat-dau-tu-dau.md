---
id: du-an-dang-chay-production-nhung-chua-co-test-nao-ban-bat-dau-tu-dau
position: backend
technology: bắt-đầu-viết-test
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dự án đang chạy production nhưng chưa có test nào. Bạn bắt đầu từ đâu?

## Question (EN)
A production project has no tests at all. Where do you start?

## Đáp án chi tiết (VI)
Không viết test cho toàn bộ codebase. Bắt đầu ở nơi **lỗi gây thiệt hại lớn nhất** và code **dễ test nhất**.\
\
Thứ tự thực tế:\
\
1. **Dựng hạ tầng test trước** — cài runner (Vitest/Jest), 1 lệnh `pnpm test` chạy được, gắn vào CI. Nếu test không chạy trong CI thì sau vài tuần sẽ không ai chạy.\
2. **Viết test cho bug vừa xảy ra.** Mỗi lần fix bug production, thêm 1 test tái hiện bug đó. Bộ test lớn dần theo đúng những chỗ hay hỏng thật.\
3. **Phủ luồng sinh tiền** — thanh toán, tạo đơn, tính giá, phân quyền. Đây là chỗ lỗi tốn tiền thật.\
4. **Phủ hàm thuần logic** — tính toán, parse, validate, format. Không cần mock gì, viết nhanh, chạy nhanh.\
\
Cái **không** làm lúc mới bắt đầu: đặt mục tiêu coverage %, viết test cho getter/setter, hay dừng feature 2 tuần để \\"viết test cho cả hệ thống\\". Mục tiêu là code **tự kiểm tra được** (self-testing) chứ không phải một con số.

## Detailed Answer (EN)
Do not try to cover the whole codebase. Start where **bugs cost the most** and where code is **easiest to test**.\
\
A practical order:\
\
1. **Set up the harness first** — install a runner (Vitest/Jest), make `pnpm test` work with one command, wire it into CI. Tests that do not run in CI stop being run within weeks.\
2. **Write a test for the bug you just fixed.** Every production bug fix gets a reproducing test. The suite then grows exactly where things actually break.\
3. **Cover the money paths** — payment, order creation, pricing, authorization. Bugs here cost real money.\
4. **Cover pure logic** — calculation, parsing, validation, formatting. No mocks needed, fast to write, fast to run.\
\
What **not** to do early on: set a coverage percentage target, test getters/setters, or freeze feature work for two weeks to \\"test the whole system\\". The goal is **self-testing code**, not a number.
