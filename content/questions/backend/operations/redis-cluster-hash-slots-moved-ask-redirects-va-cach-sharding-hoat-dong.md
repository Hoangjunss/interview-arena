---
id: redis-cluster-hash-slots-moved-ask-redirects-va-cach-sharding-hoat-dong
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Cluster: hash slots, MOVED/ASK redirects và cách sharding hoạt động?

## Question (EN)
Redis Cluster: hash slots, MOVED/ASK redirects, and how sharding works?

## Đáp án chi tiết (VI)
Redis Cluster chia key space thành **16384 hash slots** (0-16383). Mỗi key được assign slot = `CRC16(key) % 16384`. Cluster có N master nodes, mỗi master sở hữu một range slot (ví dụ: 3 masters mỗi master có ~5461 slots). **MOVED redirect:** khi client gửi request đến node sai (key không thuộc slot của node đó), node trả về `MOVED \u003cslot\u003e \u003cip:port\u003e` — client phải resend đến đúng node. Smart client cache slot map để tránh redirect (redis-py, Jedis, ioredis tự handle). **ASK redirect:** trong quá trình resharding (migrate slot giữa nodes), một số key đã migrate, số khác chưa. Node cũ trả `ASK \u003cslot\u003e \u003cnew_node\u003e` cho key đã migrate — client "])</script><script>self.__next_f.push([1,"gửi `ASKING` + request đến node mới một lần (không cache như MOVED). **Key tags:** `{user_id}.orders` — chỉ hash `user_id` phần trong `{}`, đảm bảo keys liên quan cùng slot để dùng multi-key commands. Cluster yêu cầu ít nhất 6 nodes (3 master + 3 replica) để đảm bảo HA.

## Detailed Answer (EN)
$87
