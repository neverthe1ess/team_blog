# 🎓 12교시: 관계형 데이터의 UI (Relationships) 👨‍👩‍👧‍👦

"게시글(부모)이 있으면 댓글(자식)이 따라다녀야죠!"

## 1. 1:N 관계 (One-to-Many) 개념

- **게시글(Post)**: 1개
- **댓글(Comment)**: N개 (여러 개)
- 이걸 화면에 그릴 땐, **게시글 바로 아래에 댓글 목록(`map`)**을 붙여줍니다.

## 2. 데이터를 가져오는 두 가지 전략 ✌️

우리가 백엔드(`prisma`)에서 `include`를 썼다면 쉬웠겠지만, 보통은 따로 요청합니다.

### 방법 A: 한방에 가져오기 (Include) 📦

- `GET /posts/1` 요청하면 댓글까지 다 줌.
- 장점: 빠름.
- 단점: 댓글이 1000개면 게시글 로딩이 느려짐.

### 방법 B: 따로 가져오기 (Separate Fetch) 🚚

- `GET /posts/1` (글 내용)
- `GET /comments?postId=1` (댓글 목록)
- 장점: 글 먼저 보여주고, 댓글은 천천히 로딩 가능.

## 3. 화면 구현 (Component Split) 🧩

댓글 기능은 복잡하니까 컴포넌트로 쪼개는 게 좋습니다.

- `page.tsx` (글 상세 페이지)
  - `<CommentList postId={id} />` (댓글 담당 일진)

## 4. 댓글 작성 후 처리 (Refetch) 🔄

댓글을 쓰면 목록이 바로 갱신되어야겠죠?
가장 쉬운 방법은 **"목록 다시 불러오기 함수"를 자식에게 넘겨주는 것**입니다.

```tsx
// 부모 (CommentList)
const fetchComments = () => { ... }

// 자식 (CommentForm)
<CommentForm onSuccess={fetchComments} />
```
