import axios from "axios";

const API_URL = "http://localhost:3000/api/comments";

export interface Comment {
    commentId: string;
    courseId: string;
    userId: string;
    content: string;
    rating?: number;
    createdAt: string;
    updatedAt: string;
    user: {
        userId: string;
        userName: string;
        avatarURL?: string;
    };
}

export interface CreateCommentDto {
    courseId: string;
    content: string;
    rating?: number;
}

export interface UpdateCommentDto {
    content?: string;
    rating?: number;
}

export interface CourseRating {
    averageRating: number;
    totalComments: number;
}

class CommentService {
    // Lấy tất cả comments của khóa học (Public)
    async getCommentsByCourse(courseId: string): Promise<Comment[]> {
        const response = await axios.get(`${API_URL}/course/${courseId}`);
        return response.data.data;
    }

    // Lấy rating trung bình của khóa học (Public)
    async getCourseRating(courseId: string): Promise<CourseRating> {
        const response = await axios.get(`${API_URL}/course/${courseId}/rating`);
        return response.data.data;
    }

    // Lấy comments của user hiện tại (Private)
    async getMyComments(): Promise<Comment[]> {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/my-comments`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    }

    // Tạo comment mới (Private)
    async createComment(data: CreateCommentDto): Promise<Comment> {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    }

    // Cập nhật comment (Private - Owner only)
    async updateComment(
        commentId: string,
        data: UpdateCommentDto
    ): Promise<Comment> {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/${commentId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    }

    // Xóa comment (Private - Owner only)
    async deleteComment(commentId: string): Promise<void> {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export const commentService = new CommentService();
