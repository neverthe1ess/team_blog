# React 기초: 3. State (상태)

## 1. State란?

**"살아있는 변수"**입니다. 🌱
일반 변수(`const a = 1`)는 값이 바뀌어도 화면이 그대로지만, **State는 값이 바뀌면 화면이 자동으로 새로고침(리렌더링)**됩니다.

### 비유

- **Props**: 부모가 꽂아준 고정된 칩 (읽기 전용) 💾
- **State**: 내 안에서 변하는 데이터 (카운터 숫자, 입력창 내용 등) ⚡️

## 2. 사용법 (`useState`)

React에서 가장 많이 쓰는 함수(Hook)입니다.

```tsx
import { useState } from "react";

// [현재값, 바꾸는함수] = useState(초기값);
const [count, setCount] = useState(0);

// 사용:
// 1. 읽기: {count}
// 2. 쓰기: setCount(count + 1)
```

### ⚠️ 주의할 점

`count = count + 1` 처럼 직접 바꾸면 안 됩니다!
반드시 `setCount` 함수를 써야 React가 "아, 값이 바뀌었구나! 화면 다시 그려야지"라고 눈치챕니다.
