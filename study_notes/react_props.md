# React 기초: 2. Props (속성)

## 1. Props란?
**"옵션이 있는 레고 블록"**입니다. 🎨
이전의 `Home` 컴포넌트는 항상 똑같은 내용만 보여줬죠?
`Props`를 쓰면 **"빨간 버튼"**, **"파란 버튼"** 처럼 밖에서 색깔이나 내용을 정해줄 수 있습니다.

### 특징
- **부모 -> 자식**으로만 전달됩니다 (위에서 아래로 흐르는 물 💧).
- **읽기 전용(Read-Only)**입니다. 자식이 마음대로 Props를 바꿀 수 없습니다. (주는 대로 받아야 함)

## 2. 사용법 (TypeScript)

### 1단계: 주문서(Interface) 만들기
"이 컴포넌트는 `label`이랑 `color`가 필요해"라고 정의합니다.
```tsx
interface MyButtonProps {
  label: string;
  color?: string; // 물음표(?)는 있어도 되고 없어도 되는 옵션!
}
```

### 2단계: 받아서 쓰기
함수 인자로 `props`를 받아서 씁니다.
```tsx
// { label, color } 처럼 구조 분해 할당을 많이 씁니다.
export default function MyButton({ label, color = "blue" }: MyButtonProps) {
  return <button className={`bg-${color}-500`}>{label}</button>;
}
```

### 3단계: 부모에서 넘겨주기
HTML 속성처럼 넘겨줍니다.
```tsx
<MyButton label="로그인" color="red" />
<MyButton label="취소" />
```
