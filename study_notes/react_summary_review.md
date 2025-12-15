# 🎓 중간 점검: 리액트 핵심 개념 총정리

지금까지 우리가 숨 가쁘게 달려오면서 배운 **리액트(React)와 넥스트(Next.js)**의 핵심 무기들을 정리해봅니다.
이것들만 알면 웬만한 웹 사이트는 다 만들 수 있습니다!

---

## 1. 컴포넌트 (Component) 🧱

> "화면을 이루는 레고 블록"

- **개념**: 화면의 일부분을 담당하는 독립적인 코드 조각(함수).
- **특징**: 대문자로 시작하는 함수 이름 (`function MyButton() {}`).
- **코드 예시**:
  ```tsx
  export default function MyComponent() {
    return <div>나는 컴포넌트야!</div>;
  }
  ```

## 2. JSX (JavaScript XML) 🖼️

> "자바스크립트 안에서 쓰는 HTML"

- **개념**: 리액트 컴포넌트가 화면에 무엇을 그릴지 설명하는 문법.
- **특징**:
  - HTML과 비슷하지만 `class` 대신 `className`을 씀.
  - 변수를 넣을 땐 중괄호 `{ }`를 사용. (`<h1>{title}</h1>`)
  - 반드시 하나의 부모 태그로 감싸야 함 (`<div>...</div>` or `<>...</>`).

## 3. Props (Properties) 🎁

> "부모가 자식에게 주는 선물 data"

- **개념**: 컴포넌트에게 전달하는 설정값이나 데이터.
- **특징**: **읽기 전용(Read-only)**. 자식은 이걸 바꿀 수 없음.
- **코드 예시**:

  ```tsx
  // 부모
  <MyButton label="로그인" color="blue" />

  // 자식
  function MyButton({ label, color }) { ... }
  ```

## 4. State (useState) ⚡️

> "컴포넌트의 살아있는 상태(기억)"

- **개념**: 시간이 지나거나 사용자 행동에 의해 **변하는 데이터**.
- **특징**: **상태가 바뀌면 컴포넌트는 다시 그려집니다(Re-render).**
- **코드 예시**:
  ```tsx
  const [count, setCount] = useState(0);
  // count: 현재 값
  // setCount: 값을 바꾸는 함수 (이걸로 바꿔야 화면이 갱신됨!)
  ```

## 5. 이벤트 처리 (Event Handling) 👆

> "사용자의 행동에 반응하기"

- **개념**: 클릭, 입력 등의 행동을 잡아서 처리하는 것.
- **특징**: `onClick`, `onChange`, `onSubmit` 등을 사용.
- **코드 예시**:
  ```tsx
  <button onClick={() => alert("클릭!")}>눌러봐</button>
  ```

## 6. 리스트 렌더링 (Map) 📝

> "배열 데이터를 화면에 뿌리기"

- **개념**: 자바스크립트 `map()` 함수를 써서 배열을 태그 목록으로 변환.
- **특징**: **`key`** 속성을 꼭 넣어줘야 리액트가 헷갈리지 않음.
- **코드 예시**:
  ```tsx
  {
    posts.map((post) => <li key={post.id}>{post.title}</li>);
  }
  ```

## 7. 이펙트 (useEffect) 💫

> "화면이 그려진 뒤(Side Effect)에 할 일"

- **개념**: 컴포넌트가 나타날 때, 사라질 때, 혹은 특정 값이 변할 때 실행할 코드.
- **용도**: API 호출(데이터 가져오기), 타이머 설정 등.
- **코드 예시**:
  ```tsx
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타났다!");
  }, []); // [] : 처음에 딱 한 번만 실행
  ```

## 8. Next.js 라우팅 (Routing) 🚦

> "페이지 이동하기"

- **개념**: 다른 페이지 URL로 이동하는 방법.
- **방식**:
  1.  **`<Link href="...">`**: HTML의 `<a>` 태그 같지만 새로고침 없이 부드럽게 이동. (메뉴판 메뉴)
  2.  **`useRouter()`**: 자바스크립트 코드로 이동시킬 때. (로그인 성공 후 강제 이동 등)

## 9. 클라이언트 vs 서버 컴포넌트 🖥️

> "어디서 렌더링할 것인가?"

- **Client Component (`"use client"`)**: 브라우저에서 동작. `useState`, `useEffect`, `onClick` 등을 쓸 때 필수.
- **Server Component (기본값)**: 서버에서 미리 그려서 HTML만 보냄. 빠르고 검색엔진에 좋음.

---

## 🎯 우리 코드에 숨어있는 Next.js 개념들

지금 작성하신 코드에는 이미 Next.js만의 특별한 기능들이 잔뜩 들어있습니다!

1.  **파일 기반 라우팅 (App Router)**
    - `app/page.tsx` 👉 메인 페이지 (`/`)
    - `app/login/page.tsx` 👉 로그인 페이지 (`/login`)
    - `app/signup/page.tsx` 👉 회원가입 페이지 (`/signup`)
    - 📁 **폴더를 만들면 자동으로 페이지가 되는 마법**이 바로 Next.js입니다.

2.  **레이아웃 (Layout)**
    - `app/layout.tsx` 파일을 보세요.
    - 모든 페이지가 공통으로 입고 있는 **'껍데기'**입니다. (`<html>`, `<body>` 태그가 여기 있죠)

3.  **메타데이터 (Metadata)**
    - `layout.tsx`에 있는 `export const metadata = { ... }`
    - 구글 검색엔진에 우리 사이트를 소개하는 이름표입니다.

4.  **"use client"**
    - Next.js는 기본적으로 **서버 컴포넌트**입니다.
    - 하지만 우리가 `useState`, `onClick`을 쓰려면 브라우저 기능이 필요하죠?
    - 그래서 파일 맨 위에 "나 브라우저에서 돌릴 거야!"라고 선언한 것입니다.
