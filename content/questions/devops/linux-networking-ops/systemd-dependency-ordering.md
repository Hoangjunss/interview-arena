---
id: systemd-dependency-ordering
position: devops
technology: linux-networking-ops
level: mid
tags: [systemd, process-management, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một service của bạn bị fail khi boot vì nó cần kết nối database nhưng PostgreSQL chưa kịp sẵn sàng, dù đã có `After=postgresql.service` trong unit file. Tại sao vẫn xảy ra và cách khắc phục?

## Question (EN)
Your service fails on boot because it needs a database connection but PostgreSQL isn't ready yet, even though you've set `After=postgresql.service` in the unit file. Why does this still happen, and how do you fix it?

## Đáp án chi tiết (VI)
Đây là một hiểu lầm rất phổ biến về `After=` trong systemd: **`After=` chỉ đảm bảo THỨ TỰ KHỞI ĐỘNG (ordering), không đảm bảo dependency đã thực sự sẵn sàng phục vụ (readiness)**.

**Vấn đề cụ thể**: `After=postgresql.service` chỉ nói với systemd "hãy start unit của tôi **sau khi** postgresql.service đã được **systemd coi là started**". Nhưng "started" theo systemd với `Type=simple` (mặc định) nghĩa là **process đã được exec() xong**, không có nghĩa là PostgreSQL đã hoàn tất khởi tạo (đọc WAL, mount tablespace, mở port 5432 để nhận kết nối) — với DB lớn, quá trình recovery/khởi tạo có thể mất vài giây đến vài chục giây **sau khi** process đã "started" theo góc nhìn systemd.

**Các hướng khắc phục, từ đúng chuẩn tới thực dụng**:

1. **Dùng `Type=notify` nếu PostgreSQL hỗ trợ** (PostgreSQL từ bản package hiện đại có hỗ trợ sd_notify): service tự báo `READY=1` cho systemd khi thực sự sẵn sàng, các unit `After=` nó sẽ chờ đúng tín hiệu này thay vì chỉ chờ process khởi động.

2. **Retry với backoff ở tầng application** — đây là cách **đúng đắn và bền vững nhất** vì dependency readiness là vấn đề runtime, không nên chỉ dựa vào thứ tự khởi động của systemd (đặc biệt khi scale ra container/Kubernetes, nơi khái niệm "boot order" của systemd không còn áp dụng):
```python
for attempt in range(10):
    try:
        conn = connect_db()
        break
    except ConnectionError:
        time.sleep(min(2 ** attempt, 30))
```
Áp dụng tương tự cho `Restart=on-failure` + `RestartSec` trong unit file để systemd tự restart service nếu nó fail do DB chưa sẵn sàng:
```ini
[Service]
Restart=on-failure
RestartSec=5
StartLimitIntervalSec=60
StartLimitBurst=10
```

3. **Dùng `ExecStartPre` để chờ chủ động** — thêm bước kiểm tra port đã mở trước khi thực sự start:
```ini
[Service]
ExecStartPre=/usr/bin/bash -c 'until pg_isready -h localhost -p 5432; do sleep 1; done'
ExecStart=/usr/bin/myapp
```
Cách này đơn giản, dễ hiểu, nhưng có nhược điểm: `pg_isready` trả về sẵn sàng có thể sớm hơn thời điểm DB thực sự chịu tải được các query nặng đầu tiên.

4. **Trong môi trường container/Kubernetes** (thường gặp hơn thực tế hiện nay), vấn đề tương tự được giải bằng **readiness probe** và **init container** chờ dependency, logic hoàn toàn tương tự nhưng nằm ở tầng orchestrator thay vì systemd.

**Kết luận cho câu trả lời phỏng vấn**: `After=`/`Requires=` chỉ giải quyết bài toán **thứ tự và sự tồn tại** của process cha, không giải quyết bài toán **readiness thực sự** — hai khái niệm hoàn toàn khác nhau và là nguồn gốc phổ biến của race condition khi boot, đặc biệt dễ gặp trên môi trường có cold start chậm (DB lớn, disk chậm, hoặc image mount qua network storage).

## Detailed Answer (EN)
This is a very common misunderstanding about `After=` in systemd: **`After=` only guarantees START ORDER, not that the dependency is actually ready to serve traffic**.

**The specific problem**: `After=postgresql.service` tells systemd "start my unit **after** postgresql.service has been **considered started**." But for `Type=simple` (the default), "started" simply means **the process has been exec()'d** — it does not mean PostgreSQL has finished initializing (replaying WAL, mounting tablespaces, opening port 5432 to accept connections). For a large database, recovery/initialization can take several seconds to tens of seconds **after** the process is already "started" from systemd's point of view.

**Fixes, from most correct to most pragmatic**:

1. **Use `Type=notify` if PostgreSQL supports it** (modern PostgreSQL packages support sd_notify): the service itself reports `READY=1` to systemd once truly ready, and any unit ordered `After=` it will wait for that actual readiness signal instead of merely process startup.

2. **Retry with backoff at the application layer** — this is the **most correct and durable** approach, because dependency readiness is fundamentally a runtime concern, not something that should rely solely on systemd's boot ordering (especially once you scale to containers/Kubernetes, where systemd's "boot order" concept no longer applies):
```python
for attempt in range(10):
    try:
        conn = connect_db()
        break
    except ConnectionError:
        time.sleep(min(2 ** attempt, 30))
```
Combine this with `Restart=on-failure` + `RestartSec` in the unit file so systemd auto-restarts the service if it fails because the DB wasn't ready yet:
```ini
[Service]
Restart=on-failure
RestartSec=5
StartLimitIntervalSec=60
StartLimitBurst=10
```

3. **Use `ExecStartPre` to actively wait** — add a check that the port is open before actually starting:
```ini
[Service]
ExecStartPre=/usr/bin/bash -c 'until pg_isready -h localhost -p 5432; do sleep 1; done'
ExecStart=/usr/bin/myapp
```
Simple and easy to understand, but has a caveat: `pg_isready` reporting readiness can still happen slightly before the DB can actually handle the first heavy queries.

4. **In container/Kubernetes environments** (more common in practice today), the same problem is solved with **readiness probes** and **init containers** waiting on the dependency — the logic is identical but lives in the orchestrator layer instead of systemd.

**Interview takeaway**: `After=`/`Requires=` solve the **ordering and existence** problem of a dependent process, not the **actual readiness** problem — two entirely different concerns, and a common source of boot-time race conditions, especially with slow cold starts (large databases, slow disks, or images mounted over network storage).
