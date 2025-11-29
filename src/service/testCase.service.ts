import { type TestCase } from "../types/database.types";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const API_URL = import.meta.env.VITE_BACKEND_URL;


export const testCaseService = {

    getAllTestCases: async (): Promise<TestCase[]> => {
        try {
            const res = await fetch(`${API_URL}/testcases`, {
                method: "GET",
                headers: getAuthHeaders(),
            });
            const data = await res.json();

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể lấy tất cả test case.");
            }
            return data.data || data as TestCase[];
        } catch (error) {
            console.error("Error fetching test cases:", error);
            throw error;
        }
    },

    createTestCase: async (payload: Partial<TestCase>) => {
        try {
            const res = await fetch(`${API_URL}/testcases`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("Data:  ", data);

            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) {
                throw new Error(data?.message || "Không thể thêm testcase.");
            }

            return data.data || data;
        } catch (error) {
            console.error("Error uploading testcase:", error);
            throw error;
        }
    }
}
