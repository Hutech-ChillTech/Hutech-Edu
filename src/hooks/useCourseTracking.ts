import { useEffect, useRef, useCallback, useState } from "react";
import { courseTrackingService } from "../service/courseTracking.service";

/**
 * Hook để auto-track thời gian học course
 *
 * Features:
 * - Auto start tracking khi mount
 * - Heartbeat mỗi 15 phút (900000ms)
 * - Auto pause khi user chuyển tab > 2 phút
 * - Auto pause khi unmount
 *
 * @param courseId - ID của course cần track
 * @param enabled - Bật/tắt tracking (default: true)
 *
 * @example
 * ```tsx
 * function CourseDetailPage({ courseId }) {
 *   useCourseTracking(courseId);
 *   return <div>Course content...</div>;
 * }
 * ```
 */
export const useCourseTracking = (
  courseId: string,
  enabled: boolean = true,
  onIdlePause?: () => void
) => {
  const heartbeatInterval = useRef<number | null>(null);
  const pauseTimeout = useRef<number | null>(null);
  const isTracking = useRef(false);
  const idleTimeout = useRef<number | null>(null);
  const [showIdleModal, setShowIdleModal] = useState(false);

  // Start tracking
  const startTracking = useCallback(async () => {
    if (!enabled || !courseId || isTracking.current) return;

    try {
      await courseTrackingService.startTracking(courseId);
      isTracking.current = true;
      console.log("✅ Started tracking course:", courseId);

      // Bắt đầu heartbeat mỗi 15 phút
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }

      heartbeatInterval.current = setInterval(async () => {
        try {
          await courseTrackingService.sendHeartbeat(courseId);
          console.log("💓 Heartbeat sent for course:", courseId);
        } catch (error) {
          console.error("❌ Heartbeat failed:", error);
        }
      }, 900000); // 15 phút = 900000ms
    } catch (error) {
      console.error("❌ Failed to start tracking:", error);
      isTracking.current = false;
    }
  }, [courseId, enabled]);

  // Pause tracking
  const pauseTracking = useCallback(async () => {
    if (!enabled || !courseId || !isTracking.current) return;

    try {
      await courseTrackingService.pauseTracking(courseId);
      isTracking.current = false;
      console.log("⏸️ Paused tracking course:", courseId);

      // Clear heartbeat interval
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }
    } catch (error) {
      console.error("❌ Failed to pause tracking:", error);
    }
  }, [courseId, enabled]);

  // Handle visibility change (user chuyển tab)
  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User chuyển sang tab khác, đợi 2 phút rồi pause
        pauseTimeout.current = setTimeout(() => {
          pauseTracking();
        }, 120000); // 2 minutes
      } else {
        // User quay lại tab, clear timeout và start lại
        if (pauseTimeout.current) {
          clearTimeout(pauseTimeout.current);
          pauseTimeout.current = null;
        }
        if (!isTracking.current) {
          startTracking();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Idle tracking: nếu không tương tác trong 20 phút thì pause
    const resetIdleTimer = () => {
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
      idleTimeout.current = setTimeout(() => {
        pauseTracking();
        setShowIdleModal(true);
        if (onIdlePause) onIdlePause();
        console.log("⏸️ Paused tracking do user idle quá 20 phút");
      }, 1200000); // 20 phút = 1,200,000ms
    };

    // Các event tương tác
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);
    resetIdleTimer(); // khởi tạo timer khi mount

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
        idleTimeout.current = null;
      }
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("click", resetIdleTimer);
    };
  }, [enabled, startTracking, pauseTracking, onIdlePause]);

  // Start tracking on mount, pause on unmount
  useEffect(() => {
    if (enabled && courseId) {
      startTracking();
    }

    return () => {
      pauseTracking();

      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }

      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
        pauseTimeout.current = null;
      }
    };
  }, [courseId, enabled, startTracking, pauseTracking]);

  return {
    startTracking,
    pauseTracking,
    isTracking: isTracking.current,
    showIdleModal,
    setShowIdleModal,
  };
};
