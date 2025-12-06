# 🎮 Gamification & Leveling System API Documentation

## 📋 Tổng quan

Hệ thống gamification với Experience Points (XP), Level tự động nâng cấp, và Achievements. User nhận XP khi:

- Hoàn thành bài học
- Hoàn thành khóa học
- Pass quiz
- Unlock achievements

---

## 🎯 XP Rewards Table

| Action                     | XP Reward | Notes                    |
| -------------------------- | --------- | ------------------------ |
| Hoàn thành lesson          | 10 XP     | Standard reward          |
| Hoàn thành lesson đầu tiên | 25 XP     | First lesson bonus       |
| Hoàn thành course          | 100 XP    | Standard reward          |
| Hoàn thành course đầu tiên | 150 XP    | First course bonus       |
| Pass quiz                  | 20 XP     | Score >= passingScore    |
| Quiz điểm tuyệt đối        | 50 XP     | Score = 100%             |
| Unlock achievement         | Variable  | Tùy achievement.xpReward |

---

## 📊 Level System

### Level Requirements

| Level        | Min XP | Max XP | Title        | Badge | Perks                   |
| ------------ | ------ | ------ | ------------ | ----- | ----------------------- |
| Basic        | 0      | 999    | Beginner     | 🌱    | No discount             |
| Intermediate | 1,000  | 4,999  | Intermediate | ⭐    | 5% discount on courses  |
| Advanced     | 5,000+ | ∞      | Expert       | 🏆    | 10% discount on courses |

### Auto-Upgrade

User level tự động nâng cấp khi đủ XP:

- Backend tính toán level mỗi khi thêm XP
- Update `User.level`, `currentLevelXP`, `nextLevelXP`
- Frontend hiển thị progress bar: `(currentLevelXP / nextLevelXP) * 100`

---

## 🏅 Achievements

### Achievement Categories

1. **Lesson Achievements**

   - First Steps: 1 lesson → 25 XP
   - Beginner: 5 lessons → 50 XP
   - Lesson Master: 50 lessons → 200 XP
   - Lesson Legend: 100 lessons → 500 XP

2. **Course Achievements**

   - Course Starter: 1 course → 150 XP
   - Course Enthusiast: 5 courses → 300 XP
   - Course Master: 10 courses → 750 XP
   - Course Champion: 20 courses → 1500 XP

3. **Quiz Achievements**

   - Quiz Champion: Pass 10 quizzes → 100 XP
   - Perfect Score: 5 perfect quizzes → 250 XP
   - Quiz Master: Pass 50 quizzes → 500 XP

4. **Speed Achievements**
   - Speed Learner: Complete course in 7 days → 200 XP
   - Lightning Fast: Complete course in 3 days → 500 XP

### Rarity Levels

- **Common**: 🟢 Standard achievements
- **Rare**: 🔵 Moderate difficulty
- **Epic**: 🟣 Challenging achievements
- **Legendary**: 🟠 Extremely rare achievements

---

## 🔗 Base URL

```
http://localhost:3000/api
```

---

## 📊 API Thống kê XP & Gamification (Mới thêm)

### 1. Thống kê tổng quan XP

**Endpoint:**

```
GET /api/xp/statistics/overview
```

**Trả về:** Tổng XP toàn hệ thống, tổng số user, tổng số achievement đã unlock, XP trung bình/user.
{
"success": true,
"message": "Lấy thống kê tổng quan XP thành công",
"data": {
"totalXP": 123456,
"totalUsers": 1200,
"totalAchievements": 25,
"avgXP": 102
}
}

### 2. Thống kê XP theo thời gian

**Endpoint:**

```
GET /api/xp/statistics/xp-by-period?startDate=...&endDate=...&groupBy=day|month|year
```

{
"success": true,
"message": "Lấy thống kê XP theo thời gian thành công",
"data": [
{ "period": "2025-12-01", "totalXP": 120 },
{ "period": "2025-12-02", "totalXP": 95 },
{ "period": "2025-12-03", "totalXP": 150 }
]
}

**Trả về:** XP cộng theo từng ngày/tháng/năm.

### 3. Top user có XP cao nhất

**Endpoint:**

```
GET /api/xp/statistics/top-users?limit=10
```

{
"success": true,
"message": "Lấy top user XP thành công",
"data": [
{
"rank": 1,
"userId": "uuid-1",
"userName": "Top Student",
"level": "Advanced",
"totalXP": 12500
},
{
"rank": 2,
"userId": "uuid-2",
"userName": "Second Place",
"level": "Intermediate",
"totalXP": 8300
}
]
}

**Trả về:** Danh sách user có XP cao nhất.

### 4. Thống kê XP theo khóa học

**Endpoint:**

```
GET /api/xp/statistics/course/:courseId
```

{
"success": true,
"message": "Lấy thống kê XP theo khóa học thành công",
"data": {
"courseId": "uuid-course",
"totalXP": 3200,
"count": 45
}
}

**Trả về:** Tổng XP đã cộng cho user khi hoàn thành khóa học đó.

### 5. Thống kê XP theo instructor

**Endpoint:**

```
GET /api/xp/statistics/instructor/:userId
```

{
"success": true,
"message": "Lấy thống kê XP theo instructor thành công",
"data": {
"instructorId": "uuid-instructor",
"totalXP": 9800,
"count": 120
}
}

**Trả về:** Tổng XP mà học viên của instructor này đã nhận.

### 1. Lấy Stats của User

**Endpoint:**

```http
GET /api/xp/stats
```

**Access:** Private (Requires authentication)

**Headers:**

```http
Authorization: Bearer {token}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy thống kê người dùng thành công",
  "data": {
    "userId": "uuid",
    "userName": "John Doe",
    "email": "john@example.com",
    "avatarURL": "https://...",
    "level": "Intermediate",
    "experiencePoints": 1350,
    "currentLevelXP": 350,
    "nextLevelXP": 4000,
    "levelProgress": 8.75,
    "totalCoursesCompleted": 3,
    "achievements": {
      "total": 13,
      "unlocked": 5,
      "list": [
        {
          "id": "uuid",
          "userId": "uuid",
          "achievementId": "uuid",
          "unlockedAt": "2025-12-04T10:00:00.000Z",
          "progress": 100,
          "achievement": {
            "achievementId": "uuid",
            "name": "First Steps",
            "description": "Hoàn thành bài học đầu tiên",
            "icon": "👶",
            "xpReward": 25,
            "category": "lesson",
            "rarity": "common"
          }
        }
      ]
    },
    "recentXP": [
      {
        "transactionId": "uuid",
        "userId": "uuid",
        "amount": 10,
        "source": "lesson_complete",
        "description": "Hoàn thành bài học",
        "courseId": "uuid",
        "lessonId": "uuid",
        "created_at": "2025-12-04T09:30:00.000Z"
      }
    ],
    "levelInfo": {
      "currentLevel": "Intermediate",
      "currentLevelMinXP": 1000,
      "currentLevelMaxXP": 5000,
      "nextLevel": "Advanced",
      "nextLevelMinXP": 5000,
      "currentLevelXP": 350,
      "nextLevelXP": 4000,
      "progress": 8.75,
      "title": "Intermediate",
      "perks": {
        "discount": 5,
        "badge": "⭐",
        "description": "Học viên trung cấp - Giảm giá 5%"
      }
    }
  }
}
```

**Use Case:**

- User dashboard hiển thị XP, level, progress bar
- Profile page với achievements
- Gamification UI elements

---

### 2. Lấy XP History

**Endpoint:**

```http
GET /api/xp/history?limit=50
```

**Access:** Private

**Headers:**

Authorization: Bearer {token}

````

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 50 | Số lượng records trả về |

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy lịch sử XP thành công",
  "data": [
    {
      "transactionId": "uuid",
      "userId": "uuid",
      "amount": 100,
      "source": "course_complete",
      "description": "Hoàn thành khóa học",
      "courseId": "uuid",
      "lessonId": null,
      "achievementId": null,
      "created_at": "2025-12-04T10:00:00.000Z"
    },
    {
      "transactionId": "uuid",
      "userId": "uuid",
      "amount": 10,
      "source": "lesson_complete",
      "description": "Hoàn thành bài học",
      "lessonId": "uuid",
      "created_at": "2025-12-04T09:30:00.000Z"
    }
  ]
}
````

- `lesson_complete` - Hoàn thành bài học
- `first_lesson` - Bài học đầu tiên
- `course_complete` - Hoàn thành khóa học
- `first_course` - Khóa học đầu tiên
- `quiz_pass` - Pass quiz
- `quiz_perfect` - Quiz điểm tuyệt đối
- `achievement` - Unlock achievement

---

### 3. Lấy Leaderboard

**Endpoint:**

```http
GET /api/xp/leaderboard?limit=10
```

**Access:** Public

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 10 | Top N users |

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy bảng xếp hạng thành công",
  "data": [
    {
      "rank": 1,
      "userId": "uuid",
      "userName": "Top Student",
      "email": "top@example.com",
      "avatarURL": "https://...",
      "level": "Advanced",
      "totalXP": 12500
    },
    {
      "rank": 2,
      "userId": "uuid",
      "userName": "Second Place",
      "level": "Intermediate",
      "totalXP": 8300
    }
  ]
}
```

**Use Case:**

- Leaderboard page hiển thị top learners
- Competitive gamification
- Motivate users to learn more

---

### 4. Lấy Tất Cả Achievements

**Endpoint:**

```http
GET /api/xp/achievements
```

**Access:** Public

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy danh sách thành tích thành công",
  "data": [
    {
      "achievementId": "uuid",
      "name": "First Steps",
      "description": "Hoàn thành bài học đầu tiên",
      "icon": "👶",
      "xpReward": 25,
      "category": "lesson",
      "requirement": {
        "type": "complete_lessons",
        "count": 1
      },
      "isActive": true,
      "rarity": "common",
      "created_at": "2025-12-04T00:00:00.000Z"
    }
  ]
}
```

**Achievement Requirements Types:**

- `complete_lessons` - Số lượng lessons hoàn thành
- `complete_courses` - Số lượng courses hoàn thành
- `pass_quizzes` - Số lượng quizzes pass
- `perfect_quizzes` - Số lượng quizzes đạt 100%
- `complete_course_fast` - Hoàn thành course nhanh

---

### 5. Lấy Achievements của User

**Endpoint:**

```http
GET /api/xp/my-achievements
```

**Access:** Private

**Headers:**

```http
Authorization: Bearer {token}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy thành tích của người dùng thành công",
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "achievementId": "uuid",
      "unlockedAt": "2025-12-04T10:00:00.000Z",
      "progress": 100,
      "created_at": "2025-12-04T10:00:00.000Z",
      "achievement": {
        "achievementId": "uuid",
        "name": "First Steps",
        "description": "Hoàn thành bài học đầu tiên",
        "icon": "👶",
        "xpReward": 25,
        "category": "lesson",
        "rarity": "common"
      }
    }
  ]
}
```

**Progress Field:**

- 100 = Achievement unlocked
- < 100 = In progress (future feature)

---

### 6. Lấy Public Stats của User Khác

**Endpoint:**

```http
GET /api/xp/users/:userId/stats
```

**Access:** Public

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| userId | UUID | Yes | ID của user |

**Response Success (200):**

```json
{
  "success": true,
  "message": "Lấy thống kê người dùng thành công",
  "data": {
    "userId": "uuid",
    "userName": "John Doe",
    "avatarURL": "https://...",
    "level": "Intermediate",
    "experiencePoints": 1350,
    "levelProgress": 8.75,
    "totalCoursesCompleted": 3,
    "achievements": {
      "total": 13,
      "unlocked": 5
    }
  }
}
```

**Notes:**

- Chỉ trả về thông tin public
- Không bao gồm email, XP history, achievement details

---

## 🔄 Integration Flow

### Flow 1: User Hoàn Thành Lesson

```
1. Frontend: POST /api/lessons/:lessonId/complete
   └─> Backend: LessonProgressService.completeLesson()
       ├─> Mark lesson completed
       ├─> ⭐ XPService.rewardLessonCompletion()
       │   ├─> Check đã nhận XP chưa
       │   ├─> Add XP (10 or 25 if first lesson)
       │   ├─> Calculate new level
       │   ├─> Update User level & XP
       │   └─> Check và unlock achievements
       └─> Return progress + XP reward

2. Response includes:
   {
     progress: {...},
     courseProgress: 46.5,
     xpReward: {
       xpAwarded: 10,
       totalXP: 1350,
       levelInfo: {...},
       leveledUp: false,
       currentLevel: "Intermediate"
     }
   }

3. Frontend hiển thị:
   - "✅ Hoàn thành bài học!"
   - "+10 XP" animation
   - Progress bar update
   - Level badge nếu leveledUp = true
   - Achievement notification nếu có
```

### Flow 2: User Level Up

```
1. User earn XP → Total XP = 1000
2. Backend calculate level:
   - Basic: 0-999 XP
   - Intermediate: 1000-4999 XP ⭐ (Current)
   - Advanced: 5000+ XP

3. Level changed: Basic → Intermediate
   leveledUp = true

4. Frontend hiển thị:
   - "🎉 Chúc mừng! Bạn đã lên Intermediate!"
   - "Unlock: 5% discount trên tất cả khóa học"
   - Badge animation ⭐

5. Update User profile:
   - Badge hiển thị ở profile
   - Discount áp dụng tự động khi mua khóa học
```

### Flow 3: Unlock Achievement

```
1. User complete 5 lessons
2. Backend check achievements:
   - Achievement "Beginner" requires 5 lessons
   - User has 5 completed lessons
   - Eligible = true

3. Unlock achievement:
   - Create UserAchievement record
   - Award 50 XP bonus
   - Add XP transaction

4. Response includes achievement unlock notification

5. Frontend hiển thị:
   - "🏆 Achievement Unlocked: Beginner!"
   - "+50 XP Bonus"
   - Achievement badge animation
```

---

## 🎨 Frontend Integration Examples

### React/TypeScript Example

```typescript
// types/gamification.ts
export interface UserStats {
  userId: string;
  userName: string;
  email: string;
  avatarURL: string | null;
  level: "Basic" | "Intermediate" | "Advanced";
  experiencePoints: number;
  currentLevelXP: number;
  nextLevelXP: number;
  levelProgress: number;
  totalCoursesCompleted: number;
  achievements: {
    total: number;
    unlocked: number;
    list: UserAchievement[];
  };
  recentXP: XPTransaction[];
  levelInfo: LevelInfo;
}

export interface LevelInfo {
  currentLevel: string;
  nextLevel: string | null;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number;
  title: string;
  perks: {
    discount: number;
    badge: string;
    description: string;
  };
}

// services/gamificationService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const gamificationService = {
  async getUserStats() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API_BASE_URL}/xp/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  },

  async getXPHistory(limit: number = 50) {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${API_BASE_URL}/xp/history?limit=${limit}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data.data;
  },

  async getLeaderboard(limit: number = 10) {
    const { data } = await axios.get(
      `${API_BASE_URL}/xp/leaderboard?limit=${limit}`
    );
    return data.data;
  },

  async getAllAchievements() {
    const { data } = await axios.get(`${API_BASE_URL}/xp/achievements`);
    return data.data;
  },

  async getMyAchievements() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API_BASE_URL}/xp/my-achievements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  },

  async getPublicUserStats(userId: string) {
    const { data } = await axios.get(
      `${API_BASE_URL}/xp/users/${userId}/stats`
    );
    return data.data;
  },
};

// components/UserStatsCard.tsx
import React, { useEffect, useState } from "react";
import { gamificationService } from "../services/gamificationService";
import type { UserStats } from "../types/gamification";

const UserStatsCard: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await gamificationService.getUserStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!stats) return null;

  return (
    <div className="stats-card">
      <div className="user-header">
        <img
          src={stats.avatarURL || "/default-avatar.png"}
          alt={stats.userName}
        />
        <h2>{stats.userName}</h2>
        <span className="level-badge">
          {stats.levelInfo.perks.badge} {stats.level}
        </span>
      </div>

      <div className="xp-section">
        <h3>Experience Points</h3>
        <p className="xp-total">{stats.experiencePoints.toLocaleString()} XP</p>

        <div className="level-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.levelProgress}%` }}
            />
          </div>
          <p className="progress-text">
            {stats.currentLevelXP} / {stats.nextLevelXP} XP to{" "}
            {stats.levelInfo.nextLevel || "Max Level"}
          </p>
        </div>

        {stats.levelInfo.perks.discount > 0 && (
          <div className="perks">
            <p>🎁 {stats.levelInfo.perks.description}</p>
          </div>
        )}
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <p>
          {stats.achievements.unlocked} / {stats.achievements.total} unlocked
        </p>
        <div className="achievement-grid">
          {stats.achievements.list.map((achievement) => (
            <div key={achievement.id} className="achievement-badge">
              <span className="achievement-icon">
                {achievement.achievement.icon}
              </span>
              <p>{achievement.achievement.name}</p>
              {achievement.progress === 100 && (
                <span className="unlocked">✅</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-value">{stats.totalCoursesCompleted}</span>
          <span className="stat-label">Courses Completed</span>
        </div>
      </div>
    </div>
  );
};

// components/XPNotification.tsx
import React, { useEffect, useState } from "react";

interface XPNotificationProps {
  xpAwarded: number;
  description?: string;
  leveledUp?: boolean;
  newLevel?: string;
  achievementUnlocked?: {
    name: string;
    icon: string;
  };
}

const XPNotification: React.FC<XPNotificationProps> = ({
  xpAwarded,
  description,
  leveledUp,
  newLevel,
  achievementUnlocked,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="xp-notification">
      <div className="xp-reward">
        <span className="xp-amount">+{xpAwarded} XP</span>
        {description && <p>{description}</p>}
      </div>

      {leveledUp && newLevel && (
        <div className="level-up-notification">
          <h3>🎉 Level Up!</h3>
          <p>You reached {newLevel}!</p>
        </div>
      )}

      {achievementUnlocked && (
        <div className="achievement-notification">
          <span className="achievement-icon">{achievementUnlocked.icon}</span>
          <h3>🏆 Achievement Unlocked!</h3>
          <p>{achievementUnlocked.name}</p>
        </div>
      )}
    </div>
  );
};

// components/Leaderboard.tsx
import React, { useEffect, useState } from "react";
import { gamificationService } from "../services/gamificationService";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await gamificationService.getLeaderboard(10);
      setLeaderboard(data);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="leaderboard">
      <h2>🏆 Top Learners</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Level</th>
            <th>Total XP</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user.userId} className={`rank-${user.rank}`}>
              <td>
                {user.rank === 1 && "🥇"}
                {user.rank === 2 && "🥈"}
                {user.rank === 3 && "🥉"}
                {user.rank > 3 && user.rank}
              </td>
              <td>
                <div className="user-info">
                  <img
                    src={user.avatarURL || "/default.png"}
                    alt={user.userName}
                  />
                  <span>{user.userName}</span>
                </div>
              </td>
              <td>{user.level}</td>
              <td>{user.totalXP.toLocaleString()} XP</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { UserStatsCard, XPNotification, Leaderboard };
```

---

## 📊 Database Schema

```prisma
model User {
  // ... existing fields

  // ⭐ Gamification Fields
  experiencePoints      Int @default(0)
  currentLevelXP        Int @default(0)
  nextLevelXP           Int @default(100)
  totalCoursesCompleted Int @default(0)

  xpTransactions        XPTransaction[]
  achievements          UserAchievement[]
}

model XPTransaction {
  transactionId   String @id @default(uuid())
  userId          String
  amount          Int
  source          String
  description     String?
  courseId        String?
  lessonId        String?
  achievementId   String?
  metadata        Json?
  created_at      DateTime @default(now())

  user            User @relation(...)
}

model Achievement {
  achievementId   String @id @default(uuid())
  name            String @unique
  description     String
  icon            String?
  xpReward        Int @default(0)
  category        String
  requirement     Json
  isActive        Boolean @default(true)
  rarity          String @default("common")

  userAchievements UserAchievement[]
}

model UserAchievement {
  id              String @id @default(uuid())
  userId          String
  achievementId   String
  unlockedAt      DateTime @default(now())
  progress        Float @default(100)

  user            User @relation(...)
  achievement     Achievement @relation(...)

  @@unique([userId, achievementId])
}

model LevelRequirement {
  id              String @id @default(uuid())
  level           Level
  minXP           Int
  maxXP           Int?
  title           String?
  perks           Json?

  @@unique([level])
}
```

---

## ⚠️ Important Notes

### 1. XP Awards

- XP chỉ thưởng **1 lần** cho mỗi lesson/course
- Backend check `hasReceivedXP()` trước khi award
- Nếu đã nhận XP → Skip và return message

### 2. Level Calculation

- Level tính **động** dựa trên tổng XP
- Không lưu trực tiếp trong database
- Tự động update mỗi khi add XP

### 3. Achievement Unlocking

- Tự động check sau mỗi lần add XP
- Unlock khi đạt requirement
- Thưởng thêm XP từ `achievement.xpReward`

### 4. Discount Perks

- Level Intermediate: 5% discount
- Level Advanced: 10% discount
- Frontend apply discount khi checkout

---

## 🚀 Quick Start

### Backend Setup

```bash
# 1. Run migrations
npx prisma db push

# 2. Seed gamification data
npx tsx src/scripts/seed-gamification.ts

# 3. Start server
npm run dev
```

### Frontend Integration

```typescript
// 1. Complete lesson with XP reward
const result = await lessonService.completeLesson(lessonId);
if (result.xpReward) {
  showXPNotification(result.xpReward);
}

// 2. Display user stats
const stats = await gamificationService.getUserStats();
renderStatsCard(stats);

// 3. Show leaderboard
const leaderboard = await gamificationService.getLeaderboard();
renderLeaderboard(leaderboard);
```

---

## 📞 Support

Test endpoints:

```bash
# Get user stats
GET http://localhost:3000/api/xp/stats

# Get leaderboard
GET http://localhost:3000/api/xp/leaderboard

# Get achievements
GET http://localhost:3000/api/xp/achievements
```

Nếu trả về 200 OK → API hoạt động bình thường ✅
