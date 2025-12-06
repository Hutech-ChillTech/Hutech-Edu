import React, { useState, useRef, useEffect } from "react";
import { Spin, Alert, message } from "antd";
import { progressService } from "../../service/progress.service";

interface VideoLessonPlayerProps {
  videoUrl: string;
  lessonId?: string;
  lessonTitle?: string;
  autoPlay?: boolean;
  onCompleted?: (result?: any) => void;
}

const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({
  videoUrl,
  lessonId,
  autoPlay = false,
  onCompleted,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Track lesson access khi component mount
  useEffect(() => {
    if (lessonId) {
      progressService.accessLesson(lessonId).catch((err) => {
        console.error("Error tracking lesson access:", err);
      });
    }
  }, [lessonId]);

  useEffect(() => {
    console.log("VideoLessonPlayer: videoUrl changed to:", videoUrl);
    setIsLoading(true);
    setIsError(false);

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handleLoadedData = () => {
    console.log("VideoLessonPlayer: onLoadedData");
    setIsLoading(false);
    if (autoPlay && videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.error("Autoplay failed:", e));
    }
  };

  const handleError = (e: any) => {
    console.error("VideoLessonPlayer: onError", e);
    setIsLoading(false);
    setIsError(true);
  };

  const handleEnded = async () => {
    console.log("VideoLessonPlayer: onEnded - Tự động hoàn thành bài học");

    // Tự động đánh dấu hoàn thành khi video kết thúc
    if (lessonId) {
      try {
        const result = await progressService.completeLesson(lessonId);

        // 🔍 DEBUG: Log toàn bộ response để check BE trả về gì
        console.log("✅ Complete lesson response:", result);
        console.log("📊 XP Reward:", result.xpReward);
        console.log("📈 Course Progress:", result.courseProgress);

        // Call onCompleted callback để parent component xử lý (hiển thị XP notification)
        if (onCompleted) {
          onCompleted(result);
        }

        // Hiển thị message nhỏ để confirm
        message.success(
          `✅ Hoàn thành bài học! Tiến độ: ${result.courseProgress.toFixed(
            1
          )}%`,
          3
        );
      } catch (error: any) {
        console.error("Error completing lesson:", error);
        // Chỉ hiện lỗi nếu không phải lỗi "đã hoàn thành rồi"
        if (!error.response?.data?.message?.includes("đã hoàn thành")) {
          message.warning("Không thể đánh dấu hoàn thành. Vui lòng thử lại.");
        } else {
          // Nếu đã hoàn thành rồi, vẫn gọi callback
          if (onCompleted) onCompleted();
        }
      }
    } else {
      if (onCompleted) onCompleted();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      {isLoading && !isError && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Spin size="large" tip="Đang tải video..." />
        </div>
      )}

      {isError && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "center",
            width: "80%",
          }}
        >
          <Alert
            message="Không thể tải video"
            description={
              <div>
                <p>Vui lòng kiểm tra đường truyền hoặc URL.</p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    wordBreak: "break-all",
                  }}
                >
                  URL: {videoUrl}
                </p>
              </div>
            }
            type="error"
            showIcon
          />
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        controls
        controlsList="nodownload"
        onLoadedData={handleLoadedData}
        onError={handleError}
        onEnded={handleEnded}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default VideoLessonPlayer;
