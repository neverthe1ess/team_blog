# 🎓 8교시: 토큰 사용하기 (Authorization Header)

출입증(토큰)을 발급받아 주머니(localStorage)에 넣었습니다.
이제 건물에 들어갈 때 경비원에게 **출입증을 보여주는 방법**을 알아봅시다.

## 1. 헤더(Header): 편지의 봉투 ✉️

인터넷 통신(HTTP)은 편지를 보내는 것과 같습니다.

- **Body (본문)**: 우리가 보내고 싶은 진짜 내용 (글 제목, 내용 등)
- **Header (봉투)**: 누구한테 보내는지, 어떤 언어로 썼는지, **누가 보냈는지** 등 부가 정보

## 2. Authorization: "저 권한 있어요!" 🛡️

서버에게 "나 로그인 했어!"라고 알리려면 **Header**에 특별한 문구를 적어야 합니다.

> **규칙**: `Authorization: Bearer <토큰>`

- **Authorization**: "권한 부여"라는 뜻의 헤더 이름.
- **Bearer**: "소지자"라는 뜻. "이 토큰을 가진 사람에게 권한을 주세요"라는 암호 같은 겁니다. (표준 규약)
- **<토큰>**: 우리가 로그인할 때 받은 그 긴 문자열.

## 3. 코드로는 어떻게? 💻

`fetch` 함수를 쓸 때 `headers` 옵션을 추가하면 됩니다.

```javascript
const token = localStorage.getItem("accessToken"); // 주머니에서 꺼내기

fetch("http://localhost:3000/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // 👇 여기가 핵심!
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ title: "안녕", content: "반가워" }),
});
```

자, 이제 이 원리를 이용해서 글쓰기 기능을 만들어봅시다! 🚀
