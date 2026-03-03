# 🏷️ TAG & CATEGORY API DOCUMENTATION

> **Date**: 07/12/2025  
> **Feature**: Tag & Category Management API  
> **Version**: 1.0.0

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Tag API](#tag-api)
3. [Category API](#category-api)
4. [Use Cases](#use-cases)
5. [Examples](#examples)
6. [Best Practices](#best-practices)

---

## 1. OVERVIEW

### 🎯 Purpose

Hệ thống quản lý **Tags** và **Categories** cho website học lập trình CNTT:

- **Tags**: Từ khóa công nghệ (nodejs, react, python, etc.)
- **Categories**: Danh mục blog (Tutorial, News, Best Practices, etc.)

### 🌟 Features

#### Tags
✅ Shared cho cả Course và Blog  
✅ Type classification (COURSE, BLOG, GENERAL)  
✅ Usage count tracking  
✅ Search & autocomplete  
✅ Popular tags  

#### Categories
✅ Hierarchy support (parent-child)  
✅ Post count tracking  
✅ Order management  
✅ Popular categories  

---

## 2. TAG API

### 📊 Base URL
```
/api/tags
```

---

### 2.1. GET All Tags

**Endpoint**: `GET /api/tags`

**Description**: Lấy tất cả tags (có thể filter theo type)

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | No | Filter theo type: `COURSE`, `BLOG`, `GENERAL` |

**Request**:
```bash
GET /api/tags
GET /api/tags?type=COURSE
GET /api/tags?type=GENERAL
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Danh sách tags",
  "data": [
    {
      "tagId": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Node.js",
      "slug": "nodejs",
      "description": "JavaScript runtime cho backend",
      "icon": "🟢",
      "color": "#339933",
      "type": "GENERAL",
      "usageCount": 45,
      "courseCount": 23,
      "blogCount": 22,
      "created_at": "2025-12-07T10:00:00.000Z",
      "updated_at": "2025-12-07T10:00:00.000Z"
    }
  ]
}
```

---

### 2.2. GET Popular Tags

**Endpoint**: `GET /api/tags/popular`

**Description**: Lấy tags phổ biến nhất (theo usageCount)

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 10 | Số lượng tags |
| type | string | No | - | Filter theo type |

**Request**:
```bash
GET /api/tags/popular
GET /api/tags/popular?limit=20
GET /api/tags/popular?limit=10&type=COURSE
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Tags phổ biến",
  "data": [
    {
      "tagId": "...",
      "name": "JavaScript",
      "slug": "javascript",
      "usageCount": 150,
      "courseCount": 80,
      "blogCount": 70,
      "color": "#F7DF1E",
      "icon": "🟨"
    },
    {
      "tagId": "...",
      "name": "Python",
      "slug": "python",
      "usageCount": 120,
      "courseCount": 65,
      "blogCount": 55,
      "color": "#3776AB",
      "icon": "🐍"
    }
  ]
}
```

---

### 2.3. Search Tags

**Endpoint**: `GET /api/tags/search`

**Description**: Tìm kiếm tags theo tên, slug, hoặc description

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | **Yes** | Search query |
| limit | number | No | Số lượng kết quả (default: 10) |

**Request**:
```bash
GET /api/tags/search?q=node
GET /api/tags/search?q=javascript&limit=5
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Kết quả tìm kiếm",
  "data": [
    {
      "tagId": "...",
      "name": "Node.js",
      "slug": "nodejs",
      "description": "JavaScript runtime cho backend",
      "usageCount": 45
    },
    {
      "tagId": "...",
      "name": "NestJS",
      "slug": "nestjs",
      "description": "Progressive Node.js framework",
      "usageCount": 28
    }
  ]
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Query parameter 'q' is required"
}
```

---

### 2.4. GET Tag by ID

**Endpoint**: `GET /api/tags/:tagId`

**Description**: Lấy thông tin chi tiết tag theo ID

**Request**:
```bash
GET /api/tags/550e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Thông tin tag",
  "data": {
    "tagId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Node.js",
    "slug": "nodejs",
    "description": "JavaScript runtime cho backend",
    "icon": "🟢",
    "color": "#339933",
    "type": "GENERAL",
    "usageCount": 45,
    "courseCount": 23,
    "blogCount": 22,
    "metaTitle": "Node.js - JavaScript Runtime",
    "metaDescription": "Learn Node.js backend development",
    "created_at": "2025-12-07T10:00:00.000Z",
    "updated_at": "2025-12-07T10:00:00.000Z"
  }
}
```

**Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Không tìm thấy tag"
}
```

---

### 2.5. GET Tag by Slug

**Endpoint**: `GET /api/tags/slug/:slug`

**Description**: Lấy tag theo slug (URL-friendly)

**Request**:
```bash
GET /api/tags/slug/nodejs
GET /api/tags/slug/react
```

**Response**: Same as GET by ID

---

### 2.6. CREATE Tag

**Endpoint**: `POST /api/tags`

**Description**: Tạo tag mới (Admin only)

**Request Body**:
```json
{
  "name": "Node.js",
  "description": "JavaScript runtime cho backend",
  "icon": "🟢",
  "color": "#339933",
  "type": "GENERAL"
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | **Yes** | Tên tag (unique) |
| description | string | No | Mô tả tag |
| icon | string | No | Icon/emoji |
| color | string | No | Màu sắc (hex code) |
| type | enum | No | `COURSE`, `BLOG`, `GENERAL` (default: GENERAL) |

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Tạo tag thành công",
  "data": {
    "tagId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Node.js",
    "slug": "nodejs",
    "description": "JavaScript runtime cho backend",
    "icon": "🟢",
    "color": "#339933",
    "type": "GENERAL",
    "usageCount": 0,
    "courseCount": 0,
    "blogCount": 0,
    "created_at": "2025-12-07T10:00:00.000Z"
  }
}
```

**Notes**:
- Slug được tự động generate từ name
- Hỗ trợ tiếng Việt có dấu (auto convert)
- Name phải unique

---

### 2.7. UPDATE Tag

**Endpoint**: `PUT /api/tags/:tagId`

**Description**: Cập nhật tag (Admin only)

**Request Body**:
```json
{
  "name": "Node.js Updated",
  "description": "Updated description",
  "icon": "🚀",
  "color": "#339933",
  "type": "COURSE"
}
```

**Notes**:
- Tất cả fields đều optional
- Nếu update `name`, slug sẽ được tự động regenerate
- Không thể update `usageCount`, `courseCount`, `blogCount` (auto-managed)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Cập nhật tag thành công",
  "data": {
    "tagId": "...",
    "name": "Node.js Updated",
    "slug": "nodejs-updated",
    "description": "Updated description",
    "icon": "🚀",
    "updated_at": "2025-12-07T11:00:00.000Z"
  }
}
```

---

### 2.8. DELETE Tag

**Endpoint**: `DELETE /api/tags/:tagId`

**Description**: Xóa tag (Admin only)

**Request**:
```bash
DELETE /api/tags/550e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Xóa tag thành công",
  "data": null
}
```

**Notes**:
- Cascade delete: Tất cả `CourseTag` và `BlogPostTag` liên quan sẽ bị xóa
- Không thể undo sau khi xóa

---

## 3. CATEGORY API

### 📊 Base URL
```
/api/categories
```

---

### 3.1. GET All Categories

**Endpoint**: `GET /api/categories`

**Description**: Lấy tất cả categories (flat list)

**Request**:
```bash
GET /api/categories
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Danh sách categories",
  "data": [
    {
      "categoryId": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Tutorial",
      "slug": "tutorial",
      "description": "Hướng dẫn từng bước",
      "icon": "📚",
      "color": "#3B82F6",
      "coverImage": "https://example.com/tutorial.jpg",
      "parentId": null,
      "orderIndex": 1,
      "postCount": 45,
      "created_at": "2025-12-07T10:00:00.000Z"
    },
    {
      "categoryId": "...",
      "name": "Advanced Tutorial",
      "slug": "advanced-tutorial",
      "parentId": "650e8400-e29b-41d4-a716-446655440000",
      "orderIndex": 1,
      "postCount": 12
    }
  ]
}
```

---

### 3.2. GET Root Categories

**Endpoint**: `GET /api/categories/root`

**Description**: Lấy root categories với hierarchy (parent-child structure)

**Request**:
```bash
GET /api/categories/root
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Danh sách root categories",
  "data": [
    {
      "categoryId": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Tutorial",
      "slug": "tutorial",
      "parentId": null,
      "orderIndex": 1,
      "postCount": 45,
      "children": [
        {
          "categoryId": "...",
          "name": "Beginner Tutorial",
          "slug": "beginner-tutorial",
          "parentId": "650e8400-e29b-41d4-a716-446655440000",
          "orderIndex": 1,
          "postCount": 20
        },
        {
          "categoryId": "...",
          "name": "Advanced Tutorial",
          "slug": "advanced-tutorial",
          "parentId": "650e8400-e29b-41d4-a716-446655440000",
          "orderIndex": 2,
          "postCount": 25
        }
      ]
    }
  ]
}
```

---

### 3.3. GET Popular Categories

**Endpoint**: `GET /api/categories/popular`

**Description**: Lấy categories phổ biến (theo postCount)

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 10 | Số lượng categories |

**Request**:
```bash
GET /api/categories/popular
GET /api/categories/popular?limit=5
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Categories phổ biến",
  "data": [
    {
      "categoryId": "...",
      "name": "Tutorial",
      "slug": "tutorial",
      "postCount": 45,
      "icon": "📚",
      "color": "#3B82F6"
    },
    {
      "categoryId": "...",
      "name": "Best Practices",
      "slug": "best-practices",
      "postCount": 38,
      "icon": "⭐",
      "color": "#10B981"
    }
  ]
}
```

---

### 3.4. GET Category by ID

**Endpoint**: `GET /api/categories/:categoryId`

**Description**: Lấy thông tin chi tiết category

**Request**:
```bash
GET /api/categories/650e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Thông tin category",
  "data": {
    "categoryId": "650e8400-e29b-41d4-a716-446655440000",
    "name": "Tutorial",
    "slug": "tutorial",
    "description": "Hướng dẫn từng bước chi tiết",
    "icon": "📚",
    "color": "#3B82F6",
    "coverImage": "https://example.com/tutorial.jpg",
    "parentId": null,
    "orderIndex": 1,
    "postCount": 45,
    "metaTitle": "Tutorial - Learn Programming",
    "metaDescription": "Step-by-step programming tutorials",
    "parent": null,
    "children": [
      {
        "categoryId": "...",
        "name": "Beginner Tutorial",
        "slug": "beginner-tutorial"
      }
    ],
    "created_at": "2025-12-07T10:00:00.000Z"
  }
}
```

---

### 3.5. GET Category by Slug

**Endpoint**: `GET /api/categories/slug/:slug`

**Description**: Lấy category theo slug

**Request**:
```bash
GET /api/categories/slug/tutorial
GET /api/categories/slug/best-practices
```

**Response**: Same as GET by ID

---

### 3.6. GET Category Children

**Endpoint**: `GET /api/categories/:categoryId/children`

**Description**: Lấy tất cả children của một category

**Request**:
```bash
GET /api/categories/650e8400-e29b-41d4-a716-446655440000/children
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Danh sách children",
  "data": [
    {
      "categoryId": "...",
      "name": "Beginner Tutorial",
      "slug": "beginner-tutorial",
      "parentId": "650e8400-e29b-41d4-a716-446655440000",
      "orderIndex": 1,
      "postCount": 20
    },
    {
      "categoryId": "...",
      "name": "Advanced Tutorial",
      "slug": "advanced-tutorial",
      "parentId": "650e8400-e29b-41d4-a716-446655440000",
      "orderIndex": 2,
      "postCount": 25
    }
  ]
}
```

---

### 3.7. CREATE Category

**Endpoint**: `POST /api/categories`

**Description**: Tạo category mới (Admin only)

**Request Body**:
```json
{
  "name": "Tutorial",
  "description": "Hướng dẫn từng bước",
  "icon": "📚",
  "color": "#3B82F6",
  "coverImage": "https://example.com/tutorial.jpg",
  "parentId": null,
  "orderIndex": 1
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | **Yes** | Tên category (unique) |
| description | string | No | Mô tả category |
| icon | string | No | Icon/emoji |
| color | string | No | Màu sắc (hex code) |
| coverImage | string | No | URL ảnh cover |
| parentId | string | No | ID của category cha (null = root) |
| orderIndex | number | No | Thứ tự hiển thị (default: 0) |

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Tạo category thành công",
  "data": {
    "categoryId": "650e8400-e29b-41d4-a716-446655440000",
    "name": "Tutorial",
    "slug": "tutorial",
    "description": "Hướng dẫn từng bước",
    "icon": "📚",
    "color": "#3B82F6",
    "parentId": null,
    "orderIndex": 1,
    "postCount": 0,
    "created_at": "2025-12-07T10:00:00.000Z"
  }
}
```

**Example - Create Child Category**:
```json
{
  "name": "Advanced Tutorial",
  "description": "Hướng dẫn nâng cao",
  "icon": "🚀",
  "color": "#8B5CF6",
  "parentId": "650e8400-e29b-41d4-a716-446655440000",
  "orderIndex": 2
}
```

---

### 3.8. UPDATE Category

**Endpoint**: `PUT /api/categories/:categoryId`

**Description**: Cập nhật category (Admin only)

**Request Body**:
```json
{
  "name": "Tutorial Updated",
  "description": "Updated description",
  "icon": "📖",
  "color": "#3B82F6",
  "orderIndex": 2
}
```

**Notes**:
- Tất cả fields đều optional
- Có thể thay đổi `parentId` để move category
- Không thể update `postCount` (auto-managed)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Cập nhật category thành công",
  "data": {
    "categoryId": "...",
    "name": "Tutorial Updated",
    "slug": "tutorial-updated",
    "updated_at": "2025-12-07T11:00:00.000Z"
  }
}
```

---

### 3.9. DELETE Category

**Endpoint**: `DELETE /api/categories/:categoryId`

**Description**: Xóa category (Admin only)

**Request**:
```bash
DELETE /api/categories/650e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Xóa category thành công",
  "data": null
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Không thể xóa category có children. Vui lòng xóa children trước."
}
```

**Notes**:
- Không thể xóa category có children
- Phải xóa children trước, hoặc move children sang category khác
- Cascade delete: Tất cả `BlogPostCategory` liên quan sẽ bị xóa

---

## 4. USE CASES

### 4.1. Tạo Tag cho Course

```bash
# 1. Tạo tag
POST /api/tags
{
  "name": "Node.js",
  "type": "COURSE",
  "color": "#339933"
}

# 2. Gắn tag cho course (trong course creation)
POST /api/courses
{
  "courseName": "Node.js Backend Development",
  "tagIds": ["tag-id-here"]
}
```

---

### 4.2. Tạo Category Hierarchy

```bash
# 1. Tạo parent category
POST /api/categories
{
  "name": "Tutorial",
  "orderIndex": 1
}
# Response: categoryId = "parent-id"

# 2. Tạo child category
POST /api/categories
{
  "name": "Beginner Tutorial",
  "parentId": "parent-id",
  "orderIndex": 1
}

# 3. Tạo child category khác
POST /api/categories
{
  "name": "Advanced Tutorial",
  "parentId": "parent-id",
  "orderIndex": 2
}

# 4. Lấy hierarchy
GET /api/categories/root
```

---

### 4.3. Search & Autocomplete

```bash
# User gõ "node" trong search box
GET /api/tags/search?q=node&limit=5

# Response:
# - Node.js
# - NestJS
# - Node-RED
# - etc.
```

---

### 4.4. Display Tag Cloud

```bash
# Lấy 20 tags phổ biến nhất
GET /api/tags/popular?limit=20

# Hiển thị với size dựa trên usageCount
# Font size = base + (usageCount / maxUsageCount) * scale
```

---

## 5. EXAMPLES

### 5.1. Complete Tag Workflow

```bash
# 1. Tạo tag
curl -X POST http://localhost:3000/api/tags \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "description": "JavaScript library for UI",
    "icon": "⚛️",
    "color": "#61DAFB",
    "type": "GENERAL"
  }'

# 2. Search tag
curl "http://localhost:3000/api/tags/search?q=react"

# 3. Get tag by slug
curl http://localhost:3000/api/tags/slug/react

# 4. Update tag
curl -X PUT http://localhost:3000/api/tags/{tagId} \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description"
  }'

# 5. Get popular tags
curl "http://localhost:3000/api/tags/popular?limit=10"
```

---

### 5.2. Complete Category Workflow

```bash
# 1. Tạo root category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tutorial",
    "description": "Step-by-step guides",
    "icon": "📚",
    "color": "#3B82F6",
    "orderIndex": 1
  }'

# 2. Tạo child category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beginner Tutorial",
    "parentId": "{parent-category-id}",
    "orderIndex": 1
  }'

# 3. Get root categories with hierarchy
curl http://localhost:3000/api/categories/root

# 4. Get children
curl http://localhost:3000/api/categories/{categoryId}/children

# 5. Get popular categories
curl "http://localhost:3000/api/categories/popular?limit=5"
```

---

## 6. BEST PRACTICES

### 6.1. Tag Naming

✅ **DO**:
- Use consistent naming: "Node.js", "React", "Python"
- Use proper capitalization
- Keep names short and clear

❌ **DON'T**:
- Use inconsistent names: "nodejs", "NodeJS", "Node.js"
- Use very long names
- Use special characters (except . - _)

---

### 6.2. Category Hierarchy

✅ **DO**:
- Keep hierarchy shallow (max 2-3 levels)
- Use meaningful orderIndex
- Group related categories

❌ **DON'T**:
- Create too deep hierarchy (> 3 levels)
- Forget to set orderIndex
- Create too many root categories

---

### 6.3. Slug Generation

Slug được tự động generate từ name:
- Lowercase
- Remove diacritics (tiếng Việt có dấu)
- Replace spaces with `-`
- Remove special characters

**Examples**:
- "Node.js" → "nodejs"
- "Hướng dẫn React" → "huong-dan-react"
- "Best Practices" → "best-practices"

---

### 6.4. Color Codes

Sử dụng hex color codes:
- JavaScript: `#F7DF1E`
- Python: `#3776AB`
- React: `#61DAFB`
- Node.js: `#339933`

---

### 6.5. Icons

Sử dụng emoji hoặc icon URLs:
- Emoji: `🟢`, `⚛️`, `🐍`, `📚`
- Icon URL: `https://cdn.example.com/nodejs.svg`

---

## 7. ERROR HANDLING

### Common Errors

**400 Bad Request**:
```json
{
  "success": false,
  "message": "Query parameter 'q' is required"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Không tìm thấy tag"
}
```

**409 Conflict**:
```json
{
  "success": false,
  "message": "Tag với slug 'nodejs' đã tồn tại"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 8. SUMMARY

### Tag API (8 endpoints)
```
GET    /api/tags
GET    /api/tags/popular
GET    /api/tags/search
GET    /api/tags/:tagId
GET    /api/tags/slug/:slug
POST   /api/tags
PUT    /api/tags/:tagId
DELETE /api/tags/:tagId
```

### Category API (9 endpoints)
```
GET    /api/categories
GET    /api/categories/root
GET    /api/categories/popular
GET    /api/categories/:categoryId
GET    /api/categories/slug/:slug
GET    /api/categories/:categoryId/children
POST   /api/categories
PUT    /api/categories/:categoryId
DELETE /api/categories/:categoryId
```

**Total**: **17 API endpoints** ✅

---

**Happy Coding! 🚀**
