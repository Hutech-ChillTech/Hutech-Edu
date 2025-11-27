
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
                console.warn('LessonList: missing chapterId, skipping fetchLessons');
                return [];
            }
            const res = await fetch(`${API_URL}/lessons/chapter/${chapterId}`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            const data = await res.json();
            
            if (res.status === 401) {
                throw new Error("Unauthorized");
            }

            if (res.status === 204) {
                console.info('LessonList: server returned 204 No Content');
                return [];
            }

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

            console.log("Data: ", data);
            
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

            console.log("--- DEBUG FORM DATA ---");
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            console.log("-----------------------");
            
            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể thêm bài học.");
            }

            return data.data || data;
        } catch (error) {
            console.error("Error uploading lesson:", error);
            throw error;
        }
    }
}

