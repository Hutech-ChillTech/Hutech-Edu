# ✅ NEW FEATURE: Filter Blog Posts by Tag & Category

## 🎉 Tính năng mới

Đã thêm khả năng **filter blog posts theo Tag và Category** vào API!

---

## 📡 Backend Changes

### 1. **Blog Service** (`src/services/blog.service.ts`)

Thêm 2 parameters mới vào `getAllPosts()`:

```typescript
async getAllPosts(
  page: number = 1,
  limit: number = 10,
  search?: string,
  authorId?: string,
  status?: BlogStatus,
  tagId?: string,        // ⭐ NEW
  categoryId?: string    // ⭐ NEW
)
```

**Filter logic:**
```typescript
// Filter by tag
if (tagId) {
  where.tags = {
    some: { tagId: tagId }
  };
}

// Filter by category
if (categoryId) {
  where.categories = {
    some: { categoryId: categoryId }
  };
}
```

### 2. **Blog Controller** (`src/controllers/blog.controller.ts`)

Extract query params:
```typescript
const tagId = req.query.tagId as string;
const categoryId = req.query.categoryId as string;
```

---

## 🌐 API Endpoints

### Get Blog Posts với Filters

**Endpoint:** `GET /api/blog-posts`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Số trang | `1` |
| `limit` | number | Số items/trang | `10` |
| `search` | string | Tìm kiếm text | `react` |
| `authorId` | UUID | Filter theo tác giả | `uuid...` |
| `status` | BlogStatus | DRAFT, PUBLISHED, etc | `PUBLISHED` |
| **`tagId`** | **UUID** | **⭐ Filter theo tag** | **`uuid...`** |
| **`categoryId`** | **UUID** | **⭐ Filter theo category** | **`uuid...`** |

---

## 📝 Usage Examples

### 1. Lấy tất cả posts của một tag

```http
GET /api/blog-posts?tagId=658a22dc-d945-4922-bfa5-5331a6e4bede&page=1&limit=10
```

**Response:**
```json
{
  "posts": [
    {
      "blogPostId": "...",
      "title": "React Performance Tips",
      "tags": [
        {
          "tag": {
            "tagId": "658a22dc-d945-4922-bfa5-5331a6e4bede",
            "name": "React",
            "slug": "react"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 2. Lấy tất cả posts của một category

```http
GET /api/blog-posts?categoryId=87d96c69-2283-49ae-bcea-88b0c726cf76&page=1&limit=10
```

### 3. Combine filters

```http
GET /api/blog-posts?tagId=<tag_uuid>&categoryId=<category_uuid>&status=PUBLISHED&search=optimization
```

---

## 💻 Frontend Integration

### TypeScript Interface

```typescript
interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  authorId?: string;
  status?: BlogStatus;
  tagId?: string;        // ⭐ NEW
  categoryId?: string;   // ⭐ NEW
}
```

### Service Function

```typescript
export const blogService = {
  getAllPosts: async (params?: GetBlogPostsParams) => {
    const response = await api.get('/blog-posts', { params });
    return response.data;
  }
};
```

### Custom Hooks

```typescript
// Filter by tag
export const useBlogPostsByTag = (tagId: string, page = 1, limit = 10) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tagId) return;
    
    blogService.getAllPosts({ tagId, page, limit })
      .then((response) => setPosts(response.posts))
      .finally(() => setLoading(false));
  }, [tagId, page, limit]);

  return { posts, loading };
};

// Filter by category
export const useBlogPostsByCategory = (categoryId: string, page = 1, limit = 10) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    
    blogService.getAllPosts({ categoryId, page, limit })
      .then((response) => setPosts(response.posts))
      .finally(() => setLoading(false));
  }, [categoryId, page, limit]);

  return { posts, loading };
};
```

### Example Component

```typescript
// Tag Page
const TagPage = () => {
  const { slug } = useParams();
  const { tag } = useTagBySlug(slug);
  const { posts, loading } = useBlogPostsByTag(tag?.tagId);

  return (
    <div>
      <h1>Posts tagged with "{tag?.name}"</h1>
      {posts.map(post => (
        <article key={post.blogPostId}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
};
```

---

## 🎯 Use Cases

### 1. **Tag Cloud / Tag Page**
- Click vào tag → Hiển thị tất cả posts có tag đó
- URL: `/tags/react` → Filter posts by React tag

### 2. **Category Navigation**
- Click vào category trong menu → Hiển thị posts thuộc category
- URL: `/category/tutorials` → Filter posts by Tutorials category

### 3. **Advanced Search**
- Combine tag + category + search + status
- Example: "Tìm tất cả bài PUBLISHED về React trong category Frontend"

### 4. **Related Posts**
- Hiển thị posts cùng tag hoặc cùng category
- "More posts like this"

---

## 📚 Updated Documentation

Các file đã được cập nhật:

1. ✅ **`BLOG_TAG_CATEGORY_API.md`**
   - Thêm `tagId` và `categoryId` vào Query Parameters table
   - Thêm examples trong Advanced Queries section

2. ✅ **`FRONTEND_BLOG_API_GUIDE.md`**
   - Cập nhật TypeScript interfaces
   - Thêm custom hooks: `useBlogPostsByTag`, `useBlogPostsByCategory`
   - Thêm example components: TagPage, CategoryPage, BlogFilters

3. ✅ **Backend Code**
   - `src/services/blog.service.ts` - Filter logic
   - `src/controllers/blog.controller.ts` - Query params extraction

---

## ✅ Testing

### Test với Postman/Thunder Client

1. **Get all posts with tag:**
```
GET http://localhost:3000/api/blog-posts?tagId=<tag_uuid>
```

2. **Get all posts with category:**
```
GET http://localhost:3000/api/blog-posts?categoryId=<category_uuid>
```

3. **Combine filters:**
```
GET http://localhost:3000/api/blog-posts?tagId=<tag_uuid>&categoryId=<category_uuid>&status=PUBLISHED
```

### Expected Response
```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

## 🚀 Next Steps

Frontend developers có thể:

1. ✅ Implement Tag Page (`/tags/:slug`)
2. ✅ Implement Category Page (`/categories/:slug`)
3. ✅ Add filter dropdowns vào Blog List page
4. ✅ Create "Related Posts" widget
5. ✅ Build advanced search với multiple filters

Tất cả code examples đã có sẵn trong `FRONTEND_BLOG_API_GUIDE.md`! 🎉
