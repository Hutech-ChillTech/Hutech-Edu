# Database Schema - Lesson System

## Core Models

### Lesson
```prisma
model Lesson {
  lessonId       String   @id @default(uuid()) @db.Uuid
  lessonName     String
  videoUrl       String?   // NULL = not a video lesson
  content        String?
  isPreview      Boolean  @default(false)
  publicIdVideo  String?   // Cloudinary ID
  chapterId      String   @db.Uuid
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt

  testCases       TestCase[]  // Has items = TestCode lesson
  chapter         Chapter     @relation(...)
  submissions     Submission[]
  lessonsProgress UserLessonProgress[]
}
```

### TestCase
```prisma
model TestCase {
  testCaseId     String @id @default(uuid()) @db.Uuid
  description    String?
  input          String?       // For algorithm tests
  expectedOutput String?
  testCode       String? @db.Text  // For HTML/CSS/JS tests
  lessonId       String @db.Uuid
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt

  lesson          Lesson @relation(...)
  codeSubmissions CodeSubmission[]
}
```

### CodeSubmission
```prisma
model CodeSubmission {
  submissionId     String   @id @default(uuid()) @db.Uuid
  userId           String   @db.Uuid
  testCaseId       String   @db.Uuid
  source_code      String?
  language_id      Int?
  stdout           String?
  stderr           String?
  status           Json?
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt

  user     User     @relation(...)
  testCase TestCase @relation(...)
}
```

---

## ⚠️ CRITICAL: Lesson Type Detection

**NO `lessonType` field exists!** Determine type by:

```typescript
// Video Lesson
videoUrl !== null && (testCases.length === 0 || !testCases)

// TestCode Lesson  
testCases.length > 0
```

---

## Sample Data

### Video Lesson
```json
{
  "lessonId": "abc-123",
  "lessonName": "React Hooks Intro",
  "videoUrl": "https://cloudinary.com/video.mp4",
  "publicIdVideo": "videos/react_hooks",
  "testCases": []  // EMPTY
}
```

### TestCode Lesson
```json
{
  "lessonId": "def-456",
  "lessonName": "Array Practice",
  "videoUrl": null,  // NO VIDEO
  "testCases": [{
    "testCaseId": "test-1",
    "input": "[1,2,3]",
    "expectedOutput": "6",
    "testCode": "function sum(arr) {...}"
  }]
}
```

---

## TypeScript Interfaces

```typescript
interface Lesson {
  lessonId: string;
  lessonName: string;
  videoUrl: string | null;
  publicIdVideo: string | null;
  testCases?: TestCase[];
}

interface TestCase {
  testCaseId: string;
  input: string | null;
  expectedOutput: string | null;
  testCode: string | null;
  lessonId: string;
}

// Helper
const isTestCodeLesson = (lesson: Lesson) => 
  lesson.testCases && lesson.testCases.length > 0;
```

---

## Prisma Queries

**ALWAYS include testCases:**
```typescript
// Fetch lesson
const lesson = await prisma.lesson.findUnique({
  where: { lessonId },
  include: { testCases: true }  // Required!
});

// Create Video Lesson
await prisma.lesson.create({
  data: {
    lessonName: "Video Tutorial",
    videoUrl: "https://...",
    chapterId: "..."
  }
});

// Create TestCode Lesson
await prisma.lesson.create({
  data: {
    lessonName: "Code Challenge",
    chapterId: "...",
    testCases: {
      create: [{
        input: "[1,2,3]",
        expectedOutput: "6",
        testCode: "function sum(arr) {...}"
      }]
    }
  }
});
```

---

## Key Constraints

- UUIDs for all IDs
- Cascade delete: Lesson → TestCases → CodeSubmissions
- Nullable: `videoUrl`, `publicIdVideo`, `testCode`
- **Must include `testCases` relation to determine lesson type**