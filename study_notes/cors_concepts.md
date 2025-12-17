# CORS

## 개념

- CORS는 **브라우저**가 보안 때문에 다른 출처의 서버 요청을 제한하는 규칙이다.
- 핵심은 브라우저이다.

## CORS가 왜 필요할까?

- 내가 faker.com에 접속
- 그 사이트의 Javascript가 (fetch, axios, ...)
- 내 브라우저를 이용해서
- **t1.com/china/no.1** 같은 요청을 마음대로 보낼 수 있다.

- 사용자 몰래 악성 젠지팬이 될 수 있음 ㅎㅎ
- 그래서 브라우저가 출처가 다르면 함부로 요청 못하게 하자. -> CORS의 출발점

## Origin(출처)가 뭘까요??

- Origin은 3가지의 조합으로 구성됩니당

```code
프로토콜 + 도메인 + 포트
```

```text
http://chovy.co.kr:8282
```

## 우리가 실력 기르기에서 닥친 상황

```text
Front(next + react) : http://localhost:3001
Back(nest.js) : http://localhost:3000
```

- 무심코 프론트엔드 코드에 fetch 사용
- 근데 fetch는 브라우저 명령어
- 브라우저 입장

```text
요청해야지 -> 서버로 요청 보냄 -> 요청에 대한 응답 잘받음(Network 단) -> Origin이 다르네 -> 결과 반환 X(JS에 결과 안 줌)
```

## 흔히 할 수도 있는 오해

### CORS는 요청 자체를 막지 않는다!

- CORS는 요청을 보내고 네트워크 단까지 응답을 받는 것을 막지 않음 ㅇㅇ
- 브라우저 단에서 헤더를 보고 Origin이 신뢰하는 출처 리스트에 있는지만 확인
- 아니면 JS에 res를 리턴 안함

### Postman, Curl는 CORS 문제 없음

- CORS는 브라우저 전용 보안 정책
- Postman / curl / 서버 간 통신은 해당되지 않음.
