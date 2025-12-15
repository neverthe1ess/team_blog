# React 기초: 6. Form Handling (입력창 다루기)

## 1. Controlled Component (제어 컴포넌트)

HTML에서는 `<input>` 태그가 알아서 값을 기억하지만,
React에서는 **"입력값(Value)도 State로 관리"**하는 것이 정석입니다.

**"화면에 보이는 값" = "내가 가진 State"** 를 항상 일치시키는 거죠.

```tsx
const [email, setEmail] = useState("");

return (
  <input
    type="email"
    value={email} // 1. 화면에 보여줄 값은 State야.
    onChange={(e) => setEmail(e.target.value)} // 2. 타이핑할 때마다 State를 바꿔줘.
  />
);
```

## 2. 폼 제출 (OnSubmit)

버튼을 눌렀을 때 페이지가 새로고침 되지 않게 막고(`preventDefault`), 백엔드로 데이터를 보내야 합니다.

```tsx
const handleSubmit = (e) => {
  e.preventDefault(); // 새로고침 방지 (중요!)
  console.log("백엔드로 보낼 데이터:", email);
  // fetch(...)
};

return <form onSubmit={handleSubmit}>...</form>;
```
