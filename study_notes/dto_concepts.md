# DTO란 무엇인가?
## 정의
- DTO(Data Transfer Object)는 레이어 간으로 데이터를 안전하고 예측가능하게 전달하기 위한 객체이다.
### NestJS에서 DTO
- 요청(Request) 데이터의 모양
- 받아도 되는 필드만 정의한 클래스
- Controller <-> Service 간 전달

### DTO의 역할
- 약속: 클라이언트와 명세서 역할(통과하려면 title, content를 담아야 함)
- 보안: 악의적으로 정의되지 않은 필드를 넣어서 보내면? -> DTO에 해당 필드가 정의되지 않으면 무시하거나 차단한다.

## NestJS에 DTO를 어떻게 쓰냐?
### 1. Request DTO
```typescript
CreatePostDto
UpdatePostDto
LoginDto
```
### 2. Query DTO
```typescript
export class PaginationDto{
    @IsInt()
    @Min(1)
    page = 1;

    @IsInt()
    @Max(50)
    limit = 10;
}
```
### 3. Response DTO
```typescript
export class PostRensponseDto{
    id: number;
    title: string;
    author: {
        email: string;
        nickname: string;
    };
}
```

## DTO가 쓰이는 흐름
```
HTTP Request
 ↓
DTO 생성 + Validation
 ↓
Controller
 ↓
Service (DTO 기반)
 ↓
Prisma (Entity)
```

## 오해오해 - 그럼 DTO가 API 명세서일까?
### 1. 완전한 API 명세서까지는 아니다. 
- DTO하나만으로 URL, HTTP Method, 인증 필요 여부, 응답 상태 코드, 에러 포맷 등 이런 것들을 알 수 없다.
- 그래서, DTO 하나만으로 API 명세서로 볼 수는 없다.

### 2. 그러나 핵심 스펙인건 맞다.(요청/응답 스펙)
- 이 API는 이런 필드만, 이런 타입으로 받는다.
```typescript
export class CreatePostDto {
  title: string;
  content: string;
}
```
이건 사실 상 아래와 동일한 정보이다.
```yaml
POST /posts
Request Body:
    title: string
    content: string
```

### 3. DTO + Swagger = 거의 API 명세서
```typescript
export class CreatePostDto{
    @ApiProperty({ example: '제목' })
    title: string;

    @ApiProperty({ example: '내용' })
    content: string;
}
```
- Swagger에 자동 반영됨


## 언제 DTO를 언제 생성해야 하나?(판단 기준)
### 1. 외부에서 들어오거나, 외부로 나가는 데이터라면 DTO를 만든다. 
- **HTTP Request**
- **HTTP Response**

### 2. 생성해야 하는 대표 케이스
#### **POST/PUT/PATCH 요청**
```typescript
@Post()
create(@Body() dto: CreatePostDto){}
```
- 클라이언트가 보내는 데이터는 신뢰하면 안된다.

#### **Query/Param 받을 떄**
```typescript
@Get()
findAll(@Query() query: PaginationDto){}
```
- page, limit, sort 같은 것도 DTO 대상

#### **외부로 데이터를 반환할 때(권장)**
```typescript
PostResponseDto
UserProfileDto
```
- 이렇게 하면 DB 모델을 노출하지 않을 수 있다.

## DTO를 통해 분리하는 이유
### 1. 책임 분리(SRP)
|레이어|설명|
|------|---|
|DTO|데이터 형태 / 검증|
|Controller|요청 / 응답|
|Service|비즈니스 로직|
|DB(Model)|저장 구조|

### 2. Validation 
```typescript
@isEmail()
email: string;
```
- 컨트롤러/서비스에 if문이 필요가 없다.
- DTO가 검증의 책임을 다 할 수 있다.

## DTO는 왜 여러 개로 쪼갤까?
### 하나의 거대한 DTO 
```typescript
UserDto {
  id: number;
  email: string;
  password: string;
  nickname: string;
}
```
- Create를 수행할 때는 id가 필요없다.
- Response에서도 동일한 DTO를 사용하면 패스워드가 노출될 수 있다.
- Update에서 일부만 수정해야 한다.

### DTO는 상황별로 잘 나누자
#### 1. 요청 목적이 다를 때
- create
- update
- Login
#### 2. 입력 / 출력이 다를 때
- Request DTO
- Response DTO

#### 3. 필드 필수 / 옵션이 다를 때
- Required Vs. Optional 