# React & Next.js 기초: 1. Component & JSX

## 1. Component (컴포넌트)란?

**"레고 블록"**입니다. 🧱
웹사이트를 통째로 만드는 게 아니라, `Button`, `Header`, `PostCard`처럼 작은 조각(컴포넌트)들을 만들어서 조립하는 방식입니다.

### 특징

- **함수(Function)**입니다: 입력을 받아서 UI(HTML)를 리턴하는 자바스크립트 함수입니다.
- **대문자**로 시작해야 합니다 (예: `MyButton` (O), `myButton` (X)).

## 2. JSX (JavaScript XML)

자바스크립트 안에서 HTML을 작성할 수 있게 해주는 문법입니다.

```tsx
// 자바스크립트 함수인데 HTML 태그를 리턴함!
function Hello() {
  return <h1>Hello, React!</h1>;
}
```

### 규칙

- **부모는 하나여야 함**: 여러 태그를 리턴하려면 `<div>`나 `<> (Fragment)`로 감싸야 합니다.
- **className**: HTML의 `class` 대신 `className`을 씁니다. (자바스크립트의 `class` 예약어 충돌 방지)
- **자바스크립트 쓰기**: 중괄호 `{ }`를 쓰면 안에서 변수나 함수를 쓸 수 있습니다.
  ```tsx
  const name = "Gemini";
  return <h1>Hello, {name}</h1>;
  ```
