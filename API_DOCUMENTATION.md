# 📚 HUTECH-EDU API DOCUMENTATION

> **Tài liệu tổng hợp đầy đủ các API endpoints của hệ thống Hutech-Edu**  
> **Version:** 1.0.0  
> **Last Updated:** 2025-12-18

---

## 📋 MỤC LỤC

1. [Giới thiệu](#giới-thiệu)
2. [Authentication](#authentication)
3. [User Management](#user-management)
4. [Course Management](#course-management)
5. [Chapter & Lesson](#chapter--lesson)
6. [Enrollment](#enrollment)
7. [Quiz & Submission](#quiz--submission)
8. [Code Submission & Testing](#code-submission--testing)
9. [Payment](#payment)
10. [Certificate](#certificate)
11. [Learning Progress](#learning-progress)
12. [Gamification (XP System)](#gamification-xp-system)
13. [Learning Session & Tracking](#learning-session--tracking)
14. [Blog System](#blog-system)
15. [Tag & Category](#tag--category)
16. [Search](#search)
17. [Media Upload](#media-upload)
18. [Comments](#comments)

---

## 🔐 GIỚI THIỆU

### Base URL
```
http://localhost:3000/api
```

### Authentication
Hầu hết các API yêu cầu JWT token trong header:
```
Authorization: Bearer <your_jwt_token>
```

### Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

---

## 🔐 AUTHENTICATION

### Base Path: `/api/users`

#### 1. **Login**
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "userId": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "STUDENT"
    }
  }
}
```

---

#### 2. **Google Login**
```http
POST /api/users/google-login
```

**Request Body:**
```json
{
  "firebaseToken": "firebase_id_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": { ... }
  }
}
```

---

#### 3. **Firebase Login**
```http
POST /api/users/firebase-login
```

**Request Body:**
```json
{
  "firebaseToken": "firebase_id_token"
}
```

---

#### 4. **Firebase Register**
```http
POST /api/users/firebase-register
```

**Request Body:**
```json
{
  "firebaseToken": "firebase_id_token",
  "name": "User Name",
  "role": "STUDENT"
}
```

---

#### 5. **Verify Firebase Token**
```http
POST /api/users/verify-firebase-token
```

**Request Body:**
```json
{
  "firebaseToken": "firebase_id_token"
}
```

---

## 👤 USER MANAGEMENT

### Base Path: `/api/users`

#### 1. **Get All Users**
```http
GET /api/users
```

**Query Parameters:**
- `skip` (optional): Number of records to skip
- `take` (optional): Number of records to take

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "userId": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "STUDENT",
      "avatar": "url",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 2. **Get User by ID**
```http
GET /api/users/:userId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "STUDENT",
    "avatar": "url",
    "bio": "User bio",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 3. **Get User by Email**
```http
GET /api/users/email/:email
```

---

#### 4. **Get User by Name**
```http
GET /api/users/name/:name
```

---

#### 5. **Search User by Name**
```http
GET /api/users/search/:name
```

---

#### 6. **Create User**
```http
POST /api/users
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "role": "STUDENT"
}
```

---

#### 7. **Update User**
```http
PUT /api/users/:userId
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "avatar": "new_avatar_url"
}
```

---

#### 8. **Delete User**
```http
DELETE /api/users/:userId
```

---

#### 9. **Change Password**
```http
PUT /api/users/:userId/password
```

**Request Body:**
```json
{
  "oldPassword": "old_password",
  "newPassword": "new_password"
}
```

---

#### 10. **Get User with Relations**
```http
GET /api/users/:userId/relations
```

**Response:** User data with enrollments, submissions, certificates, etc.

---

#### 11. **Get User Enrolled Courses**
```http
GET /api/users/:userId/enrolled-courses
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "courseId": "uuid",
      "title": "Course Title",
      "thumbnail": "url",
      "progress": 45.5,
      "enrolledAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 12. **Check Enrollment**
```http
GET /api/users/:userId/check-enrollment/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isEnrolled": true,
    "enrollment": { ... }
  }
}
```

---

## 📚 COURSE MANAGEMENT

### Base Path: `/api/courses`

#### 1. **Get All Courses**
```http
GET /api/courses
```

**Query Parameters:**
- `skip` (optional): Pagination offset
- `take` (optional): Number of items

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "courseId": "uuid",
      "title": "Course Title",
      "description": "Course description",
      "thumbnail": "url",
      "price": 99.99,
      "level": "BEGINNER",
      "duration": 120,
      "enrollmentCount": 150,
      "rating": 4.5,
      "createdBy": {
        "userId": "uuid",
        "name": "Instructor Name"
      }
    }
  ]
}
```

---

#### 2. **Get Course by ID**
```http
GET /api/courses/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "uuid",
    "title": "Course Title",
    "description": "Detailed description",
    "thumbnail": "url",
    "price": 99.99,
    "level": "BEGINNER",
    "duration": 120,
    "enrollmentCount": 150,
    "rating": 4.5,
    "createdBy": {
      "userId": "uuid",
      "name": "Instructor Name",
      "avatar": "url"
    },
    "chapters": [
      {
        "chapterId": "uuid",
        "title": "Chapter 1",
        "order": 1,
        "lessons": [...]
      }
    ]
  }
}
```

---

#### 3. **Get Course with Details**
```http
GET /api/courses/:courseId/details
```

**Response:** Full course data including chapters, lessons, quizzes

---

#### 4. **Get Course with Chapters and Lessons**
```http
GET /api/courses/:courseId/chapters-lessons
```

---

#### 5. **Search Course by Name**
```http
GET /api/courses/search/:name
```

---

#### 6. **Get Course by Name**
```http
GET /api/courses/name/:name
```

---

#### 7. **Get Course by Name Prefix**
```http
GET /api/courses/prefix/:prefix
```

---

#### 8. **Get Courses by Level**
```http
GET /api/courses/level/:level
```

**Levels:** `BEGINNER`, `INTERMEDIATE`, `ADVANCED`

---

#### 9. **Get Courses by Creator**
```http
GET /api/courses/creator/:userId
```

---

#### 10. **Get Popular Courses**
```http
GET /api/courses/popular
```

**Query Parameters:**
- `limit` (optional): Number of courses (default: 10)

---

#### 11. **Get Course Stats**
```http
GET /api/courses/:courseId/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "enrollmentCount": 150,
    "completionRate": 65.5,
    "averageRating": 4.5,
    "totalRevenue": 14985.00
  }
}
```

---

#### 12. **Filter Courses**
```http
GET /api/courses/filter
```

**Query Parameters:**
- `level`: Course level
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `rating`: Minimum rating

---

#### 13. **Count Courses**
```http
GET /api/courses/count
```

**Query Parameters:**
- `level` (optional)
- `creatorId` (optional)

---

#### 14. **Get Enrolled Courses** 🔒
```http
GET /api/courses/enrolled
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "courseId": "uuid",
      "title": "Course Title",
      "progress": 45.5,
      "lastAccessed": "2024-01-01T00:00:00.000Z",
      "enrollment": { ... }
    }
  ]
}
```

---

#### 15. **Create Course** 🔒
```http
POST /api/courses
```

**Request Body:**
```json
{
  "title": "New Course",
  "description": "Course description",
  "thumbnail": "url",
  "price": 99.99,
  "level": "BEGINNER",
  "duration": 120
}
```

---

#### 16. **Update Course** 🔒
```http
PUT /api/courses/:courseId
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "price": 89.99
}
```

---

#### 17. **Delete Course** 🔒
```http
DELETE /api/courses/:courseId
```

---

## 📖 CHAPTER & LESSON

### Chapters

#### Base Path: `/api/chapters`

#### 1. **Get All Chapters**
```http
GET /api/chapters
```

---

#### 2. **Get Chapter by ID**
```http
GET /api/chapters/:chapterId
```

---

#### 3. **Get Chapters by Course**
```http
GET /api/chapters/course/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "chapterId": "uuid",
      "title": "Chapter 1: Introduction",
      "description": "Chapter description",
      "order": 1,
      "courseId": "uuid",
      "lessons": [...]
    }
  ]
}
```

---

#### 4. **Create Chapter** 🔒
```http
POST /api/chapters
```

**Request Body:**
```json
{
  "title": "New Chapter",
  "description": "Chapter description",
  "order": 1,
  "courseId": "uuid"
}
```

---

#### 5. **Update Chapter** 🔒
```http
PUT /api/chapters/:chapterId
```

---

#### 6. **Delete Chapter** 🔒
```http
DELETE /api/chapters/:chapterId
```

---

### Lessons

#### Base Path: `/api/lessons`

#### 1. **Get All Lessons**
```http
GET /api/lessons
```

---

#### 2. **Get Lesson by ID**
```http
GET /api/lessons/:lessonId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lessonId": "uuid",
    "title": "Lesson Title",
    "content": "Lesson content",
    "videoUrl": "url",
    "duration": 30,
    "order": 1,
    "chapterId": "uuid",
    "chapter": {
      "chapterId": "uuid",
      "title": "Chapter Title"
    }
  }
}
```

---

#### 3. **Get Lessons by Chapter**
```http
GET /api/lessons/chapter/:chapterId
```

---

#### 4. **Create Lesson** 🔒
```http
POST /api/lessons
```

**Request Body:**
```json
{
  "title": "New Lesson",
  "content": "Lesson content",
  "videoUrl": "url",
  "duration": 30,
  "order": 1,
  "chapterId": "uuid"
}
```

---

#### 5. **Update Lesson** 🔒
```http
PUT /api/lessons/:lessonId
```

---

#### 6. **Delete Lesson** 🔒
```http
DELETE /api/lessons/:lessonId
```

---

## 📝 ENROLLMENT

### Base Path: `/api/enrollments`

#### 1. **Get All Enrollments**
```http
GET /api/enrollments
```

**Query Parameters:**
- `skip` (optional)
- `take` (optional)

---

#### 2. **Get Enrollment by ID**
```http
GET /api/enrollments/:enrollmentId
```

---

#### 3. **Get My Enrollments** 🔒
```http
GET /api/enrollments/my
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "enrollmentId": "uuid",
      "courseId": "uuid",
      "course": {
        "title": "Course Title",
        "thumbnail": "url"
      },
      "progress": 45.5,
      "enrolledAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 4. **Get User Enrollments**
```http
GET /api/enrollments/user/:userId
```

---

#### 5. **Get Course Enrollments**
```http
GET /api/enrollments/course/:courseId
```

---

#### 6. **Check Enrollment** 🔒
```http
GET /api/enrollments/check/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isEnrolled": true,
    "enrollment": { ... }
  }
}
```

---

#### 7. **Create Enrollment**
```http
POST /api/enrollments
```

**Request Body:**
```json
{
  "userId": "uuid",
  "courseId": "uuid"
}
```

---

#### 8. **Enroll My Course** 🔒
```http
POST /api/enrollments/enroll
```

**Request Body:**
```json
{
  "courseId": "uuid"
}
```

---

#### 9. **Delete Enrollment** 🔒
```http
DELETE /api/enrollments/:enrollmentId
```

---

#### 10. **Get Course Stats**
```http
GET /api/enrollments/stats/course/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEnrollments": 150,
    "activeStudents": 120,
    "completionRate": 65.5
  }
}
```

---

#### 11. **Get My Stats** 🔒
```http
GET /api/enrollments/stats/my
```

---

## 📝 QUIZ & SUBMISSION

### Quizzes

#### Base Path: `/api/quizzes`

#### 1. **Get All Quizzes**
```http
GET /api/quizzes
```

---

#### 2. **Get Quiz by ID**
```http
GET /api/quizzes/:quizId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quizId": "uuid",
    "title": "Quiz Title",
    "description": "Quiz description",
    "timeLimit": 30,
    "passingScore": 70,
    "lessonId": "uuid",
    "questions": [
      {
        "questionId": "uuid",
        "question": "Question text",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "points": 10
      }
    ]
  }
}
```

---

#### 3. **Get Quizzes by Lesson**
```http
GET /api/quizzes/lesson/:lessonId
```

---

#### 4. **Create Quiz** 🔒
```http
POST /api/quizzes
```

**Request Body:**
```json
{
  "title": "New Quiz",
  "description": "Quiz description",
  "timeLimit": 30,
  "passingScore": 70,
  "lessonId": "uuid",
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "points": 10
    }
  ]
}
```

---

#### 5. **Update Quiz** 🔒
```http
PUT /api/quizzes/:quizId
```

---

#### 6. **Delete Quiz** 🔒
```http
DELETE /api/quizzes/:quizId
```

---

### Submissions

#### Base Path: `/api/submissions`

#### 1. **Get All Submissions**
```http
GET /api/submissions
```

---

#### 2. **Get Submission by ID**
```http
GET /api/submissions/:submissionId
```

---

#### 3. **Get My Submissions** 🔒
```http
GET /api/submissions/my
```

---

#### 4. **Get Submissions by Quiz**
```http
GET /api/submissions/quiz/:quizId
```

---

#### 5. **Get Submissions by User**
```http
GET /api/submissions/user/:userId
```

---

#### 6. **Submit Quiz** 🔒
```http
POST /api/submissions
```

**Request Body:**
```json
{
  "quizId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "answer": "A"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "submissionId": "uuid",
    "score": 85,
    "totalPoints": 100,
    "passed": true,
    "answers": [...]
  }
}
```

---

#### 7. **Delete Submission** 🔒
```http
DELETE /api/submissions/:submissionId
```

---

## 💻 CODE SUBMISSION & TESTING

### Test Cases

#### Base Path: `/api/test-cases`

#### 1. **Get All Test Cases**
```http
GET /api/test-cases
```

---

#### 2. **Get Test Case by ID**
```http
GET /api/test-cases/:testCaseId
```

---

#### 3. **Get Test Cases by Lesson**
```http
GET /api/test-cases/lesson/:lessonId
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "testCaseId": "uuid",
      "input": "test input",
      "expectedOutput": "expected output",
      "isHidden": false,
      "points": 10,
      "lessonId": "uuid"
    }
  ]
}
```

---

#### 4. **Create Test Case** 🔒
```http
POST /api/test-cases
```

**Request Body:**
```json
{
  "input": "test input",
  "expectedOutput": "expected output",
  "isHidden": false,
  "points": 10,
  "lessonId": "uuid"
}
```

---

#### 5. **Update Test Case** 🔒
```http
PUT /api/test-cases/:testCaseId
```

---

#### 6. **Delete Test Case** 🔒
```http
DELETE /api/test-cases/:testCaseId
```

---

### Test Code

#### Base Path: `/api/test-code`

#### 1. **Get All Test Codes**
```http
GET /api/test-code
```

---

#### 2. **Get Test Code by ID**
```http
GET /api/test-code/:testCodeId
```

---

#### 3. **Get Test Codes by Lesson**
```http
GET /api/test-code/lesson/:lessonId
```

---

#### 4. **Create Test Code** 🔒
```http
POST /api/test-code
```

**Request Body:**
```json
{
  "title": "Test Title",
  "description": "Test description",
  "starterCode": "// Your code here",
  "language": "javascript",
  "lessonId": "uuid",
  "testCases": [
    {
      "input": "test input",
      "expectedOutput": "expected output",
      "points": 10
    }
  ]
}
```

---

#### 5. **Update Test Code** 🔒
```http
PUT /api/test-code/:testCodeId
```

---

#### 6. **Delete Test Code** 🔒
```http
DELETE /api/test-code/:testCodeId
```

---

### Code Submissions

#### Base Path: `/api/code-submissions`

#### 1. **Get All Code Submissions**
```http
GET /api/code-submissions
```

---

#### 2. **Get Code Submission by ID**
```http
GET /api/code-submissions/:codeSubmissionId
```

---

#### 3. **Get My Code Submissions** 🔒
```http
GET /api/code-submissions/my
```

---

#### 4. **Get Code Submissions by Test Code**
```http
GET /api/code-submissions/test-code/:testCodeId
```

---

#### 5. **Submit Code** 🔒
```http
POST /api/code-submissions
```

**Request Body:**
```json
{
  "testCodeId": "uuid",
  "code": "console.log('Hello World');",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "codeSubmissionId": "uuid",
    "code": "console.log('Hello World');",
    "result": "passed",
    "score": 100,
    "testResults": [
      {
        "testCaseId": "uuid",
        "passed": true,
        "output": "Hello World",
        "expectedOutput": "Hello World"
      }
    ]
  }
}
```

---

#### 6. **Delete Code Submission** 🔒
```http
DELETE /api/code-submissions/:codeSubmissionId
```

---

## 💳 PAYMENT

### Base Path: `/api/payment`

#### 1. **Create Payment** 🔒
```http
POST /api/payment/create
```

**Request Body:**
```json
{
  "courseId": "uuid",
  "amount": 99.99,
  "returnUrl": "https://yoursite.com/payment/return",
  "cancelUrl": "https://yoursite.com/payment/cancel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://payment-gateway.com/...",
    "orderId": "uuid",
    "amount": 99.99
  }
}
```

---

#### 2. **Payment Return**
```http
GET /api/payment/return
```

**Query Parameters:**
- `vnp_ResponseCode`: Payment response code
- `vnp_TxnRef`: Transaction reference
- Other VNPay parameters

---

#### 3. **Get Payment by ID**
```http
GET /api/payment/:paymentId
```

---

#### 4. **Get My Payments** 🔒
```http
GET /api/payment/my
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "paymentId": "uuid",
      "amount": 99.99,
      "status": "SUCCESS",
      "courseId": "uuid",
      "course": {
        "title": "Course Title"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 5. **Get Payments by User**
```http
GET /api/payment/user/:userId
```

---

#### 6. **Get Payments by Course**
```http
GET /api/payment/course/:courseId
```

---

## 🎓 CERTIFICATE

### Base Path: `/api/certificates`

#### 1. **Get All Certificates**
```http
GET /api/certificates
```

---

#### 2. **Get Certificate by ID**
```http
GET /api/certificates/:certificateId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "certificateId": "uuid",
    "certificateUrl": "url",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "userId": "uuid",
    "courseId": "uuid",
    "user": {
      "name": "User Name"
    },
    "course": {
      "title": "Course Title"
    }
  }
}
```

---

#### 3. **Get My Certificates** 🔒
```http
GET /api/certificates/my
```

---

#### 4. **Get Certificates by User**
```http
GET /api/certificates/user/:userId
```

---

#### 5. **Get Certificates by Course**
```http
GET /api/certificates/course/:courseId
```

---

#### 6. **Generate Certificate** 🔒
```http
POST /api/certificates
```

**Request Body:**
```json
{
  "courseId": "uuid"
}
```

---

#### 7. **Delete Certificate** 🔒
```http
DELETE /api/certificates/:certificateId
```

---

## 📊 LEARNING PROGRESS

### Base Path: `/api/progress`

#### 1. **Get My Progress** 🔒
```http
GET /api/progress/my
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "lessonProgressId": "uuid",
      "lessonId": "uuid",
      "lesson": {
        "title": "Lesson Title"
      },
      "completed": true,
      "completedAt": "2024-01-01T00:00:00.000Z",
      "watchTime": 1800
    }
  ]
}
```

---

#### 2. **Get Progress by Course** 🔒
```http
GET /api/progress/course/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "uuid",
    "totalLessons": 20,
    "completedLessons": 9,
    "progress": 45.0,
    "lessons": [...]
  }
}
```

---

#### 3. **Get Progress by Lesson** 🔒
```http
GET /api/progress/lesson/:lessonId
```

---

#### 4. **Update Progress** 🔒
```http
POST /api/progress/update
```

**Request Body:**
```json
{
  "lessonId": "uuid",
  "completed": true,
  "watchTime": 1800
}
```

---

#### 5. **Mark Lesson Complete** 🔒
```http
POST /api/progress/complete/:lessonId
```

---

## ⭐ GAMIFICATION (XP SYSTEM)

### Base Path: `/api/xp`

#### 1. **Get My XP** 🔒
```http
GET /api/xp/my
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalXP": 1250,
    "level": 5,
    "currentLevelXP": 250,
    "nextLevelXP": 500,
    "progress": 50.0
  }
}
```

---

#### 2. **Get User XP**
```http
GET /api/xp/user/:userId
```

---

#### 3. **Get XP History** 🔒
```http
GET /api/xp/history
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "xpId": "uuid",
      "amount": 50,
      "reason": "Completed lesson",
      "earnedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 4. **Get Leaderboard**
```http
GET /api/xp/leaderboard
```

**Query Parameters:**
- `limit` (optional): Number of users (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "Top User",
      "avatar": "url",
      "totalXP": 5000,
      "level": 15
    }
  ]
}
```

---

#### 5. **Award XP** 🔒
```http
POST /api/xp/award
```

**Request Body:**
```json
{
  "userId": "uuid",
  "amount": 50,
  "reason": "Completed quiz"
}
```

---

## ⏱️ LEARNING SESSION & TRACKING

### Learning Sessions

#### Base Path: `/api/sessions`

#### 1. **Start Session** 🔒
```http
POST /api/sessions/start
```

**Request Body:**
```json
{
  "courseId": "uuid",
  "lessonId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid",
    "startTime": "2024-01-01T10:00:00.000Z"
  }
}
```

---

#### 2. **End Session** 🔒
```http
POST /api/sessions/end/:sessionId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid",
    "duration": 1800,
    "xpEarned": 25
  }
}
```

---

#### 3. **Get My Sessions** 🔒
```http
GET /api/sessions/my
```

---

#### 4. **Get Session Stats** 🔒
```http
GET /api/sessions/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSessions": 45,
    "totalTime": 54000,
    "averageSessionTime": 1200,
    "thisWeek": {
      "sessions": 5,
      "time": 6000
    }
  }
}
```

---

### Course Tracking

#### Base Path: `/api/courses` (extends course routes)

#### 1. **Get Course Completion Time**
```http
GET /api/courses/:courseId/completion-time
```

**Response:**
```json
{
  "success": true,
  "data": {
    "averageCompletionTime": 86400,
    "fastestCompletion": 43200,
    "slowestCompletion": 172800
  }
}
```

---

#### 2. **Get My Course Time** 🔒
```http
GET /api/courses/:courseId/my-time
```

---

## 📝 BLOG SYSTEM

### Base Path: `/api/blog-posts`

#### 1. **Get All Posts**
```http
GET /api/blog-posts
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search query
- `authorId` (optional): Filter by author
- `status` (optional): `DRAFT`, `PUBLISHED`, `ARCHIVED`
- `tagId` (optional): Filter by tag
- `categoryId` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "postId": "uuid",
        "title": "Blog Post Title",
        "slug": "blog-post-title",
        "excerpt": "Post excerpt...",
        "content": "Full content...",
        "thumbnail": "url",
        "status": "PUBLISHED",
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "author": {
          "userId": "uuid",
          "name": "Author Name",
          "avatar": "url"
        },
        "tags": [...],
        "categories": [...],
        "viewCount": 150,
        "likeCount": 25
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

#### 2. **Get Post by ID**
```http
GET /api/blog-posts/:postId
```

---

#### 3. **Get Post by Slug**
```http
GET /api/blog-posts/slug/:slug
```

---

#### 4. **Get Featured Posts**
```http
GET /api/blog-posts/featured
```

---

#### 5. **Create Post** 🔒
```http
POST /api/blog-posts
```

**Request Body:**
```json
{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "content": "Post content...",
  "excerpt": "Short excerpt...",
  "thumbnail": "url",
  "status": "PUBLISHED",
  "tagIds": ["uuid1", "uuid2"],
  "categoryIds": ["uuid1"]
}
```

---

#### 6. **Update Post** 🔒
```http
PUT /api/blog-posts/:postId
```

---

#### 7. **Delete Post** 🔒
```http
DELETE /api/blog-posts/:postId
```

---

## 🏷️ TAG & CATEGORY

### Tags

#### Base Path: `/api/tags`

#### 1. **Get All Tags**
```http
GET /api/tags
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "tagId": "uuid",
      "name": "JavaScript",
      "slug": "javascript",
      "description": "JavaScript programming",
      "postCount": 25
    }
  ]
}
```

---

#### 2. **Get Tag by ID**
```http
GET /api/tags/:tagId
```

---

#### 3. **Get Tag by Slug**
```http
GET /api/tags/slug/:slug
```

---

#### 4. **Get Popular Tags**
```http
GET /api/tags/popular
```

**Query Parameters:**
- `limit` (optional): Number of tags (default: 10)

---

#### 5. **Create Tag** 🔒
```http
POST /api/tags
```

**Request Body:**
```json
{
  "name": "React",
  "slug": "react",
  "description": "React library"
}
```

---

#### 6. **Update Tag** 🔒
```http
PUT /api/tags/:tagId
```

---

#### 7. **Delete Tag** 🔒
```http
DELETE /api/tags/:tagId
```

---

### Categories

#### Base Path: `/api/categories`

#### 1. **Get All Categories**
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "categoryId": "uuid",
      "name": "Web Development",
      "slug": "web-development",
      "description": "Web dev tutorials",
      "postCount": 50
    }
  ]
}
```

---

#### 2. **Get Category by ID**
```http
GET /api/categories/:categoryId
```

---

#### 3. **Get Category by Slug**
```http
GET /api/categories/slug/:slug
```

---

#### 4. **Get Popular Categories**
```http
GET /api/categories/popular
```

---

#### 5. **Create Category** 🔒
```http
POST /api/categories
```

**Request Body:**
```json
{
  "name": "Mobile Development",
  "slug": "mobile-development",
  "description": "Mobile app tutorials"
}
```

---

#### 6. **Update Category** 🔒
```http
PUT /api/categories/:categoryId
```

---

#### 7. **Delete Category** 🔒
```http
DELETE /api/categories/:categoryId
```

---

## 🔍 SEARCH

### Base Path: `/api/search`

#### 1. **Search Courses**
```http
GET /api/search/courses
```

**Query Parameters:**
- `q`: Search query
- `level` (optional): Course level
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `tags` (optional): Comma-separated tag IDs

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [...],
    "total": 25,
    "query": "javascript"
  }
}
```

---

#### 2. **Search by Tags**
```http
GET /api/search/by-tags
```

**Query Parameters:**
- `tagIds`: Comma-separated tag IDs

---

#### 3. **Advanced Search**
```http
POST /api/search/advanced
```

**Request Body:**
```json
{
  "query": "react",
  "filters": {
    "level": "INTERMEDIATE",
    "minPrice": 0,
    "maxPrice": 100,
    "tags": ["uuid1", "uuid2"],
    "rating": 4.0
  }
}
```

---

## 📤 MEDIA UPLOAD

### Base Path: `/api/media` or `/api/uploads`

#### 1. **Upload File** 🔒
```http
POST /api/media/upload
```

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: File to upload

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.com/path/to/file.jpg",
    "filename": "file.jpg",
    "size": 102400,
    "mimetype": "image/jpeg"
  }
}
```

---

#### 2. **Upload Multiple Files** 🔒
```http
POST /api/media/upload-multiple
```

**Form Data:**
- `files`: Multiple files

---

#### 3. **Delete File** 🔒
```http
DELETE /api/media/:filename
```

---

## 💬 COMMENTS

### Base Path: `/api/comments`

#### 1. **Get Comments by Course**
```http
GET /api/comments/course/:courseId
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "commentId": "uuid",
      "content": "Great course!",
      "rating": 5,
      "userId": "uuid",
      "user": {
        "name": "User Name",
        "avatar": "url"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 2. **Get Comments by Lesson**
```http
GET /api/comments/lesson/:lessonId
```

---

#### 3. **Get Comments by Blog Post**
```http
GET /api/comments/blog/:postId
```

---

#### 4. **Create Comment** 🔒
```http
POST /api/comments
```

**Request Body:**
```json
{
  "content": "Great content!",
  "rating": 5,
  "courseId": "uuid"
}
```

---

#### 5. **Update Comment** 🔒
```http
PUT /api/comments/:commentId
```

---

#### 6. **Delete Comment** 🔒
```http
DELETE /api/comments/:commentId
```

---

## 📊 STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🔒 AUTHENTICATION NOTES

- 🔒 = Requires authentication
- Use JWT token in Authorization header
- Token format: `Bearer <token>`
- Get token from login/register endpoints

---

## 📝 NOTES

1. All timestamps are in ISO 8601 format
2. UUIDs are used for all IDs
3. Pagination uses `skip` and `take` or `page` and `limit`
4. File uploads use multipart/form-data
5. All responses follow consistent format

---

## 🚀 QUICK START

### 1. Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 2. Get Courses
```bash
curl http://localhost:3000/api/courses
```

### 3. Enroll in Course
```bash
curl -X POST http://localhost:3000/api/enrollments/enroll \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"courseId":"course-uuid"}'
```

---

## 📞 SUPPORT

For issues or questions, please contact the development team.

**Last Updated:** 2025-12-18  
**Version:** 1.0.0
