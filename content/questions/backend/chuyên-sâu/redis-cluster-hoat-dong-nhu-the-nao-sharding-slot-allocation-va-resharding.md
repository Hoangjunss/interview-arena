---
id: redis-cluster-hoat-dong-nhu-the-nao-sharding-slot-allocation-va-resharding
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Cluster hoạt động như thế nào? Sharding, slot allocation, và resharding?

## Question (EN)
How does Redis Cluster work? Explain sharding, slot allocation, and resharding.

## Đáp án chi tiết (VI)
Redis Cluster chia keyspace thành 16384 hash slot; mỗi key được hash bằng CRC16 và map vào một slot cụ thể (`slot = CRC16(key) % 16384`). Mỗi master node chịu trách nhiệm một range slot (ví dụ: node A: 0-5460, node B: 5461-10922, node C: 10923-16383), mỗi master có ít nhất một replica. Client dùng CLUSTER-aware client library để route request trực tiếp đến node chứa slot tương ứng; nếu route sai, node trả về `MOVED` redirect. Hash tags (`{user}.profile`) cho phép force nhiều key vào cùng một slot để support multi-key operations và transaction. Resharding (di chuyển slot giữa các node) được thực hiện online không cần downtime bằng `redis-cli --cluster reshard`. Minimum recommended: 3 master + 3 replica (total 6 nodes) để có HA và survive node failure. Limitation: không support cross-slot transaction và multi-key operation (trừ khi dùng hash tag).

## Detailed Answer (EN)
Redis Cluster divides the keyspace into 16,384 hash slots; each key is hashed using CRC16 and mapped to a specific slot (`slot = CRC16(key) % 16384`). Each master node is responsible for a range of slots (e.g., Node A: 0-5460, Node B: 5461-10922, Node C: 10923-16383), and each master has at least one replica. Clients use a cluster-aware client library to route requests directly to the node holding the relevant slot; if a request is routed to the wrong node, it returns a `MOVED` redirect. Hash tags (`{user}.profile`) force multiple keys into the same slot to support multi-key operations and transactions. Resharding (moving slots between nodes) is performed online with no downtime using `redis-cli --cluster reshard`. Minimum recommended setup: 3 masters + 3 replicas (6 nodes total) for HA and single-node failure tolerance. Limitation: cross-slot transactions and multi-key operations are not supported unless hash tags are used.
