---
id: usenavigation-useroute-typing-voi-typescript-ra-sao
position: backend
technology: navigation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`useNavigation` / `useRoute` — typing với TypeScript ra sao?

## Question (EN)
`useNavigation` / `useRoute` — how to type them with TypeScript?

## Đáp án chi tiết (VI)
react-navigation v7 cung cấp generic types để type-safe navigation prop và route params.\
\
**Khai báo param list:**\
```ts\
type RootStackParamList = {\
  Home: undefined\
  Detail: { productId: string; from?: 'home' | 'search' }\
  Profile: { userId: number }\
}\
```\
\
**Trong screen component:**\
```tsx\
import type { NativeStackScreenProps } from '@react-navigation/native-stack'\
\
type Props = NativeStackScreenProps\u003cRootStackParamList, 'Detail'\u003e\
function DetailScreen({ route, navigation }: Props) {\
  const { productId, from } = route.params // typed\
  navigation.navigate('Profile', { userId: 42 }) // typed\
}\
```\
\
**Tip 2026:** declare global type-safe navigation bằng module augmentation:\
```ts\
declare global {\
  namespace ReactNavigation {\
    interface RootParamList extends RootStackParamList {}\
  }\
}\
```\
Khi đó `useNavigation()` không cần generic — TypeScript tự suy luận.

## Detailed Answer (EN)
react-navigation v7 ships generic types for type-safe navigation props and route params.\
\
**Declare the param list:**\
```ts\
type RootStackParamList = {\
  Home: undefined\
  Detail: { productId: string; from?: 'home' | 'search' }\
  Profile: { userId: number }\
}\
```\
\
**Inside a screen component:**\
```tsx\
import type { NativeStackScreenProps } from '@react-navigation/native-stack'\
\
type Props = NativeStackScreenProps\u003cRootStackParamList, 'Detail'\u003e\
function DetailScreen({ route, navigation }: Props) {\
  const { productId, from } = route.params // typed\
  navigation.navigate('Profile', { userId: 42 }) // typed\
}\
```\
\
**2026 tip:** declare global type-safe navigation via module augmentation:\
```ts\
declare global {\
  namespace ReactNavigation {\
    interface RootParamList extends RootStackParamList {}\
  }\
}\
```\
Now `useNavigation()` infers types without generics.
