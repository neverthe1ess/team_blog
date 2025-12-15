# 데이터베이스 관계: 이론부터 구현까지 (Complete Guide)

데이터베이스의 핵심 이론(SQL)과 이를 Prisma로 구현하는 방법을 총정리한 노트입니다.

---

## 1. 핵심 개념: 기본 키(PK)와 외래 키(FK)

### 🔑 기본 키 (Primary Key, PK)
- **"주민등록번호"**: 테이블 내에서 데이터를 유일하게 식별하는 **고유한 값**입니다.
- 절대 중복될 수 없고, 비어있을 수 없습니다(`NOT NULL`).

### 🔗 외래 키 (Foreign Key, FK)
**"관계의 연결고리이자, 데이터의 수호자"**

외래 키는 두 가지 핵심 기능을 가집니다.

#### 1. 연결 (Relationship)
- 다른 테이블의 **기본 키(PK)**를 가리키는 손가락입니다.
- "이 글의 작성자는 3번 유저입니다"라고 기록하는 것과 같습니다.

#### 2. 제약 (Constraint) - 더 중요!
데이터가 엉망이 되는 것을 막아주는 안전장치(**참조 무결성**)입니다.

- **존재 확인**: "3번 유저"가 `Users` 테이블에 없으면, `Posts` 테이블에 `user_id = 3`을 저장할 수 없습니다 (에러 발생).
- **변경/삭제 규칙 (On Delete / On Update Action)**:
    - **CASCADE (폭포수)**: 부모(유저)가 삭제되면, 자식(글)도 같이 삭제해라. (탈퇴 시 글 삭제)
    - **SET NULL (널 처리)**: 부모가 삭제되면, 자식의 FK를 비워둬라. (탈퇴해도 글은 "알 수 없음"으로 남김)
    - **RESTRICT (금지)**: 자식이 있으면 부모를 삭제하지 마라. (글 다 지우기 전엔 탈퇴 못 함)

---

## 2. 일대다 관계 (1:N) - Main Relationship

**"부모 하나에 자식 여럿"** (예: 회원 1명 - 글 N개)

### 🏛️ SQL 이론 (Physical Schema)
어디에 FK를 저장해야 할까요? **무조건 '다(N)' 쪽(자식)이 가집니다.**
- `User` (1): 아무것도 모릅니다.
- `Post` (N): `user_id`라는 **FK 컬럼**을 가집니다.

```sql
-- Users (부모, 1)
CREATE TABLE Users ( id INT PRIMARY KEY );

-- Posts (자식, N)
CREATE TABLE Posts (
    id INT PRIMARY KEY,
    user_id INT,        -- FK 선언
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### 💎 Prisma 구현
`@relation`을 사용해 연결합니다. **가상의 필드(List)**를 양쪽에 만들어 편하게 씁니다.
```prisma
model User { // 1 (부모)
  id    Int    @id
  posts Post[] // 가상 필드: "내가 쓴 글 다 가져와"
}

model Post { // N (자식)
  id       Int  @id
  author   User @relation(fields: [authorId], references: [id]) // 연결 고리
  authorId Int  // 실제 FK 컬럼
}
```

---

## 3. 일대일 관계 (1:1) - Sub Relationship

**"일심동체"** (예: 회원 - 프로필)

### 🏛️ SQL 이론
보통 **Sub 테이블(부)**이 FK를 가집니다. 단, 1:N과 구분하기 위해 **FK에 `UNIQUE` 제약조건**을 겁니다.
("이 유저 ID는 이 테이블에서 딱 한 번만 등장할 수 있다")

```sql
CREATE TABLE Profiles (
    id INT PRIMARY KEY,
    user_id INT UNIQUE, -- ✨ 핵심: 중복 불가! (철수가 프로필 2개 못 만듦)
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### 💎 Prisma 구현
자식 쪽 FK 필드에 `@unique`를 붙입니다. 부모 쪽은 배열(`[]`)이 아니라 **단일 객체(`?`)**로 받습니다.
```prisma
model User {
  id      Int      @id
  profile Profile? // "있을 수도, 없을 수도 (딱 1개만)"
}

model Profile {
  id     Int  @id
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique // ✨ 핵심
}
```

---

## 4. 다대다 관계 (N:M) - Complex Relationship

**"서로가 서로를 여러 명 가짐"** (예: 글 - 해시태그)

### 🏛️ SQL 이론 (Junction Table)
데이터베이스 칸에는 `1,2,3` 같이 여러 값을 넣을 수 없습니다. 그래서 **"연결 테이블(중매쟁이)"**이 필수입니다.

```sql
-- Post_Hashtags (중재자)
CREATE TABLE Post_Hashtags (
    post_id INT,
    hashtag_id INT,
    -- 두 개의 FK를 가짐
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    FOREIGN KEY (hashtag_id) REFERENCES Hashtags(id),
    
    -- "1번 글에 3번 태그"라는 조합은 유일해야 하므로, 둘을 합쳐서 PK로 씁니다 (복합키).
    PRIMARY KEY (post_id, hashtag_id) 
);
```

### 💎 Prisma 구현
Prisma가 **알아서 중간 테이블을 만들어 줍니다** (Implicit Relation).
```prisma
model Post {
  id   Int       @id
  tags HashTag[] // "태그 여러 개 가짐"
}

model HashTag {
  id    Int    @id
  posts Post[] // "글 여러 개에 달림"
}
```
*(Prisma가 DB에 `_PostToHashTag` 테이블을 자동으로 생성합니다)*
