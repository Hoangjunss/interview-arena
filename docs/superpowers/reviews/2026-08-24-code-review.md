# Code Review — Interview Arena
**Ngày:** 2026-08-24
**Phạm vi:** Backend (`backend/src`), Frontend (`web/src`), Question bank (`content/questions/devops`)
**Người review:** Claude (code-review skill, 2 lượt review riêng)

---

## Tổng quan

| # | Mức độ | Khu vực | File | Vấn đề |
|---|--------|---------|------|--------|
| 1 | 🔴 Cao | Backend | `RateLimitFilter.java` | Bypass rate-limit qua `X-Forwarded-For` giả mạo |
| 2 | 🔴 Cao | Backend | `FlashcardService.java` | Mất đồng bộ Redis/DB — flashcard biến mất khỏi due-list vĩnh viễn |
| 3 | 🟡 Trung bình | Backend | `SecurityConfig.java` | Prometheus scrape luôn fail do thiếu permitAll |
| 4 | 🟢 Thấp | Frontend | `QuestionBankPage.tsx` | Race giữa 2 `useEffect` gây fetch sai/lãng phí khi đổi filter |
| 5 | 🟡 Trung bình | Content | `docker-layer-caching-optimization.md` | Trùng nội dung với `docker-layer-caching.md` |
| 6 | 🟡 Trung bình | Content | `alb-vs-nlb-when-to-use.md` | Tên file/nội dung không khớp — thực chất là bài debug health check |
| 7 | 🟢 Thấp | Content | `kubectl-common-commands.md` | Sai kiến thức: `kubectl edit` không đọc/ghi trực tiếp etcd |

---

## Backend

### 1. 🔴 Bypass rate-limit qua header `X-Forwarded-For` giả mạo
**File:** `backend/src/main/java/com/interviewarena/auth/RateLimitFilter.java:54`

`getClientIp()` tin tưởng giá trị đầu tiên trong header `X-Forwarded-For` do client gửi lên.

**Kịch bản khai thác:** App đứng sau Caddy (mới thêm cùng commit này). Caddy mặc định **append** vào `X-Forwarded-For` chứ không replace. Attacker chỉ cần tự gắn `X-Forwarded-For: 1.2.3.4` (giá trị ngẫu nhiên, đổi mỗi request) vào request login/register → `xff.split(",")[0]` trả về giá trị attacker chọn → mỗi request có key rate-limit khác nhau → **giới hạn brute-force trên `/api/auth/login` và `/api/auth/register` bị vô hiệu hoàn toàn**.

**Đề xuất:** Lấy IP thật từ danh sách proxy tin cậy (config trusted proxies ở Caddy/Spring), hoặc dùng giá trị **cuối cùng** thêm bởi proxy gần nhất (không phải đầu tiên do client control), hoặc dùng `X-Real-IP` do Caddy set cố định qua `header_up`.

---

### 2. 🔴 Mất đồng bộ Redis/DB khiến flashcard "biến mất" khỏi due-list vĩnh viễn
**File:** `backend/src/main/java/com/interviewarena/flashcard/FlashcardService.java:53`

`reviewCard()` ghi vào Redis ZSET (due-cards) mà không xử lý lỗi và không đồng bộ với DB save.

**Kịch bản lỗi:** User submit review → `repository.save(review)` commit thành công → `redisTemplate.opsForZSet().add(...)` throw exception (Redis tạm gián đoạn) → trả 500 nhưng review đã lưu DB. Lúc này câu hỏi không còn nằm trong `findNeverReviewedQuestionIds()` (đã có review) nhưng cũng không có trong Redis ZSET. Vì `dueCards()` (line 74) vẫn coi `redisSuccess=true`, DB fallback (line 81-84) **không bao giờ được gọi** → câu hỏi này biến mất khỏi due-list của user vĩnh viễn.

**Đề xuất:** Bọc DB save + Redis update trong logic có retry/queue cho Redis, hoặc kiểm tra kết quả ghi Redis (không chỉ đọc) và fallback DB nếu ghi thất bại.

---

### 3. 🟡 Prometheus scrape sẽ luôn fail do thiếu permitAll
**File:** `backend/src/main/java/com/interviewarena/config/SecurityConfig.java:31`

Chỉ `/actuator/health` được `permitAll()`; `/actuator/prometheus` vẫn rơi vào `anyRequest().authenticated()`.

**Hệ quả:** Commit này thêm `micrometer-registry-prometheus` và expose `management.endpoints.web.exposure.include: health, prometheus`, nhưng Prometheus scrape config chuẩn không gửi `Authorization` header → mọi lần scrape nhận 401/403 → **thu thập metrics không hoạt động, âm thầm không ai biết**.

**Đề xuất:** Thêm `/actuator/prometheus` vào danh sách permitAll (hoặc bảo vệ bằng basic-auth riêng cho Prometheus thay vì JWT).

---

## Frontend

### 4. 🟢 Race giữa 2 `useEffect` gây fetch sai/lãng phí khi đổi filter
**File:** `web/src/pages/QuestionBankPage.tsx:19`

Tách reset trang và fetch data thành 2 `useEffect` riêng gây fetch dư/sai khi đổi filter lúc không ở trang 0.

**Kịch bản:** User đang ở page 2 của filter "frontend/react/junior", đổi technology sang "vue". Effect fetch (deps: position, technology, level, page) chạy trước với `technology` mới nhưng `page=2` cũ → gọi API page 2 của filter mới (rỗng/sai) → set `totalPages` sai tạm thời. Sau đó effect reset mới set `page=0`, kích hoạt fetch đúng lần 2. Kết quả: user thấy dữ liệu sai/trống trong 1 khoảnh khắc + tốn 1 request thừa mỗi lần đổi filter khi không ở trang 0.

**Đề xuất:** Gộp reset `page` và fetch vào cùng 1 effect, hoặc guard `if (page !== 0) { setPage(0); return; }` trước khi fetch.

---

## Question bank (content)

### 5. 🟡 Trùng nội dung — Docker layer caching
**File:** `content/questions/devops/docker/docker-layer-caching-optimization.md:2`

File này gần như là bản diễn giải lại của `docker-layer-caching.md` — cùng câu hỏi, cùng ví dụ `npm ci` / thứ tự `package.json`, cùng lời khuyên về `apt-get`/BuildKit/`--cache-from`, chỉ khác id và level.

**Hệ quả:** Vi phạm quy tắc "không trùng câu hỏi trong cùng 1 folder công nghệ" (`docs/superpowers/specs/2026-08-24-content-expansion-design.md §4`), tốn 1 slot nội dung.

**Đề xuất:** Gộp lại hoặc xóa file trùng.

---

### 6. 🟡 Tên file/nội dung không khớp — ALB vs NLB
**File:** `content/questions/devops/cloud-aws-gcp-azure/alb-vs-nlb-when-to-use.md:2`

Tên file/id hứa hẹn so sánh ALB vs NLB, nhưng nội dung thực tế nói về debug lỗi health check của target group — không so sánh ALB/NLB.

**Hệ quả:** Mục lục folder gây hiểu lầm, vô tình trùng slot chủ đề load balancer (đã có `load-balancer-alb-vs-nlb.md` xử lý đúng) dưới tên sai.

**Đề xuất:** Đổi tên file đúng nội dung (vd: `alb-target-group-health-check-debugging.md`) hoặc viết lại nội dung đúng tiêu đề.

---

### 7. 🟢 Sai kiến thức kỹ thuật — `kubectl edit`
**File:** `content/questions/devops/kubernetes/kubectl-common-commands.md:54`

Ghi: `kubectl edit` "thực chất mở trực tiếp YAML từ etcd để sửa" — **sai**. `kubectl edit` lấy object qua REST API của apiserver (GET) rồi PUT lại qua apiserver, không bao giờ truy cập etcd trực tiếp.

**Đề xuất:** Sửa thành: `kubectl edit` lấy resource hiện tại qua apiserver, cho sửa YAML/JSON tại chỗ, rồi PUT lại qua apiserver để áp dụng.

---

## Ưu tiên xử lý đề xuất
1. #1, #2 (bảo mật + mất dữ liệu logic) — fix trước khi go-live.
2. #3 (monitoring không hoạt động) — fix trước khi dựa vào Prometheus alert.
3. #4, #5, #6, #7 — dọn dẹp, không khẩn cấp.
