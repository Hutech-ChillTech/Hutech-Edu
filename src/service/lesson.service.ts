
import { type Lesson } from '../types/database.types';

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const lessonService = {

    getAllLessons: async (): Promise<Lesson[]> => {
        try {
            const res = await fetch(`${API_URL}/lessons`, {
                method: "GET",
                headers: getAuthHeaders(),
                body: null,
            });
            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể lấy tất cả bài học.");
            }

            return data.data || data as Lesson[];

        } catch (error) {
            console.error("Error fetching lessons:", error);
            throw error;
        }
    },

    getLessonByChapterId: async (chapterId: string): Promise<Lesson[]> => {
        try {
            if (!chapterId) {
                console.warn('LessonList: missing chapterId');
                return [];
            }

            const res = await fetch(`${API_URL}/lessons/chapter/${chapterId}`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            // 1. Kiểm tra lỗi 401 trước (Unauthorized)
            if (res.status === 401) {
                throw new Error("Unauthorized");
            }

            // 2. Kiểm tra 204 (No Content) TRƯỚC KHI parse JSON
            if (res.status === 204) {
                console.info('LessonList: server returned 204 No Content');
                return [];
            }

            // 3. Kiểm tra các lỗi HTTP khác (400, 404, 500...)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            const result = data.data || data;
            return Array.isArray(result) ? result : [];

        } catch (error) {
            console.error("Error fetching lessons by chapter ID:", error);
            throw error;
        }
    },
    getTestCaseByLessonId: async (lessonId: string): Promise<Lesson[]> => {
        try {
            const res = await fetch(`${API_URL}/lessons/testcase/${lessonId}`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }

            if (res.status === 204) {
                console.info('Tescase List: server returned 204 No Content');
                return [];
            }

            const result = data.data || data;
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error("Error fetching lessons by chapter ID:", error);
            throw error;
        }

    },
    createLesson: async (formData: FormData) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/lessons`, {
                method: "POST",
                headers: {
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.message || "Không thể thêm bài học.");
                } catch (e) {
                    throw new Error(errorText || `Lỗi Server (${res.status})`);
                }
            }

            // 2. Nếu OK thì mới parse JSON data
            const data = await res.json();
            return data.data || data;

        } catch (error) {
            console.error("Error uploading lesson:", error);
            throw error;
        }
    },
    updateLesson: async (id: string, lesson: Lesson) => {
        try {
            const res = await fetch(`${API_URL}/lessons/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(lesson),
            });

            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể cập nhật bài học.");
            }

            return data.data || data;
        } catch (error) {
            console.error("Error updating lesson:", error);
            throw error;
        }
    },
    deleteLesson: async (lessonId: string) => {
        try {
            console.log("Deleting lesson with ID:", lessonId);
            const res = await fetch(`${API_URL}/lessons/${lessonId}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể xóa bài học.");
            }

            return data.data || data;
        } catch (error) {
            console.error("Error deleting lesson:", error);
            throw error;
        }
    }
}

