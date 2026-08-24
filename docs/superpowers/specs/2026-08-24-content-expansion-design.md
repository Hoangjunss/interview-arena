# Interview Arena — Content Expansion & Quality Pass (Design Spec)

**Status:** Approved — DevOps phase in progress
**Date:** 2026-08-24
**Owner request:** "coi lại hết các content của interview arena và cải thiện câu trả lời của từng question cũng như là thêm thật nhiều câu hỏi và câu trả lời mới"

## 1. Goal

Raise the quality of every existing interview question/answer in `content/questions/` and substantially grow the question bank, without breaking the existing content schema or site behavior (Flyway-free flat-file content, read by the backend `QuestionService`).

## 2. Current State (baseline, measured 2026-08-24)

| Category (`position`) | Existing files | Topic folders (`technology`) |
|---|---:|---:|
| `backend` | 4,832 | 1,115 (987 distinct `technology` tags) |
| `system-design` | 219 | 101 |
| `frontend` | 202 | 10 |
| `devops` | 1 | 1 (`docker`) |
| **Total** | **5,254** | — |

`devops` is effectively unseeded and is the most under-served category relative to its importance for a "practice interview" product — it's the starting phase.

## 3. Content Schema (unchanged — do not modify)

One question = one file at `content/questions/<position>/<technology-slug>/<id>.md`:

```
---
id: <slug, ascii, lowercase, hyphen-separated, no diacritics, matches filename>
position: backend|frontend|system-design|devops
technology: <folder slug>
level: junior|mid|senior
tags: [tag1, tag2, ...]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
...
## Question (EN)
...
## Đáp án chi tiết (VI)
...
## Detailed Answer (EN)
...
```

All new/edited files must validate against this shape exactly (same 4 section headers, in this order, in both languages).

## 4. Quality Bar (applies to every file touched or created)

Confirmed with the requester as the 4 improvement axes for existing content:

1. **Technical depth** — real code/commands/config, trade-off comparisons, at least one edge case or gotcha per answer. Not just a definition.
2. **Accuracy** — no deprecated APIs/flags presented as current; verify non-obvious claims.
3. **Format consistency** — same section structure/heading text, consistent table/code-block styling across files in a topic.
4. **Level fit** — junior = fundamentals + simple example; mid = practical usage/debugging/common patterns; senior = architecture trade-offs, scale/failure-mode reasoning.

New questions follow the same bar from the start, plus:
- No duplicate questions within a technology folder.
- Realistic questions a real interviewer would actually ask (not trivia).
- Tags: 2–4 relevant, lowercase-hyphenated.

## 5. Execution Strategy

Given the scale (5,254 existing files; target is several hundred to ~1,500 new files across categories), work is executed via the `Workflow` tool: **one agent per "big topic" cluster**. Each agent:

1. Reads all existing `.md` files under its assigned technology folder(s).
2. Improves any existing file in place (same `id`/filename) against the quality bar.
3. Writes N new question files (N given per topic below) directly into the folder, following the schema exactly.

Clusters were sized to the **"Dynamic workflow size"** setting (raised from the default ~15-agent guideline for this task, per requester approval on 2026-08-24) so each category runs as a single Workflow invocation instead of being split into multiple small runs.

**Run order (requester-approved):** DevOps → Frontend → System-design → Backend. Each phase is reviewed (spot-checked) before starting the next.

## 6. Phase 1 — DevOps (🟡 in progress, started 2026-08-24)

Only 1 existing file (`docker/docker-image-vs-container.md`). 9 big topics, 1 agent each, running in parallel in a single Workflow (`interview-arena-devops-content`, run id `wf_9194c7e4-627`):

| Technology slug | Big topic | Target new Qs |
|---|---|---:|
| `docker` | Docker & Containers (improves the 1 existing file too) | 25 |
| `kubernetes` | Kubernetes | 28 |
| `ci-cd` | CI/CD Pipelines | 25 |
| `terraform-iac` | Infrastructure as Code (Terraform/Ansible/Pulumi) | 25 |
| `cloud-aws-gcp-azure` | Cloud Platforms (AWS/GCP/Azure) | 25 |
| `monitoring-observability` | Monitoring & Observability | 22 |
| `linux-networking-ops` | Linux & Networking for Ops | 22 |
| `security-devsecops` | Security & DevSecOps | 20 |
| `gitops-release-mgmt` | GitOps & Release Management | 20 |

Estimated total: ~1 file improved + ~212 new files.

## 7. Phase 2 — Frontend (⏳ next)

202 existing files across 10 technology folders that already match sensible "big topics" — no reclustering needed:

| Technology slug | Target new Qs (existing count) |
|---|---:|
| `react` | 25 |
| `vuejs` | 25 |
| `angular` | 25 |
| `nextjs` | 20 |
| `typescript` | 25 |
| `javascript` | 25 |
| `html-css` | 20 |
| `react-native` | 20 |
| `flutter` | 20 |
| `frontend-core` | 20 |

Estimated: 202 files improved + ~225 new files. One agent per technology (10 agents, one Workflow run).

## 8. Phase 3 — System-design (⏳ after Frontend)

219 existing files across 101 folders — needs reclustering into ~15 big topics before assigning agents (exact folder→cluster mapping to be finalized when this phase starts, based on the actual 101 folder names):

Architecture & Patterns · API Design · Caching · Scalability & Load Balancing · Database Design (SQL/NoSQL at scale) · Messaging/Async Processing · Distributed Systems Fundamentals (CAP, consensus, replication) · Case Studies (design X: cart, booking, autocomplete, attendance, etc.) · Security (auth, rate limiting, abuse prevention) · Reliability (autoscaling, circuit breakers) · Capacity Estimation · CDN & Edge · Search/Bloom-filter-class data structures · Connection pooling & resource management · Vietnamese-specific case studies (chi-phí-vận-hành, chống-lạm-dụng, etc. — keep as-is, don't force-translate folder names)

Target: ~25 new Qs per cluster × ~15 clusters ≈ 375 new files. 219 existing files improved in place.

## 9. Phase 4 — Backend (⏳ largest, last)

4,832 existing files across 1,115 folders (987 distinct `technology` tags) — the folder structure is already near 1:1 with narrow topics, so this phase needs the heaviest reclustering. Draft ~28 clusters based on the top `technology` tag frequencies observed:

Java · Spring/Spring Boot · Ruby on Rails/Active Record · Python · Go · PHP · Node.js · SQL/PostgreSQL · NoSQL (MongoDB/Redis-as-datastore) · Redis (caching) · Kafka · RabbitMQ · Elasticsearch · GraphQL · Testing/QA · Security · Concurrency · OOP Fundamentals · Core Language Fundamentals · Architecture & Design Patterns · Performance & Optimization · Algorithms & Data Structures · Networking/HTTP · Linux/OS (backend context) · Git · CI/CD (backend context) · Docker/Kubernetes (backend context) · ML/Data Science · Logical/Aptitude Questions (`iq-tu-duy-logic`)

Improving 4,832 existing files is the single largest cost in this project — plan to batch multiple folders per agent (not 1:1) and expect this phase to itself need multiple sequential Workflow runs (>1000-agent lifetime cap applies per workflow). Target ~25 new Qs × ~28 clusters ≈ 700 new files, on top of improving all 4,832 existing ones.

## 10. Out of Scope

- No changes to the content schema, backend `QuestionService`/`QuestionRepository`, or DB migrations.
- No changes to `web/` rendering code.
- No deletion of existing questions (only in-place improvement + net-new additions).
- Pagination fix for the unbounded `GET /api/questions` endpoint (previously discovered as a gap) is a separate, unrelated backend task — not bundled here.

## 11. Progress Tracking

| Phase | Status | Workflow run id |
|---|---|---|
| DevOps | 🟡 in progress | `wf_9194c7e4-627` |
| Frontend | ⏳ not started | — |
| System-design | ⏳ not started | — |
| Backend | ⏳ not started | — |

This table should be updated as each phase's Workflow completes and its output is spot-checked.
