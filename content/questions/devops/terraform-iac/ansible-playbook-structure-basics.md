---
id: ansible-playbook-structure-basics
position: devops
technology: terraform-iac
level: junior
tags: [ansible, playbook, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một Ansible playbook gồm những thành phần nào? Giải thích ý nghĩa của `hosts`, `tasks`, `handlers`, và `roles`.

## Question (EN)
What are the main components of an Ansible playbook? Explain the meaning of `hosts`, `tasks`, `handlers`, and `roles`.

## Đáp án chi tiết (VI)
**Playbook** là file YAML mô tả một chuỗi công việc tự động hóa (cấu hình server, deploy ứng dụng, cài đặt phần mềm...) mà Ansible sẽ thực thi trên các máy đích.

**Cấu trúc cơ bản của một playbook:**
```yaml
---
- name: Configure web servers
  hosts: webservers
  become: true
  vars:
    http_port: 80

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: true

    - name: Deploy nginx config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
```

**Giải thích từng phần:**
- **`hosts`**: nhóm máy đích lấy từ file **inventory** (ví dụ `webservers` là một group được định nghĩa trong `inventory.ini`). Có thể là tên host cụ thể, group, hoặc `all`.
- **`become: true`**: chạy task với quyền `sudo`/root — tương đương `become_user: root` mặc định.
- **`tasks`**: danh sách các bước thực thi **tuần tự theo thứ tự viết**, mỗi task gọi một **module** (`apt`, `copy`, `template`, `service`, `command`...).
- **`handlers`**: các task đặc biệt **chỉ chạy khi được `notify`** từ một task khác, và chỉ chạy **một lần** ở cuối playbook dù bị notify nhiều lần — dùng cho việc "restart service chỉ khi config thực sự thay đổi", tránh restart không cần thiết.
- **`roles`**: cách đóng gói tasks/handlers/templates/vars/files thành **đơn vị tái sử dụng** có cấu trúc thư mục chuẩn:
```
roles/
  nginx/
    tasks/main.yml
    handlers/main.yml
    templates/nginx.conf.j2
    vars/main.yml
    defaults/main.yml
```
Dùng lại role trong playbook:
```yaml
- hosts: webservers
  roles:
    - nginx
    - { role: app_deploy, app_version: "1.2.3" }
```

**Vì sao cần `roles` thay vì viết hết vào 1 playbook:** giống như module trong Terraform — giúp tái sử dụng giữa nhiều project/team, dễ test độc lập (dùng molecule), và tách biệt rõ trách nhiệm (role `nginx` không cần biết gì về role `postgresql`).

**Gotcha thường gặp:** quên `become: true` khi task cần quyền root (ví dụ cài package hệ thống) → lỗi permission denied nhưng thông báo lỗi đôi khi không rõ ràng, khiến người mới tưởng nhầm là lỗi module.

## Detailed Answer (EN)
A **playbook** is a YAML file describing a sequence of automation work (server configuration, application deployment, software installation, etc.) that Ansible executes against target machines.

**Basic playbook structure:**
```yaml
---
- name: Configure web servers
  hosts: webservers
  become: true
  vars:
    http_port: 80

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: true

    - name: Deploy nginx config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
```

**Explaining each part:**
- **`hosts`**: the target group of machines, taken from the **inventory** file (e.g., `webservers` is a group defined in `inventory.ini`). Can be a specific host, a group, or `all`.
- **`become: true`**: runs the task with `sudo`/root privileges — equivalent to `become_user: root` by default.
- **`tasks`**: a list of steps executed **sequentially in the order written**, each task calling a **module** (`apt`, `copy`, `template`, `service`, `command`, etc.).
- **`handlers`**: special tasks that only run when **`notify`**-ed by another task, and run only **once** at the end of the playbook even if notified multiple times — used for "restart the service only if the config actually changed," avoiding unnecessary restarts.
- **`roles`**: a way to package tasks/handlers/templates/vars/files into a **reusable unit** with a standard directory structure:
```
roles/
  nginx/
    tasks/main.yml
    handlers/main.yml
    templates/nginx.conf.j2
    vars/main.yml
    defaults/main.yml
```
Reusing a role in a playbook:
```yaml
- hosts: webservers
  roles:
    - nginx
    - { role: app_deploy, app_version: "1.2.3" }
```

**Why use `roles` instead of one giant playbook:** similar to Terraform modules — enables reuse across projects/teams, easier isolated testing (with Molecule), and clean separation of responsibility (the `nginx` role doesn't need to know anything about the `postgresql` role).

**Common gotcha:** forgetting `become: true` on a task that needs root privileges (e.g., installing a system package) causes a permission-denied error, but the error message is sometimes unclear, leading beginners to mistake it for a module bug.
