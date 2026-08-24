---
id: persistqueryclient-trong-react-query-dung-de-lam-gi
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
persistQueryClient trong React Query dùng để làm gì?

## Question (EN)
What is persistQueryClient and when should you use it?

## Đáp án chi tiết (VI)
$89

## Detailed Answer (EN)
persistQueryClient is a React Query plugin that persists the query cache to external storage (localStorage, IndexedDB, AsyncStorage) so cached data survives page refreshes. Setup: use createSyncStoragePersister (localStorage) or createAsyncStoragePersister (IndexedDB, AsyncStorage); wrap with PersistQueryClientProvider or call persistQueryClient() directly. Use cases: offline support — show cached data when offline; faster perceived performance — show stale cached data immediately on revisit while refetching in background; PWAs — combine with Service Workers for full offline capability. Configuration: maxAge — how long to keep persisted cache (default 24 hours); buster — cache version key for invalidating old persisted data on app updates. Important: sensitive data should not be persisted to localStorage — use secure storage or encrypt before persisting.
