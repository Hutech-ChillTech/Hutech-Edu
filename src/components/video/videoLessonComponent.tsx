import React, { useState, useRef, useEffect } from 'react';
import { Spin, Alert } from 'antd';

interface VideoLessonPlayerProps {
  videoUrl: string;
  lessonTitle?: string;
  autoPlay?: boolean;
  onCompleted?: () => void;
}

const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({
  videoUrl,
  autoPlay = false,
  onCompleted
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
      videoRef.current.play().catch(e => console.error("Autoplay failed:", e));
    }
  };

  const handleError = (e: any) => {
    console.error("VideoLessonPlayer: onError", e);
    setIsLoading(false);
    setIsError(true);
  };

  const handleEnded = () => {
    console.log("VideoLessonPlayer: onEnded");
    if (onCompleted) onCompleted();
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      position: 'relative'
    }}>
      {isLoading && !isError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}>
          <Spin size="large" tip="Đang tải video..." />
        </div>
      )}

      {isError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '80%'
        }}>
          <Alert
            message="Không thể tải video"
            description={
              <div>
                <p>Vui lòng kiểm tra đường truyền hoặc URL.</p>
                <p style={{ fontSize: '12px', color: '#888', wordBreak: 'break-all' }}>URL: {videoUrl}</p>
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
          width: '100%',
          height: '100%',
          objectFit: 'contain'
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