---
id: docker-storage-driver-overlay2
position: devops
technology: docker
level: senior
tags: [docker, storage, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Storage driver `overlay2` của Docker hoạt động như thế nào? Vì sao viết nhiều file nhỏ liên tục vào writable layer lại chậm hơn viết vào volume?

## Question (EN)
How does Docker's `overlay2` storage driver work internally? Why is writing lots of small files continuously into the writable layer slower than writing into a volume?

## Đáp án chi tiết (VI)
**`overlay2`** là storage driver mặc định của Docker trên hầu hết distro Linux hiện đại, dựa trên **OverlayFS** — một union filesystem của kernel Linux cho phép "chồng" nhiều thư mục lại thành một view thống nhất.

**Cấu trúc cơ bản của overlay2 cho một container:**
```
lowerdir  = các layer read-only của image (có thể nhiều lớp, xếp chồng)
upperdir  = writable layer của container (nơi mọi thay đổi runtime được ghi)
workdir   = thư mục làm việc nội bộ overlay dùng để chuẩn bị atomic operation
merged    = view hợp nhất cuối cùng mà process trong container thấy (giống 1 filesystem bình thường)
```
Khi container đọc một file chưa từng bị sửa, overlay2 đọc thẳng từ `lowerdir` (layer image). Khi container **ghi/sửa** một file lần đầu, cơ chế **copy-up** kích hoạt: toàn bộ file đó được copy từ `lowerdir` sang `upperdir` trước, rồi mới áp dụng thay đổi lên bản copy đó.

**Vì sao ghi nhiều file nhỏ liên tục vào writable layer chậm hơn volume:**
1. **Copy-up overhead**: lần đầu ghi vào một file đã tồn tại ở layer image (dù chỉ sửa 1 byte), toàn bộ file phải copy-up trước — với file lớn, chi phí này đáng kể dù chỉ thay đổi nhỏ.
2. **Nhiều lớp layer làm chậm lookup**: overlay2 phải duyệt qua **toàn bộ chuỗi lowerdir** (có thể hàng chục layer nếu Dockerfile viết kém, nhiều RUN rời rạc) để tìm file trước khi biết nó nằm ở layer nào — mỗi lần truy cập path đều tốn thêm chi phí duyệt so với filesystem phẳng thông thường.
3. **Không tối ưu cho write pattern kiểu database (random write, fsync liên tục)**: writable layer thiết kế cho use case "container filesystem thay đổi ít, đọc nhiều" — I/O pattern của database (ghi ngẫu nhiên liên tục, cần đảm bảo durability qua fsync) tạo áp lực copy-up + page cache khác biệt hoàn toàn so với ứng dụng thông thường, dẫn tới độ trễ I/O cao và không ổn định.
4. **Volume (bind mount hoặc named volume) bypass hoàn toàn OverlayFS** — dữ liệu ghi thẳng vào filesystem gốc của host (ext4/xfs) hoặc driver riêng, không qua lớp union filesystem, không có copy-up overhead, hiệu năng I/O gần như native.

**Đây là lý do best practice luôn nói: KHÔNG BAO GIỜ chạy database production với data directory nằm trong writable layer** — luôn mount named volume:
```bash
# Sai: data nằm trong writable layer, chậm + mất khi rm container
docker run -d postgres:16

# Đúng: data nằm trong named volume, bypass overlay2 hoàn toàn
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
```

**Cách quan sát/chẩn đoán thực tế:**
```bash
docker info | grep "Storage Driver"          # xác nhận đang dùng overlay2
docker inspect <container> | grep -A5 GraphDriver   # xem chi tiết lower/upper/merged dir
du -sh /var/lib/docker/overlay2/<id>/diff    # kích thước thực tế writable layer của 1 container
```

**Edge case nâng cao:** số lượng layer image quá nhiều (Dockerfile có 50+ lệnh RUN riêng lẻ) không chỉ làm image nặng hơn mà còn **làm chậm mount/lookup của overlay2** vì kernel phải merge nhiều `lowerdir` hơn — đây là lý do gộp RUN liên quan bằng `&&` không chỉ tối ưu size mà còn tối ưu hiệu năng filesystem runtime.

## Detailed Answer (EN)
**`overlay2`** is Docker's default storage driver on most modern Linux distros, built on **OverlayFS** — a Linux kernel union filesystem that "stacks" multiple directories into one unified view.

**Basic structure of overlay2 for a container:**
```
lowerdir  = the image's read-only layers (can be many, stacked)
upperdir  = the container's writable layer (where all runtime changes go)
workdir   = OverlayFS's internal scratch directory for atomic operations
merged    = the final unified view processes inside the container see (behaves like a normal filesystem)
```
When a container reads a file that's never been modified, overlay2 reads straight from `lowerdir` (the image layer). When a container **writes/modifies** a file for the first time, the **copy-up** mechanism kicks in: the entire file is first copied from `lowerdir` into `upperdir`, then the change is applied to that copy.

**Why writing many small files continuously to the writable layer is slower than a volume:**
1. **Copy-up overhead**: the first write to a file already existing in an image layer (even changing just one byte) requires copying the whole file up first — for a large file, this cost is significant even for a tiny change.
2. **Many layers slow down lookups**: overlay2 has to traverse **the entire `lowerdir` chain** (potentially dozens of layers if the Dockerfile is poorly written with many separate RUN commands) to find which layer a file lives in — every path access carries extra traversal cost compared to a flat filesystem.
3. **Not optimized for database-style write patterns (random writes, frequent fsync)**: the writable layer is designed for "container filesystem changes little, reads a lot" — a database's I/O pattern (continuous random writes, needing durability via fsync) creates copy-up + page cache pressure very different from a typical app, resulting in high and unstable I/O latency.
4. **Volumes (bind mount or named volume) completely bypass OverlayFS** — data is written directly to the host's underlying filesystem (ext4/xfs) or a dedicated driver, skipping the union filesystem layer, with no copy-up overhead and near-native I/O performance.

**This is why best practice always says: NEVER run a production database with its data directory inside the writable layer** — always mount a named volume:
```bash
# Wrong: data lives in the writable layer — slow, and lost when the container is rm'd
docker run -d postgres:16

# Right: data lives in a named volume, completely bypassing overlay2
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
```

**Practical observation/diagnosis:**
```bash
docker info | grep "Storage Driver"          # confirm overlay2 is in use
docker inspect <container> | grep -A5 GraphDriver   # inspect lower/upper/merged dir details
du -sh /var/lib/docker/overlay2/<id>/diff    # actual size of one container's writable layer
```

**Advanced edge case:** too many image layers (a Dockerfile with 50+ separate RUN commands) not only makes the image heavier but also **slows down overlay2's mount/lookup**, since the kernel must merge more `lowerdir` entries — this is why combining related RUN commands with `&&` optimizes not just image size but also runtime filesystem performance.
