import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Palette,
  Server,
  Smartphone,
  Database,
  Brain,
  Globe,
  Rocket,
  Lock,
  CheckCircle,
  Clock,
  Award,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import styles from "../../styles/LearningPathMap.module.css";
import { learningPathService } from "../../service/learningPath.service";

const LearningPathMap = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [zoom, setZoom] = useState(0.5);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const hub = { x: 50, y: 50, title: "Khởi Đầu" };

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setLoading(true);
        const result = await learningPathService.getAllLearningPaths({
          isPublished: true,
          limit: 50,
        });
        if (result && result.paths) {
          setLearningPaths(result.paths);
        }
      } catch (err: any) {
        console.error("Error fetching learning paths:", err);
        setError(err.message || "Không thể tải dữ liệu lộ trình học tập");
      } finally {
        setLoading(false);
      }
    };
    fetchLearningPaths();
  }, []);

  const sharedCourses = [
    { id: "shared-1", title: "Git & GitHub", status: "completed", x: 50, y: 35, lessons: 15, duration: "3 tuần", sharedBy: ["frontend", "backend", "mobile"] },
    { id: "shared-2", title: "JavaScript Cơ Bản", status: "in-progress", x: 35, y: 42, lessons: 30, duration: "6 tuần", sharedBy: ["frontend", "backend", "mobile"] },
    { id: "shared-3", title: "Database SQL", status: "available", x: 58, y: 62, lessons: 25, duration: "5 tuần", sharedBy: ["backend", "ai"] },
    { id: "shared-4", title: "Design Thinking", status: "available", x: 42, y: 58, lessons: 20, duration: "4 tuần", sharedBy: ["uiux", "frontend"] },
  ];

  const getPathIcon = (pathTitle: string) => {
    const title = pathTitle.toLowerCase();
    if (title.includes("frontend") || title.includes("web")) return Code;
    if (title.includes("backend") || title.includes("server")) return Server;
    if (title.includes("mobile") || title.includes("app")) return Smartphone;
    if (title.includes("ui") || title.includes("ux") || title.includes("design")) return Palette;
    if (title.includes("ai") || title.includes("ml") || title.includes("machine")) return Brain;
    if (title.includes("data") || title.includes("database")) return Database;
    return Code;
  };

  const getPathColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "basic": return "blue";
      case "intermediate": return "green";
      case "advanced": return "orange";
      default: return "purple";
    }
  };

  const paths = learningPaths.map((path, pathIndex) => {
    const Icon = getPathIcon(path.title);
    const color = getPathColor(path.level);
    const totalPaths = learningPaths.length;
    const anglePerPath = (2 * Math.PI) / Math.max(totalPaths, 5);
    const pathAngle = anglePerPath * pathIndex;
    const radiusStep = 20;

    const courses = path.courses?.map((pathCourse: any, courseIndex: number) => {
      const radius = radiusStep * (courseIndex + 1);
      const x = hub.x + radius * Math.cos(pathAngle);
      const y = hub.y + radius * Math.sin(pathAngle);

      return {
        id: pathCourse.course.courseId,
        title: pathCourse.course.courseName,
        status: "available",
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
        lessons: pathCourse.course.lessons?.length || 0,
        duration: `${pathCourse.course.estimatedDuration || 0} giờ`,
        courseData: pathCourse.course,
      };
    }) || [];

    return { id: path.learningPathId, name: path.title, color, icon: Icon, courses };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return styles.completed;
      case "in-progress": return styles.inProgress;
      case "available": return styles.available;
      default: return styles.locked;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className={styles.statusIcon} />;
    if (status === "in-progress") return <Clock className={styles.statusIcon} />;
    if (status === "locked") return <Lock className={styles.statusIcon} />;
    return <Rocket className={styles.statusIcon} />;
  };

  const handleCourseClick = (course: any) => {
    if (course.status !== "locked" && course.id) {
      navigate(`/course/${course.id}`);
    }
  };

  const isPathActive = (pathId: string) => !selectedPath || selectedPath === pathId;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.3));
  const handleResetZoom = () => { setZoom(0.5); setPan({ x: 0, y: 0 }); };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.3, Math.min(2, prev + delta)));
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}><Globe className={styles.spin} /> Đang tải dữ liệu...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Lỗi</h1>
          <p className={styles.subtitle}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}><Globe className={styles.spin} /> Bản Đồ Lộ Trình Học Tập</h1>
        <p className={styles.subtitle}>Tất cả bắt đầu từ trung tâm - Chọn hướng đi của bạn!</p>
      </div>

      <div className={styles.pathSelector}>
        {paths.map((path) => {
          const Icon = path.icon;
          return (
            <div key={path.id} className={`${styles.pathCard} ${selectedPath === path.id ? styles.pathSelected : ""}`} onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}>
              <div className={`${styles.pathIcon} ${styles[path.color]}`}><Icon className={styles.pathIconSvg} /></div>
              <div className={styles.pathName}>{path.name}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.zoomControls}>
        <button onClick={handleZoomIn} className={styles.zoomButton} title="Phóng to"><ZoomIn size={20} /></button>
        <button onClick={handleZoomOut} className={styles.zoomButton} title="Thu nhỏ"><ZoomOut size={20} /></button>
        <button onClick={handleResetZoom} className={styles.zoomButton} title="Đặt lại"><Maximize2 size={20} /></button>
        <div className={styles.zoomLevel}>{Math.round(zoom * 100)}%</div>
      </div>

      <div className={styles.mapArea} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <div className={styles.mapContent} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center' }}>
          <svg className={styles.svgLines}>
            {paths.map((path) => {
              if (!isPathActive(path.id)) return null;
              return path.courses.map((c: any, i: number) => {
                if (i === 0) return <line key={c.id} x1={`${hub.x}%`} y1={`${hub.y}%`} x2={`${c.x}%`} y2={`${c.y}%`} className={styles.pathLine} />;
                const prev = path.courses[i - 1];
                return <line key={c.id} x1={`${prev.x}%`} y1={`${prev.y}%`} x2={`${c.x}%`} y2={`${c.y}%`} className={styles.pathLine} />;
              });
            })}
          </svg>

          <div className={styles.hub} style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
            <div className={styles.hubPulse}></div>
            <div className={styles.hubMain}><Award className={styles.hubIcon} /></div>
            <div className={styles.hubLabel}>🚀 Bắt Đầu</div>
          </div>

          {sharedCourses.map((course) => {
            const active = !selectedPath || course.sharedBy.includes(selectedPath);
            if (!active) return null;
            return (
              <div key={course.id} style={{ left: `${course.x}%`, top: `${course.y}%` }} className={styles.nodeWrapper}>
                <div className={`${styles.courseNode} ${hoveredCourse === course.id ? styles.hoveredNode : ""} ${course.status === "locked" ? styles.lockedNode : ""}`} onMouseEnter={() => setHoveredCourse(course.id)} onMouseLeave={() => setHoveredCourse(null)} onClick={() => handleCourseClick(course)}>
                  <Database className={styles.nodeIcon} />
                  <div className={`${styles.statusBadge} ${getStatusColor(course.status)}`}>{getStatusIcon(course.status)}</div>
                  <div className={styles.sharedBadge}>CHUNG</div>
                  <div className={styles.courseLabel}>{course.title}</div>
                </div>
              </div>
            );
          })}

          {paths.map((path) => {
            if (!isPathActive(path.id)) return null;
            const Icon = path.icon;
            return path.courses.map((course: any) => (
              <div key={course.id} style={{ left: `${course.x}%`, top: `${course.y}%` }} className={styles.nodeWrapper}>
                <div className={`${styles.courseNode} ${hoveredCourse === course.id ? styles.hoveredNode : ""} ${course.status === "locked" ? styles.lockedNode : ""}`} onMouseEnter={() => setHoveredCourse(course.id)} onMouseLeave={() => setHoveredCourse(null)} onClick={() => handleCourseClick(course)}>
                  <Icon className={styles.nodeIcon} />
                  <div className={`${styles.statusBadge} ${getStatusColor(course.status)}`}>{getStatusIcon(course.status)}</div>
                  <div className={styles.courseLabel}>{course.title}</div>
                </div>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathMap;