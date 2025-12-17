# 🎓 15교시: 토큰 유효기간 만료 (Token Expiration) ⏳

"입장권(토큰)이 찢어졌는데, 아직도 VIP 대우를 해주네?"

## 1. 문제 상황 🚨

1.  사용자가 로그인해서 토큰(`accessToken`)을 받아서 `localStorage`에 저장했습니다.
2.  이 토큰은 **1시간** 뒤에 만료됩니다.
3.  1시간 반이 지났습니다.
4.  새로고침을 합니다.
5.  `localStorage`에 토큰이 **여전히 남아있어서**, 프론트엔드는 "어? 토큰 있네? 로그인 상태!"라고 판단합니다. (`isLoggedIn = true`)
6.  하지만 글쓰기를 누르면 백엔드는 "유효기간 지났어!" 하고 401 에러를 뱉습니다.

## 2. 해결 방법 💊

토큰이 존재하는지만 보지 말고, **상했는지(만료됐는지)** 확인해야 합니다.
JWT 토큰 안에는 `exp` (expiration)라는 유통기한이 적혀있습니다.

### 체크 로직

```typescript
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);

// decoded.exp : 만료 시간 (초 단위)
// Date.now() : 현재 시간 (밀리초 단위)

if (decoded.exp * 1000 < Date.now()) {
  // ⏰ 만료됨!
  localStorage.removeItem("accessToken");
  setIsLoggedIn(false);
}
```

## 3. 더 완벽하게 하려면? (Logout on 401)

실제로 API 요청을 보냈는데 백엔드가 `401 Unauthorized`를 주면, 그때도 강제로 로그아웃 시켜주는 것이 좋습니다.
