import React from 'react';
import type { ReactPlayerProps } from 'react-player';

// 1. Interface cho các thuộc tính config của File
export interface FileConfigAttributes {
  controlsList?: string;
  onContextMenu?: (e: React.MouseEvent<HTMLVideoElement>) => void;
  disablePictureInPicture?: boolean;
}

export interface ExtendedReactPlayerProps extends Omit<ReactPlayerProps, 'config'> {
  config?: {
    file?: {
      attributes?: FileConfigAttributes;
      forceVideo?: boolean;
      forceAudio?: boolean;
      forceHLS?: boolean;
      forceDASH?: boolean;
      forceFLV?: boolean;
    };
    // Cho phép thêm các key khác (youtube, facebook...) nếu cần, tránh lỗi thiếu thuộc tính
    [key: string]: any; 
  };
}