---
id: vpc-basics-subnets-route-tables
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [vpc, networking, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VPC là gì? Giải thích mối quan hệ giữa VPC, Subnet, Route Table và Internet Gateway.

## Question (EN)
What is a VPC? Explain the relationship between VPC, Subnet, Route Table, and Internet Gateway.

## Đáp án chi tiết (VI)
**VPC (Virtual Private Cloud)** là một mạng ảo riêng biệt, cô lập logic trong cloud (AWS/GCP gọi là VPC, Azure gọi là VNet), nơi bạn kiểm soát dải IP, subnet, routing, và security.

**Các thành phần chính:**
- **CIDR block**: dải IP của VPC, ví dụ `10.0.0.0/16` (~65,536 IP).
- **Subnet**: chia nhỏ CIDR của VPC thành các vùng nhỏ hơn, mỗi subnet nằm trong **1 Availability Zone (AZ)** duy nhất. Ví dụ `10.0.1.0/24` cho AZ-a.
- **Route Table**: bảng định tuyến gắn với subnet, quyết định traffic đi đâu (ra internet, sang VPC khác, hay nội bộ).
- **Internet Gateway (IGW)**: cổng kết nối VPC ra internet — gắn vào VPC, và route table của subnet public phải có route `0.0.0.0/0 -> igw-xxxx`.

**Public subnet vs Private subnet:**
| Loại | Route table | Đặc điểm |
|---|---|---|
| Public | `0.0.0.0/0 -> IGW` | Instance có thể có public IP, truy cập/được truy cập trực tiếp từ internet |
| Private | `0.0.0.0/0 -> NAT Gateway` (hoặc không có route ra internet) | Instance không có public IP, chỉ ra internet được (một chiều) qua NAT, không nhận traffic từ internet vào |

**Ví dụ cấu hình (Terraform rút gọn):**
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1a"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}
```

**Điểm hay bị nhầm (gotcha) của người mới:**
- Một subnet chỉ có 1 route table hiệu lực tại một thời điểm (association), nhưng 1 route table có thể gắn với nhiều subnet.
- "Public subnet" không tự động nghĩa là instance có public IP — instance cần được cấp public IP (hoặc Elastic IP) riêng, subnet chỉ quyết định **có đường ra internet hay không**.
- Quên attach IGW vào VPC, hoặc quên add route trong route table, là lỗi phổ biến nhất khiến EC2 "không ra internet được" dù đã có public IP.
- AWS dành riêng 5 IP đầu và cuối mỗi subnet cho hệ thống (network address, VPC router, DNS, future use, broadcast) — nên subnet `/24` (256 IP) chỉ dùng được 251 IP thực tế.

**Mở rộng — NAT Gateway cho private subnet:** để instance trong private subnet gọi ra internet (ví dụ pull package, gọi API bên ngoài) mà không lộ IP nội bộ, cần đặt **NAT Gateway** trong 1 public subnet và route `0.0.0.0/0 -> nat-xxxx` trong route table của private subnet. Lưu ý NAT Gateway tính phí theo giờ + theo GB xử lý, và là **single point of failure theo AZ** — nếu cần HA thật sự, phải deploy 1 NAT Gateway/AZ chứ không dùng chung 1 cái cho toàn VPC.

## Detailed Answer (EN)
A **VPC (Virtual Private Cloud)** is a logically isolated virtual network in the cloud (AWS/GCP call it VPC, Azure calls it VNet) where you control the IP range, subnets, routing, and security.

**Main components:**
- **CIDR block**: the VPC's IP range, e.g. `10.0.0.0/16` (~65,536 IPs).
- **Subnet**: a subdivision of the VPC's CIDR, each subnet lives in exactly **one Availability Zone (AZ)**. E.g. `10.0.1.0/24` in AZ-a.
- **Route Table**: the routing table attached to a subnet, deciding where traffic goes (to the internet, to another VPC, or stays internal).
- **Internet Gateway (IGW)**: the gateway connecting a VPC to the internet — attached to the VPC, and the public subnet's route table must have `0.0.0.0/0 -> igw-xxxx`.

**Public subnet vs Private subnet:**
| Type | Route table | Characteristics |
|---|---|---|
| Public | `0.0.0.0/0 -> IGW` | Instances can have a public IP, reachable directly from/to the internet |
| Private | `0.0.0.0/0 -> NAT Gateway` (or no internet route at all) | Instances have no public IP, can only reach out to the internet (one-way) via NAT, cannot receive inbound traffic from the internet |

**Example configuration (abbreviated Terraform):**
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1a"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}
```

**Common beginner gotchas:**
- A subnet has exactly one effective route table association at a time, but one route table can be attached to multiple subnets.
- "Public subnet" doesn't automatically mean instances get a public IP — instances need one assigned (or an Elastic IP); the subnet only determines **whether an internet path exists**.
- Forgetting to attach the IGW to the VPC, or forgetting to add the route in the route table, is the most common cause of "EC2 can't reach the internet" even with a public IP assigned.
- AWS reserves the first 4 and last 1 IPs in every subnet for system use (network address, VPC router, DNS, future use, broadcast) — so a `/24` subnet (256 IPs) really only gives you 251 usable IPs.

**Extension — NAT Gateway for private subnets:** for an instance in a private subnet to reach out to the internet (e.g. pulling packages, calling an external API) without exposing its internal IP, place a **NAT Gateway** in a public subnet and route `0.0.0.0/0 -> nat-xxxx` in the private subnet's route table. Note NAT Gateway is billed hourly plus per-GB processed, and is a **single point of failure per AZ** — for real HA, deploy one NAT Gateway per AZ rather than sharing a single one across the whole VPC.
