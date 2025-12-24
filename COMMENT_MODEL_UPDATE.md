# 🔧 UPDATE: Comment Model Enhancement

**Date**: 07/12/2025  
**Change**: Made Comment model polymorphic to support both Course and BlogPost

---

## ✅ WHAT CHANGED

### Before (Course only)
```prisma
model Comment {
  commentId  String @id @default(uuid()) @db.Uuid
  courseId   String @db.Uuid              // Required
  userId     String @db.Uuid
  content    String
  // ...
  
  course  Course @relation(...)           // Only Course
}
```

### After (Course + BlogPost)
```prisma
model Comment {
  commentId   String @id @default(uuid()) @db.Uuid
  courseId    String? @db.Uuid             // Optional - for courses
  blogPostId  String? @db.Uuid             // Optional - for blogs
  userId      String @db.Uuid
  content     String
  // ...
  
  course    Course?    @relation(...)      // Optional
  blogPost  BlogPost?  @relation(...)      // Optional
}
```

---

## 🎯 WHY THIS CHANGE?

**Problem**: Comment model chỉ hỗ trợ Course, không thể dùng cho BlogPost

**Solution**: Làm cho Comment polymorphic (linh hoạt):
- `courseId` → Optional (cho course comments)
- `blogPostId` → Optional (cho blog comments)
- Một comment chỉ thuộc về 1 trong 2: Course HOẶC BlogPost

---

## 📝 USAGE

### Comment cho Course (như cũ)
```typescript
await prisma.comment.create({
  data: {
    courseId: "course-id",
    userId: "user-id",
    content: "Great course!",
    rating: 5
  }
});
```

### Comment cho BlogPost (mới)
```typescript
await prisma.comment.create({
  data: {
    blogPostId: "blog-post-id",
    userId: "user-id",
    content: "Awesome article!",
    // Note: rating chỉ dùng cho course
  }
});
```

### Lấy comments của Course
```typescript
const comments = await prisma.comment.findMany({
  where: {
    courseId: "course-id",
    parentId: null  // Root comments only
  },
  include: {
    user: true,
    replies: true
  }
});
```

### Lấy comments của BlogPost
```typescript
const comments = await prisma.comment.findMany({
  where: {
    blogPostId: "blog-post-id",
    parentId: null
  },
  include: {
    user: true,
    replies: true
  }
});
```

---

## ⚠️ MIGRATION NOTES

### Existing Data
- Tất cả comments hiện tại đều có `courseId`
- Sau migration, `courseId` vẫn giữ nguyên
- `blogPostId` sẽ là `null` cho tất cả comments cũ

### No Breaking Changes
- Code hiện tại vẫn hoạt động bình thường
- Không cần update existing comment code
- Chỉ cần thêm code mới cho blog comments

---

## 🔍 VALIDATION

Comment phải có **ít nhất 1** trong 2:
- `courseId` (cho course comment)
- `blogPostId` (cho blog comment)

**Không được** có cả 2 cùng lúc!

### Validation trong Service Layer
```typescript
// ❌ BAD: Cả 2 đều null
await prisma.comment.create({
  data: {
    userId: "user-id",
    content: "Comment"
    // Missing courseId AND blogPostId
  }
});

// ❌ BAD: Cả 2 đều có
await prisma.comment.create({
  data: {
    courseId: "course-id",
    blogPostId: "blog-id",  // Conflict!
    userId: "user-id",
    content: "Comment"
  }
});

// ✅ GOOD: Chỉ 1 trong 2
await prisma.comment.create({
  data: {
    courseId: "course-id",
    userId: "user-id",
    content: "Comment"
  }
});
```

---

## 📊 DATABASE CHANGES

### New Indexes
```prisma
@@index([courseId])     // Existing
@@index([blogPostId])   // New
@@index([userId])       // Existing
@@index([parentId])     // Existing
```

### Schema Changes
- `courseId`: `String` → `String?` (nullable)
- `blogPostId`: Added (nullable)
- `blogPost`: Added relation

---

## ✅ NEXT STEPS

1. **Run Migration**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Update Comment Service** (if needed)
   - Add validation for courseId/blogPostId
   - Add methods for blog comments

3. **Test**
   - Test existing course comments
   - Test new blog comments
   - Test validation

---

## 🎉 BENEFITS

✅ **Reusability**: 1 Comment model cho cả Course và Blog  
✅ **Consistency**: Cùng 1 cấu trúc comment (replies, rating, etc.)  
✅ **Flexibility**: Dễ dàng mở rộng cho các entity khác  
✅ **No Breaking Changes**: Code cũ vẫn hoạt động  

---

**Status**: ✅ Ready to use
