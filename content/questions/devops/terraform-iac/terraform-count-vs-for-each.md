---
id: terraform-count-vs-for-each
position: devops
technology: terraform-iac
level: junior
tags: [terraform, loops, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác nhau giữa `count` và `for_each` trong Terraform là gì? Vì sao dùng `count` với một list có thể gây nguy hiểm khi xóa phần tử ở giữa?

## Question (EN)
What is the difference between `count` and `for_each` in Terraform? Why can using `count` with a list be dangerous when you remove an element from the middle?

## Đáp án chi tiết (VI)
Cả hai đều dùng để tạo **nhiều instance của cùng một resource block** mà không phải copy-paste code.

**`count`**: nhận một số nguyên, resource được đánh index theo **vị trí số** (`0, 1, 2...`).
```hcl
variable "subnet_names" {
  default = ["app", "db", "cache"]
}

resource "aws_subnet" "this" {
  count      = length(var.subnet_names)
  cidr_block = "10.0.${count.index}.0/24"
  tags = { Name = var.subnet_names[count.index] }
}
```
Ở đây: `aws_subnet.this[0]` = "app", `[1]` = "db", `[2]` = "cache".

**Vấn đề khi xóa phần tử ở giữa list:** nếu xóa `"db"` khỏi list → list còn `["app", "cache"]` → Terraform thấy `[1]` bây giờ map với "cache" thay vì "db" trước đây → nó hiểu là **"cache" đổi tên** (thật ra là **destroy subnet index 1 cũ (db) rồi tạo lại index 1 mới (cache)**), gây xóa nhầm resource đang chạy dù ý định chỉ là bớt 1 phần tử.

**`for_each`**: nhận một `map` hoặc `set(string)`, resource được đánh index theo **key** thay vì vị trí số.
```hcl
variable "subnet_names" {
  default = toset(["app", "db", "cache"])
}

resource "aws_subnet" "this" {
  for_each   = var.subnet_names
  cidr_block = "10.0.${index(tolist(var.subnet_names), each.key)}.0/24"
  tags = { Name = each.key }
}
```
Ở đây: `aws_subnet.this["app"]`, `["db"]`, `["cache"]` — xóa `"db"` khỏi set chỉ khiến Terraform destroy đúng `aws_subnet.this["db"]`, hai resource còn lại **không bị động tới**.

**Bảng so sánh:**
| Tiêu chí | `count` | `for_each` |
|---|---|---|
| Kiểu dữ liệu nhận | Số nguyên | `map` hoặc `set(string)` |
| Cách đánh index | Vị trí số (0,1,2..) | Key (string) |
| Rủi ro khi xóa phần tử giữa | Cao — dễ destroy nhầm resource | Thấp — chỉ resource bị xóa mới bị ảnh hưởng |
| Phù hợp khi | Các instance hoàn toàn giống nhau, số lượng cố định | Các instance có định danh riêng biệt, danh sách có thể thay đổi |

**Quy tắc thực hành:** ưu tiên `for_each` khi các phần tử có khả năng thêm/bớt theo thời gian (subnet, IAM user, S3 bucket theo tên...). Chỉ dùng `count` khi thực sự chỉ cần "N bản giống hệt nhau" (ví dụ luôn tạo đúng 3 replica giống nhau) hoặc dùng `count` như một cách bật/tắt resource (`count = var.enable_feature ? 1 : 0`).

## Detailed Answer (EN)
Both let you create **multiple instances of the same resource block** without copy-pasting code.

**`count`**: takes an integer; resources are indexed by **numeric position** (`0, 1, 2...`).
```hcl
variable "subnet_names" {
  default = ["app", "db", "cache"]
}

resource "aws_subnet" "this" {
  count      = length(var.subnet_names)
  cidr_block = "10.0.${count.index}.0/24"
  tags = { Name = var.subnet_names[count.index] }
}
```
Here: `aws_subnet.this[0]` = "app", `[1]` = "db", `[2]` = "cache".

**The problem when removing a middle element:** removing `"db"` leaves `["app", "cache"]` → Terraform now sees `[1]` mapped to "cache" instead of the previous "db" → it interprets this as **"cache" being renamed** (in reality it will **destroy the old index-1 subnet (db) and create a new index-1 subnet (cache)**), accidentally deleting a live resource when the intent was only to remove one element.

**`for_each`**: takes a `map` or `set(string)`; resources are indexed by **key** instead of numeric position.
```hcl
variable "subnet_names" {
  default = toset(["app", "db", "cache"])
}

resource "aws_subnet" "this" {
  for_each   = var.subnet_names
  cidr_block = "10.0.${index(tolist(var.subnet_names), each.key)}.0/24"
  tags = { Name = each.key }
}
```
Here: `aws_subnet.this["app"]`, `["db"]`, `["cache"]` — removing `"db"` from the set makes Terraform destroy exactly `aws_subnet.this["db"]`; the other two are **untouched**.

**Comparison:**
| Criteria | `count` | `for_each` |
|---|---|---|
| Input type | Integer | `map` or `set(string)` |
| Indexing | Numeric position (0,1,2..) | Key (string) |
| Risk when removing a middle item | High — can wrongly destroy resources | Low — only the removed resource is affected |
| Best for | Fully identical instances, fixed count | Instances with distinct identities, a list that changes over time |

**Rule of thumb:** prefer `for_each` whenever elements may be added/removed over time (subnets, IAM users, named S3 buckets, etc.). Only use `count` when you truly need "N identical copies" (e.g., always exactly 3 identical replicas) or as an on/off switch for a resource (`count = var.enable_feature ? 1 : 0`).
