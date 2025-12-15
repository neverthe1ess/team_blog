# React 기초: 5. Lifecycle & useEffect (수명 주기)

## 1. 컴포넌트의 일생 (Lifecycle)

컴포넌트도 사람처럼 **태어나고, 살아가고, 죽습니다.**

1.  **Mount (탄생)**: 화면에 처음 나타날 때 👶
2.  **Update (성장)**: State나 Props가 바뀌어서 화면이 갱신될 때 👦
3.  **Unmount (사망)**: 화면에서 사라질 때 👻

## 2. useEffect란?

**"특정 시점에 코드를 실행해줘!"**라고 React에게 부탁하는 훅(Hook)입니다.
주로 **화면이 다 그려진 뒤에** 무언가를 해야 할 때 씁니다. (예: 타이머 시작, 데이터 가져오기)

## 3. 사용법

```tsx
import { useEffect } from "react";

// useEffect(실행할함수, [의존성배열]);

// 1. 탄생할 때 딱 한 번만 실행 (Mount)
useEffect(() => {
  console.log("안녕! 난 방금 태어났어");
}, []); // 빈 배열([])이 중요!

// 2. 특정 변수가 바뀔 때마다 실행 (Update)
useEffect(() => {
  console.log("숫자가 바뀌었어!");
}, [count]); // count가 바뀔 때만 실행됨

// 3. 사라질 때 뒷정리 (Unmount)
useEffect(() => {
  return () => {
    console.log("난 이제 갈게... 안녕..."); // 청소 함수(Cleanup Function)
  };
}, []);
```
