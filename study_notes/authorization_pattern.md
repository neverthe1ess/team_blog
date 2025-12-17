# 🎓 11교시: 인증(Authentication) vs 인가(Authorization) 🔐

"로그인 한 건 알겠는데, **네가 쓴 글** 맞아?"

## 1. 인증과 인가의 차이

- **인증 (Authentication)**: "너 누구야?" (입장권 검사) -> **로그인**
- **인가 (Authorization)**: "너 이거 할 권한 있어?" (VIP룸 검사) -> **내 글만 삭제 가능**

## 2. 프론트엔드에서 내 글인지 아는 방법 (JWT 해독)

우리가 가진 입장권(JWT 토큰)에는 사실 **비밀스런 정보(Payload)**가 적혀있습니다.
하지만 암호화된 문자열처럼 보여서 눈으로는 못 읽죠.

이걸 읽으려면 특수 안경(`jwt-decode` 라이브러리)이 필요합니다.

```javascript
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");
const myInfo = jwtDecode(token);

console.log(myInfo.sub); // 내 ID (예: 1)
console.log(myInfo.username); // 내 닉네임 (예: 홍길동)
```

## 3. 내 글 검사 로직 🕵️‍♂️

상세 페이지에서 이렇게 검사하면 됩니다.

```javascript
if (post.authorId === myInfo.sub) {
  // 내 글이다! 삭제 버튼 보여줘!
  setShowDeleteButton(true);
}
```
