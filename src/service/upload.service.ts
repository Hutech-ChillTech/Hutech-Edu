import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const uploadService = {
    getSignature: async () => {
        try {
            const res = await fetch(`${API_URL}/uploads/signature`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            if (!res.ok) throw new Error("Không lấy được chữ ký upload");

            const data = await res.json();
            return data.data || data;
        } catch (error) {
            console.error("Lỗi lấy signature:", error);
            throw error;
        }
    },

    uploadVideo: async (file: File, onProgress?: (percent: number) => void) => {
        try {
            const { signature, timestamp, apiKey, cloudName } = await uploadService.getSignature();

            const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB
            const totalSize = file.size;
            const uniqueUploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            let start = 0;
            let end = Math.min(CHUNK_SIZE, totalSize);
            let result: any = null;

            console.log(`Bắt đầu upload chunked. Tổng kích thước: ${totalSize}, Chunk size: ${CHUNK_SIZE}`);

            while (start < totalSize) {
                const chunk = file.slice(start, end);
                const formData = new FormData();

                formData.append("api_key", apiKey);
                formData.append("timestamp", timestamp.toString());
                formData.append("signature", signature);
                formData.append("folder", "course-videos");
                formData.append("file", chunk);

                const contentRange = `bytes ${start}-${end - 1}/${totalSize}`;
                console.log(`Đang upload chunk: ${contentRange}`);

                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
                    formData,
                    {
                        headers: {
                            "X-Unique-Upload-Id": uniqueUploadId,
                            "Content-Range": contentRange,
                        },
                    }
                );

                result = res.data;

                if (onProgress) {
                    const percent = Math.round((end / totalSize) * 100);
                    onProgress(percent);
                }

                start = end;
                end = Math.min(start + CHUNK_SIZE, totalSize);
            }
            console.log("Upload hoàn tất!");
            return result;
        } catch (error) {
            console.error("Lỗi upload video (chunked):", error);
            throw error;
        }
    }
};