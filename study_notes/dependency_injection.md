# Dependency Injection의 개념

## 개념
- Dependency Injection은 객체가 스스로 필요한 것을 만들지 않고, 외부에서 주입받는 것을 의미한다.

## DI가 필요한 이유
### DI가 없는 코드
```typescript
class UserService {
    private repo = new UserRepository();

    getUser(){
        return this.repo.find();
    }        
}
```
**문제점**
1. UserSerivce가 UserRepository에 강하게 의존하고 있다.
2. 테스트하기 어렵다.
3. DB가 변경되면 UserService도 변경되어야 한다.
4. 의존성 교체가 어렵다. 

### DI가 있는 코드
```typescript
class UserService {
    constructor(private repo: UserRepository) {} // UserRepository를 외부에서 주입받는다.

    getUser(){
        return this.repo.find(id);
    }
}

```
**장점**
1. UserService 입장에서는 UserRepository가 무엇인지 모른다.
2. 단지 UserRepository의 역할만 알면 된다.
3. 테스트하기 쉽다.

## 의존성 주입의 3가지 방식
### 1. 생성자 주입
```typescript
    constructor(private repo: UserRepository) {}
```

### 2. Setter 주입
```typescript
    private repo: UserRepository;
    
    setRepo(repo: UserRepository){
        this.repo = repo;
    }
```

### 3. 필드 주입(권장 X)
```typescript
    @Inject()
    repo: UserRepository;
```

## Nest.js에서 DI 매커니즘
### 1. Provider 등록
```typescript
@Injectable()
export class UserRepository {}
```
### 2. Service에서 사용
```typescript
@Injectable()
export class UserService {
    constructor(private repo: UserRepository){}
}
```

### 3. Module에서 연결
```typescript
@Module({
  providers: [UserService, UserRepository],
})
export class UserModule {}
```

### 4. DI Container가 수행
1. UserService 필요함
2. 생성자 보니 → UserRepository 필요
3. 컨테이너에서 UserRepository 찾음
4. 없으면 생성
5. 주입