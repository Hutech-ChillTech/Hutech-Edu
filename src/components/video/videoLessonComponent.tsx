import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
import { PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface VideoLessonPlayerProps {
  videoUrl: string;
  lessonTitle?: string;
  autoPlay?: boolean;
  onCompleted?: () => void;
}

const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({
  videoUrl,
  lessonTitle,
  autoPlay = false,
  onCompleted
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    console.log("VideoLessonPlayer: videoUrl changed to:", videoUrl);
    setIsLoading(true);
    setIsError(false);
    setIsCompleted(false);

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
    setIsCompleted(true);
    if (onCompleted) onCompleted();
  };

  return (
    <Card
      style={{ overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      bodyStyle={{ padding: 0 }}
    >
      {lessonTitle && (
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={4} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <PlayCircleOutlined style={{ color: '#1890ff' }} />
            {lessonTitle}
          </Title>
          {isCompleted && (
            <span style={{ color: '#52c41a', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
              <CheckCircleOutlined /> Đã hoàn thành
            </span>
          )}
        </div>
      )}

      <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>

        {isLoading && !isError && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <Spin size="large" tip="Đang tải video..." />
          </div>
        )}

        {isError && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center', width: '80%'
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
            position: 'absolute',
            top: 0,
            left: 0,
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
    </Card>
  );
};

export default VideoLessonPlayer;