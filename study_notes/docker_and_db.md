# Docker & Database 개념 정리

## 1. Docker란 무엇인가요?
**"내 컴퓨터 안에 또 다른 가상의 컴퓨터(컨테이너)를 띄우는 기술"**

### 비유: 🍱 도시락 (Container)
- **일반적인 설치**: 내 컴퓨터에 PostgreSQL을 직접 설치하려면, 운영체제(Mac/Windows) 버전을 따지고, 설정을 잡고, 나중에 지우기도 복잡합니다.
- **Docker 사용**: "PostgreSQL이 완벽하게 설치된 **도시락(Image)**"을 다운로드 받아서 뚜껑만 엽니다. 다 먹으면 도시락 통만 버리면 끝입니다. 내 컴퓨터를 더럽히지 않습니다.

### 핵심 용어
- **Image (이미지)**: 실행 가능한 프로그램이 얼려 있는 상태 (예: 마트에서 파는 냉동 만두)
- **Container (컨테이너)**: 이미지를 녹여서 실제로 실행하고 있는 상태 (예: 찐 만두)

---

## 2. `docker-compose.yml` 해부하기
우리가 작성한 파일을 한 줄씩 뜯어봅시다.

```yaml
version: '3.8'
services:        # 서비스 목록 (우리는 DB 하나만 띄움)
  db:            # 서비스 이름 (내 맘대로 지음)
    image: postgres:14       # "Postgres 버전 14짜리 도시락 주세요"
    container_name: board_db # 띄운 컨테이너 이름표
    ports:
      - 5432:5432            # [중요] 구멍 뚫기 (내 컴퓨터 포트 : 컨테이너 포트)
    environment:             # 환경 변수 (초기 설정)
      POSTGRES_USER: myuser         # 아이디
      POSTGRES_PASSWORD: mypassword # 비번
      POSTGRES_DB: board_db         # 만들 데이터베이스 이름
    volumes:
      - pgdata:/var/lib/postgresql/data # 데이터 보존 (컨테이너 없어져도 데이터는 남기기)

volumes:
  pgdata: # 보존할 창고 이름 정의
```

---

## 3. 포트 포워딩 (Port Forwarding)
**`5432:5432`의 의미**

도커 컨테이너는 일종의 **"자물쇠로 잠긴 방"**입니다. 밖에서 안으로 못 들어갑니다.
그래서 **"벽에 구멍(Port)"**을 뚫어서 연결해야 합니다.

- **왼쪽 5432**: 내 컴퓨터(Host)의 구멍
- **오른쪽 5432**: 컨테이너(Guest) 내부의 구멍 (Postgres는 원래 5432번을 씁니다)

**결과**: "내 컴퓨터의 5432번으로 접속하면, 도커 방 안의 5432번으로 연결해 줄게!"

---

## 4. 우리가 연결한 방식
1. **Nest.js**는 내 컴퓨터(Localhost)에서 돕니다.
2. **PostgreSQL**은 Docker 컨테이너 안에서 돕니다.
3. Nest.js가 `localhost:5432`에 노크를 합니다.
4. Docker가 그 노크를 받아서 컨테이너 안쪽의 PostgreSQL에게 전달합니다.
5. **연결 성공!** 🔗

---

## 5. Dockerfile vs docker-compose.yml
**"둘 다 Docker 파일인데 뭐가 달라요?"**

### 🏗️ Dockerfile (설계도)
- **목적**: "새로운 **이미지(도시락)**를 만들 때"
- **하는 일**: OS 깔고, Node.js 깔고, 내 소스코드 복사해서 "실행 가능한 상태"로 얼리기.
- **비유**: 공장에서 도시락 메뉴 개발하고 제조하기.

### 🎼 docker-compose.yml (배치도)
- **목적**: "이미 만들어진 이미지들을 **실행**할 때"
- **하는 일**: DB 컨테이너, 백엔드 컨테이너 등 여러 개를 한 번에 켜고 끄기.
- **비유**: 편의점 진열장에 도시락(Image)들을 배치하고 판매 개시하기.

> **결론**: 우리는 남이 만든 PostgreSQL 이미지를 그대로 쓸 거라서 `Dockerfile`은 필요 없고, 실행 설정인 `docker-compose.yml`만 있으면 됩니다!

