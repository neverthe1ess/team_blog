# AuthModule 안에서 UsersModule을 직접 쓰는 코드가 없는데 왜 import 하나?
## 1. 핵심 규칙
- NestJS에는 다음과 같은 규칙이 있어요
**A 모듈의 Provider를 B 모듈을 주입받으려면??.**
- 1. A 모듈이 그 Provider를 exports 하고
- 2. B 모듈이 A 모듈을 imports 해야 한다.

## 2. 예시를 보는 코드
**AuthService 코드**
```typescript
@Injectable()
export class AuthService{
    constructor(
        private usersService : UsersService,
        private jwtService : JwtService
    ){}
}
```
- **AuthService는 UsersService를 사용해야 함**

**의존성의 흐름**
```
AuthService ──▶ UsersService
```

## 3. UsersService는 어디에 있나?
```typescript
@Module({
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
```
- UsersService는 **UsersModule에 소속되어 있음**
- 외부에서 쓰려면 exports 되어 있어야 한다.

## 4. 그래서 AuthModule에 UsersModule을 import 하는 것 
```typescript
@Module({
    imports:[
        UsersModule, 
        PassportModule,
        JwtModule.registerAsync(...),
    ],
})
export class AuthModule{}
```
- AuthModule은 UsersModule이 제공한 Provider들을 내 DI 컨터이너에서 사용할 수 있다.


## 5. 그럼 언제 Module에 imports를 안 써도 되는 건가요?
### ✔️ 같은 모듈 안에 있을 때
```typescript
@Module({
    providers : [UsersService, AuthService],
})
```

### ✔️ 전역 모듈(@Global)
```typescript
@Global()
@Module({
  providers: [UsersService],
  exports: [UsersService],  
})
```