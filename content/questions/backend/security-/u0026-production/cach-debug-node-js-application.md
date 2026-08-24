---
id: cach-debug-node-js-application
position: backend
technology: security-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách debug Node.js application?

## Question (EN)
How do you debug a Node.js application?

## Đáp án chi tiết (VI)
Breakpoint debugging: `node --inspect app.js` expose debugger tại port 9229; mở `chrome://inspect` → attach. `--inspect-brk` dừng tại dòng đầu tiên — dùng khi debug initialization code. VS Code launch.json: `{ type: 'node', request: 'launch', program: '${workspaceFolder}/src/index.ts', runtimeArgs: ['-r', 'ts-node/register'] }` — breakpoints trong TypeScript với source maps. Memory profiling: Chrome DevTools → Memory tab → Heap Snapshot → so sánh 2 snapshots tìm memory leak; retained size cho thấy objects đang giữ gì. CPU profiling: DevTools → Performance tab → Record → stress → flame graph, tìm hot functions. `clinic doctor -- node app.js`: tự phát hiện event loop delay, I/O issues, memory problems, generate HTML report. `0x app.js`: interactive CPU flamegraph, hiển thị call stacks chiếm CPU. Source maps: `sourceMap: true` trong tsconfig để debugger map JS → TS. Lưu ý: `--inspect` trong production mà expose port ra internet → remote code execution vulnerability; bind tới localhost only.

## Detailed Answer (EN)
$83
