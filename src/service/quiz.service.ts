const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const API_URL = import.meta.env.VITE_BACKEND_URL;
interface CreateChapterQuizPayload {
  title: string;              // Bắt buộc
  chapterId?: string;         // Optional (trong Prisma là String?) nhưng logic thường là cần
  description?: string;       // Optional
}

export const quizService = {  
    createQuiz: async (payload: CreateChapterQuizPayload) => {
        try {
            const res = await fetch(`${API_URL}/quizzes`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể tạo quiz.");
            }
        } catch (error) {
            console.error("Error creating quiz:", error);
            throw error;
        }
    }
}