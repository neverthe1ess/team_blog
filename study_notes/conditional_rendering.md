# 🎓 9교시: 조건부 렌더링 (Conditional Rendering)

"로그인 한 사람한테는 '로그아웃' 버튼을, 안 한 사람한테는 '로그인' 버튼을 보여주고 싶어!"
이럴 때 사용하는 것이 **조건부 렌더링**입니다.

## 1. 삼항 연산자 (The Ternary Operator) ⚖️

가장 많이 쓰는 방법입니다. 엑셀의 `IF` 함수와 비슷해요.

```javascript
// 조건 ? 참일때 : 거짓일때
isLoggedIn ? <LogOutButton /> : <LogInButton />;
```

## 2. 논리 연산자 (&&) 🔗

"이거 맞으면 보여줘! 아니면 아무것도 보여주지 마."

```javascript
// 조건 && 보여줄것
// isLoggedIn이 true면 <WriteButton>이 보이고, false면 아예 안 보임
isLoggedIn && <WriteButton />;
```

## 3. ⚠️ 주의할 점: 하이드레이션(Hydration) 에러

Next.js에서 `localStorage`를 쓸 때 가장 많이 겪는 문제입니다.

- **서버**: "음, `localStorage`가 없으니까 `isLoggedIn`은 `false`겠군. [로그인] 버튼을 그려서 보내자."
- **브라우저**: "어? 난 `localStorage`에 토큰이 있는데? `isLoggedIn`은 `true`야. [로그아웃] 버튼 그려야지."
- **결과**: **"서버랑 브라우저랑 말이 다른데?"** 하면서 에러(Hydration Mismatch)가 납니다.

### 해결법 💊

처음엔 무조건 '로그인 안 됨'으로 시작하고, **화면이 다 그려진 뒤(`useEffect`)에** 주머니를 확인해서 상태를 바꿔야 합니다.

```javascript
const [isLoggedIn, setIsLoggedIn] = useState(false); // 일단 false로 시작

useEffect(() => {
  // 브라우저에서만 실행됨
  const token = localStorage.getItem("accessToken");
  if (token) {
    setIsLoggedIn(true); // 토큰 있으면 true로 변경
  }
}, []);
```
