# Interview Arena — Design Spec

Status: Draft v1
Date: 2026-08-24
Owner: vuhoa (personal project)

## 1. Product Overview

**Interview Arena** là web luyện phỏng vấn kỹ thuật (IT) cho nhà phát triển Việt
Nam — Frontend/Backend/DevOps/AI/Database, phân theo cấp độ Junior/Mid/Senior,
song ngữ Việt-Anh.

Sản phẩm tham khảo/cạnh tranh trực tiếp: https://luyenphongvan.online (kho
4.300+ câu hỏi, flashcard, quiz, DSA visualizer, review phỏng vấn theo công ty,
community, freemium 49k/tháng hoặc 299k trọn đời). Tính năng "phỏng vấn trực
tiếp với AI" của họ mới ở trạng thái "sắp ra mắt", chưa triển khai — đây là
khoảng trống lớn nhất để tạo khác biệt.

## 2. Phân tích cạnh tranh

**Moat của đối thủ (khó chép nhanh):**
- Khối lượng nội dung 4.300+ câu hỏi.
- `/companies` — review phỏng vấn theo công ty, nội dung UGC tích lũy theo
  thời gian, network effect.
- `/community` — Q&A cộng đồng, cũng có network effect.

**Chỗ hở có thể khai thác:**
1. AI mock interview chưa tồn tại (chỉ "sắp ra mắt") — ship trước và làm tốt
   là USP không thể chép trong ngắn hạn.
2. Không có blog/kênh SEO content — kênh acquisition họ bỏ trống.
3. Flashcard không thấy áp dụng spaced repetition (SM-2/Anki-style) — điểm
   UX/hiệu quả học tập có thể làm tốt hơn rõ rệt.
4. Không cá nhân hóa theo JD — mọi người dùng thấy chung 1 kho câu hỏi.
5. Chưa có concept "quota AI interview miễn phí" làm phễu chuyển đổi Pro, vì
   họ chưa có tính năng AI.

**Chiến lược theo giai đoạn:**
- **Giai đoạn 1 (MVP — phạm vi spec này):** AI mock interview thật (trước
  đối thủ) + kho câu hỏi đủ dùng cho các công nghệ phổ biến nhất (React,
  Node.js, Java, DevOps cơ bản — không cần 4.300 câu ngay) + flashcard có
  spaced repetition.
- **Giai đoạn 2 (sau MVP, ngoài phạm vi spec này):** Company reviews (UGC),
  blog SEO.
- **Giai đoạn 3 (ngoài phạm vi):** Lộ trình học cá nhân hóa theo JD dán vào,
  voice-based AI interview.

## 3. Tính năng MVP

### 3.1 Kho câu hỏi
- Câu hỏi theo vị trí (Frontend/Backend/DevOps/AI/Database) × công nghệ ×
  cấp độ (Junior/Mid/Senior).
- Đáp án chi tiết song ngữ Việt-Anh.
- Nguồn: `MANUAL` hoặc `AI_GENERATED` (bắt buộc qua duyệt `DRAFT → ACTIVE`
  trước khi hiển thị cho người dùng thật — tái dùng pattern đã áp dụng ở
  english-arena cho câu hỏi AI sinh).
- **Lưu trữ nội dung dạng file Markdown**: mỗi câu hỏi là 1 file `.md` với
  YAML frontmatter (metadata) + nội dung song ngữ, sống trong repo
  (`content/questions/<position>/<technology>/<slug>.md`), version-control
  được qua git, dễ author/review bằng tay hoặc qua AI. DB `questions` chỉ
  lưu bản index đồng bộ từ frontmatter (id, position, technology, level,
  tags, status, `content_path`) để phục vụ filter/search nhanh — **nguồn sự
  thật (source of truth) là file `.md`**, DB là index phái sinh, đồng bộ lại
  bằng job ingest khi file thay đổi (đọc thư mục `content/questions` lúc
  deploy hoặc qua CLI ingest thủ công). Xem cấu trúc file mẫu và prompt sinh
  câu hỏi bằng AI ở Phụ lục A.

### 3.2 Flashcard với Spaced Repetition
- Thuật toán SM-2 (hoặc tương đương đơn giản) để tính ngày ôn tập tiếp theo
  dựa trên độ khó người dùng tự đánh giá sau mỗi thẻ (Again/Hard/Good/Easy).
- Lịch ôn tập (due cards hôm nay) lưu trong Redis sorted set (key theo user,
  score = due timestamp) để tra cứu nhanh; nguồn sự thật vẫn là DB.

### 3.3 Quiz
- Trắc nghiệm theo chủ đề, giải thích đáp án ngay sau khi trả lời.

### 3.4 AI Mock Interview (tính năng lõi khác biệt)
- Người dùng chọn vị trí + công nghệ + cấp độ → bắt đầu 1 `interview_session`.
- Luồng hội thoại text-based (không voice ở MVP):
  1. AI (LLM) đặt câu hỏi đầu tiên dựa trên vị trí/công nghệ/cấp độ đã chọn.
  2. Người dùng gõ câu trả lời.
  3. Câu trả lời + toàn bộ lịch sử hội thoại của phiên (đọc từ DB, không giữ
     state trong memory server) được publish thành event
     `interview_answer_submitted` lên Kafka.
  4. Worker consume event, gọi LLM API để: (a) sinh câu hỏi follow-up bám
     ngữ cảnh câu trả lời vừa rồi, hoặc (b) nếu đã đủ số câu, chấm điểm toàn
     phiên. Ghi kết quả vào DB.
  5. Client nhận kết quả qua polling ngắn hoặc WebSocket (client chọn theo
     latency thực tế đo được ở giai đoạn implementation).
- Kết thúc phiên (mặc định 5-7 câu): AI chấm điểm theo 3 tiêu chí — độ chính
  xác kỹ thuật, cách trình bày/cấu trúc câu trả lời, mức độ tự tin trong
  ngôn từ — kèm feedback chi tiết từng câu.
- Quota: user Free có giới hạn N phiên/ngày (kiểm soát bằng Redis `INCR`
  theo `user_id + ngày`, atomic, TTL hết ngày); Pro không giới hạn.

### 3.5 Theo dõi tiến độ
- Lịch sử các phiên luyện (AI interview + quiz + flashcard), điểm số theo
  thời gian, hiển thị trong trang cá nhân.

### 3.6 Mô hình kinh doanh (Freemium)
- **Free:** câu hỏi cơ bản/trung bình, flashcard + spaced repetition đầy đủ,
  quiz, N phiên AI interview/ngày (số cụ thể chốt ở giai đoạn triển khai dựa
  trên chi phí LLM thực đo).
- **Pro:** câu hỏi nâng cao, AI interview không giới hạn, không quảng cáo.
- Giá cụ thể chốt sau khi đo chi phí LLM thực tế; định hướng cạnh tranh hơn
  mức 49k/tháng của đối thủ nhờ free tier rộng hơn để thu hút người dùng.

## 4. Kiến trúc hệ thống

### 4.1 Thành phần
- **Backend:** Java Spring Boot — REST API.
- **Web:** React + Vite + TypeScript.
- **DB:** PostgreSQL.
- **Redis:** rate limiting quota AI interview (atomic `INCR`), cache danh
  sách câu hỏi theo category/level (read-heavy, ít đổi), sorted set lịch ôn
  tập spaced repetition.
- **Kafka:** tách pha gọi LLM (chậm, 2-10s) ra khỏi request path của API —
  event `interview_answer_submitted` → worker chấm điểm/sinh câu hỏi tiếp
  theo; event bus cho analytics (`session_completed`, `question_answered`)
  fan-out tới nhiều consumer độc lập (cập nhật tiến độ, digest email) mà
  không làm chậm luồng chính.
- **LLM API:** OpenAI hoặc Anthropic (chốt cụ thể ở giai đoạn implementation
  dựa trên chi phí/chất lượng thực đo cho tiếng Việt).

### 4.2 Data model (bảng chính)
- `users`, `questions` (position, technology, level, source, status),
  `flashcard_reviews` (user_id, question_id, sm2 state: interval, ease_factor,
  due_at), `quiz_attempts`, `interview_sessions` (user_id, position,
  technology, level, status, final_score), `interview_turns` (session_id,
  turn_order, question_text, answer_text, follow_up_feedback), `subscriptions`
  (plan, expires_at).

### 4.3 Không nằm trong phạm vi kiến trúc MVP
- Không có WebSocket phức tạp kiểu matchmaking real-time (như english-arena)
  — luồng AI interview là request/response theo lượt, không cần đồng bộ
  nhiều người chơi cùng lúc.
- Không có voice/STT/TTS.
- Không có hệ thống review công ty (UGC) — để giai đoạn 2.

## 5. Rủi ro

- **Chi phí LLM:** mỗi phiên AI interview tốn nhiều lượt gọi LLM (câu hỏi +
  follow-up + chấm điểm cuối). Phải đo chi phí thực tế trước khi chốt số
  lượt free/ngày và giá Pro.
- **Chất lượng câu hỏi AI sinh:** bắt buộc qua duyệt thủ công (DRAFT→ACTIVE)
  trước khi dùng thật, tránh nội dung sai kỹ thuật.
- **Độ trễ LLM ảnh hưởng trải nghiệm:** kiến trúc Kafka async giúp API
  không bị block, nhưng UX cần thiết kế rõ trạng thái "đang chấm điểm..."
  thay vì để người dùng chờ không phản hồi.

## Phụ lục A — Nội dung câu hỏi dạng Markdown + Prompt sinh bằng AI

### A.1 Cấu trúc file `.md` mẫu

`content/questions/frontend/react/react-hooks-usestate-vs-usereducer.md`:

```markdown
---
id: react-hooks-usestate-vs-usereducer
position: frontend
technology: react
level: mid
tags: [hooks, state-management]
source: AI_GENERATED
status: DRAFT
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào bạn nên dùng `useReducer` thay vì `useState` trong React? Cho ví dụ
cụ thể.

## Question (EN)
When should you use `useReducer` instead of `useState` in React? Give a
concrete example.

## Đáp án chi tiết (VI)
`useReducer` phù hợp khi state có logic cập nhật phức tạp, nhiều state con
liên quan đến nhau, hoặc khi state tiếp theo phụ thuộc vào state trước đó
theo nhiều action khác nhau...

(giải thích đầy đủ, có code example)

## Detailed Answer (EN)
`useReducer` fits better when the update logic is complex, when multiple
sub-values are related, or when the next state depends on the previous one
across several distinct actions...

(full explanation, with code example)

## Follow-up thường gặp
- So sánh hiệu năng giữa hai cách?
- Có thể kết hợp `useReducer` với Context API như thế nào?
```

Job ingest đọc frontmatter để upsert vào bảng `questions` (id = khoá chính,
`content_path` trỏ về file), nội dung markdown được render ở FE bằng
renderer Markdown (hỗ trợ code block syntax highlight).

### A.2 Prompt sinh câu hỏi bằng AI (dùng cho script/worker sinh nội dung)

**System prompt:**
```
Bạn là một Senior Technical Interviewer và Content Writer chuyên về phỏng
vấn tuyển dụng lập trình viên tại Việt Nam. Nhiệm vụ của bạn là soạn câu hỏi
phỏng vấn kỹ thuật chất lượng cao, kèm đáp án chi tiết, song ngữ Việt-Anh,
đúng format file Markdown với YAML frontmatter được chỉ định.

Yêu cầu bắt buộc:
1. Không sao chép nguyên văn câu hỏi/đáp án từ bất kỳ nguồn có bản quyền
   nào (sách, khóa học, website khác) — chỉ dùng kiến thức chung của lĩnh
   vực để tự soạn.
2. Đáp án phải chính xác về mặt kỹ thuật, có ví dụ code khi phù hợp, giải
   thích rõ ràng thay vì liệt kê hời hợt.
3. Độ khó phải khớp đúng `level` được yêu cầu (Junior: khái niệm cơ bản,
   Mid: áp dụng thực tế/so sánh trade-off, Senior: kiến trúc/hiệu
   năng/edge case/quyết định thiết kế).
4. Luôn viết đầy đủ cả 2 ngôn ngữ (VI và EN), không dịch máy móc — viết tự
   nhiên như người bản ngữ trong từng ngôn ngữ.
5. Trả về ĐÚNG format Markdown theo template được cung cấp, không thêm text
   giải thích ngoài file.
6. Gợi ý 2-3 câu hỏi follow-up tự nhiên mà một interviewer thật có thể hỏi
   tiếp dựa trên câu hỏi này.
7. Đặt `status: DRAFT` và `source: AI_GENERATED` trong frontmatter — không
   bao giờ tự đặt `status: ACTIVE` (chỉ con người duyệt mới được set).
```

**User prompt template** (điền biến khi gọi):
```
Soạn 1 câu hỏi phỏng vấn kỹ thuật với thông số sau:
- Vị trí (position): {{position}}          # frontend | backend | devops | ai | database
- Công nghệ (technology): {{technology}}    # ví dụ: react, spring-boot, kubernetes...
- Cấp độ (level): {{level}}                 # junior | mid | senior
- Chủ đề gợi ý (tags, tuỳ chọn): {{tags}}
- Tránh trùng với các câu hỏi đã có (danh sách tiêu đề, tuỳ chọn):
{{existing_question_titles}}

Trả về đúng theo template Markdown sau, điền đầy đủ nội dung, giữ nguyên
cấu trúc heading:

---
id: <slug-tieng-anh-khong-dau>
position: {{position}}
technology: {{technology}}
level: {{level}}
tags: [<tag1>, <tag2>]
source: AI_GENERATED
status: DRAFT
created_at: {{today}}
---

## Câu hỏi (VI)
...

## Question (EN)
...

## Đáp án chi tiết (VI)
...

## Detailed Answer (EN)
...

## Follow-up thường gặp
- ...
```

**Ghi chú vận hành:** worker gọi LLM theo template trên, ghi file `.md` vào
`content/questions/<position>/<technology>/<id>.md`, chạy job ingest để
upsert index vào DB với `status = DRAFT`. Admin duyệt qua trang Admin Question
Management (đổi `status → ACTIVE`), lúc đó câu hỏi mới hiển thị cho người
dùng thật — không có bước duyệt thì không được tự động publish.

### A.3 Prompt cho AI Mock Interview (system prompt của interviewer)

```
Bạn đóng vai một Interviewer thật đang phỏng vấn ứng viên vị trí
{{position}} - {{technology}}, cấp độ {{level}}.

Quy tắc:
1. Hỏi từng câu một, không hỏi dồn nhiều câu cùng lúc.
2. Câu hỏi tiếp theo PHẢI bám vào nội dung câu trả lời trước đó của ứng
   viên — nếu câu trả lời có điểm chưa rõ/chưa sâu, hỏi xoáy vào đó (giống
   interviewer thật); nếu câu trả lời tốt, chuyển sang khía cạnh khác của
   {{technology}} phù hợp với {{level}}.
3. Giữ giọng điệu chuyên nghiệp, khích lệ, không gay gắt.
4. Sau đúng {{total_questions}} câu, dừng hỏi và chuyển sang chế độ chấm
   điểm.
5. Khi chấm điểm, đánh giá theo 3 tiêu chí: độ chính xác kỹ thuật (0-10),
   cách trình bày/cấu trúc câu trả lời (0-10), mức độ tự tin trong ngôn từ
   (0-10) — kèm nhận xét cụ thể cho từng câu trả lời (không nhận xét
   chung chung).
6. Luôn trả lời bằng tiếng Việt trừ khi ứng viên chủ động trả lời bằng
   tiếng Anh, khi đó chuyển hẳn sang tiếng Anh cho phần còn lại của phiên.

Lịch sử hội thoại (các lượt trước, đọc từ DB):
{{conversation_history}}

Câu trả lời vừa nhận từ ứng viên:
{{latest_answer}}
```

