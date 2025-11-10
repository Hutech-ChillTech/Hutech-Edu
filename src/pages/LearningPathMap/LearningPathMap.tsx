import { useState } from 'react';
import {
  Code, Palette, Server, Smartphone, Database, Brain, Globe, Rocket, Lock, CheckCircle, Clock, Award
} from 'lucide-react';
import styles from '../../styles/LearningPathMap.module.css';

const LearningPathMap = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const hub = { x: 50, y: 50, title: 'Khởi Đầu' };

  const sharedCourses = [
    { id: 'shared-1', title: 'Git & GitHub', status: 'completed', x: 50, y: 35, lessons: 15, duration: '3 tuần', sharedBy: ['frontend','backend','mobile'] },
    { id: 'shared-2', title: 'JavaScript Cơ Bản', status: 'in-progress', x: 35, y: 42, lessons: 30, duration: '6 tuần', sharedBy: ['frontend','backend','mobile'] },
    { id: 'shared-3', title: 'Database SQL', status: 'available', x: 58, y: 62, lessons: 25, duration: '5 tuần', sharedBy: ['backend','ai'] },
    { id: 'shared-4', title: 'Design Thinking', status: 'available', x: 42, y: 58, lessons: 20, duration: '4 tuần', sharedBy: ['uiux','frontend'] }
  ];

  const paths = [
    {
      id: 'frontend', name: 'Frontend', color: 'blue', icon: Code,
      courses: [
        { id: 'f1', title: 'HTML & CSS', status: 'completed', x: 65, y: 30, lessons: 20, duration: '4 tuần' },
        { id: 'f2', title: 'React.js', status: 'available', x: 75, y: 25, lessons: 40, duration: '8 tuần' },
        { id: 'f3', title: 'TypeScript', status: 'locked', x: 82, y: 18, lessons: 25, duration: '5 tuần' },
        { id: 'f4', title: 'Next.js', status: 'locked', x: 88, y: 12, lessons: 35, duration: '7 tuần' }
      ]
    },
    {
      id: 'backend', name: 'Backend', color: 'green', icon: Server,
      courses: [
        { id: 'b1', title: 'Node.js', status: 'available', x: 72, y: 50, lessons: 28, duration: '6 tuần' },
        { id: 'b2', title: 'Express.js', status: 'locked', x: 80, y: 55, lessons: 22, duration: '5 tuần' },
        { id: 'b3', title: 'REST API', status: 'locked', x: 87, y: 62, lessons: 26, duration: '5 tuần' },
        { id: 'b4', title: 'Microservices', status: 'locked', x: 92, y: 70, lessons: 40, duration: '8 tuần' }
      ]
    },
    {
      id: 'mobile', name: 'Mobile', color: 'purple', icon: Smartphone,
      courses: [
        { id: 'm1', title: 'React Native', status: 'locked', x: 60, y: 72, lessons: 35, duration: '7 tuần' },
        { id: 'm2', title: 'Mobile UI', status: 'locked', x: 58, y: 82, lessons: 25, duration: '5 tuần' },
        { id: 'm3', title: 'Native APIs', status: 'locked', x: 52, y: 88, lessons: 30, duration: '6 tuần' },
        { id: 'm4', title: 'App Deploy', status: 'locked', x: 45, y: 92, lessons: 20, duration: '4 tuần' }
      ]
    },
    {
      id: 'uiux', name: 'UI/UX', color: 'pink', icon: Palette,
      courses: [
        { id: 'u1', title: 'Figma Master', status: 'locked', x: 28, y: 65, lessons: 25, duration: '5 tuần' },
        { id: 'u2', title: 'User Research', status: 'locked', x: 20, y: 72, lessons: 22, duration: '5 tuần' },
        { id: 'u3', title: 'Prototyping', status: 'locked', x: 13, y: 78, lessons: 28, duration: '6 tuần' },
        { id: 'u4', title: 'Design Systems', status: 'locked', x: 8, y: 85, lessons: 30, duration: '6 tuần' }
      ]
    },
    {
      id: 'ai', name: 'AI/ML', color: 'orange', icon: Brain,
      courses: [
        { id: 'a1', title: 'Python AI', status: 'locked', x: 28, y: 35, lessons: 32, duration: '7 tuần' },
        { id: 'a2', title: 'TensorFlow', status: 'locked', x: 18, y: 28, lessons: 38, duration: '8 tuần' },
        { id: 'a3', title: 'Deep Learning', status: 'locked', x: 12, y: 20, lessons: 45, duration: '10 tuần' },
        { id: 'a4', title: 'AI Projects', status: 'locked', x: 8, y: 12, lessons: 40, duration: '9 tuần' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status){
      case 'completed': return styles.completed;
      case 'in-progress': return styles.inProgress;
      case 'available': return styles.available;
      default: return styles.locked;
    }
  };

  const getStatusIcon = (status) => {
    if(status==='completed') return <CheckCircle className={styles.statusIcon}/>;
    if(status==='in-progress') return <Clock className={styles.statusIcon}/>;
    if(status==='locked') return <Lock className={styles.statusIcon}/>;
    return <Rocket className={styles.statusIcon}/>;
  };

  const handleCourseClick = (course) => {
    if(course.status !== 'locked') console.log('Đi tới khóa học:', course.title);
  };

  const isPathActive = (pathId) => !selectedPath || selectedPath===pathId;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}><Globe className={styles.spin}/> Bản Đồ Lộ Trình Học Tập</h1>
        <p className={styles.subtitle}>Tất cả bắt đầu từ trung tâm - Chọn hướng đi của bạn!</p>
      </div>

      {/* Path Selector */}
      <div className={styles.pathSelector}>
        {paths.map(path => {
          const Icon = path.icon;
          return (
            <div
              key={path.id}
              className={`${styles.pathCard} ${selectedPath===path.id?styles.pathSelected:''}`}
              onClick={()=>setSelectedPath(selectedPath===path.id?null:path.id)}
            >
              <div className={`${styles.pathIcon} ${styles[path.color]}`}>
                <Icon className={styles.pathIconSvg}/>
              </div>
              <div className={styles.pathName}>{path.name}</div>
            </div>
          )
        })}
      </div>

      {/* Map Area */}
      <div className={styles.mapArea}>
        {/* SVG Lines */}
        <svg className={styles.svgLines}>
          {paths.map(path=>{
            if(!isPathActive(path.id)) return null;
            return path.courses.map((c,i)=>{
              if(i===0) return <line key={c.id} x1={`${hub.x}%`} y1={`${hub.y}%`} x2={`${c.x}%`} y2={`${c.y}%`} className={styles.pathLine}/>;
              const prev = path.courses[i-1];
              return <line key={c.id} x1={`${prev.x}%`} y1={`${prev.y}%`} x2={`${c.x}%`} y2={`${c.y}%`} className={styles.pathLine}/>;
            });
          })}
        </svg>

        {/* Hub */}
        <div className={styles.hub} style={{left:`${hub.x}%`, top:`${hub.y}%`}}>
          <div className={styles.hubPulse}></div>
          <div className={styles.hubMain}><Award className={styles.hubIcon}/></div>
          <div className={styles.hubLabel}>🚀 Bắt Đầu</div>
        </div>

        {/* Shared Courses */}
        {sharedCourses.map(course=>{
          const active = !selectedPath || course.sharedBy.includes(selectedPath);
          if(!active) return null;
          return (
            <div key={course.id} style={{left:`${course.x}%`, top:`${course.y}%`}} className={styles.nodeWrapper}>
              <div
                className={`${styles.courseNode} ${hoveredCourse===course.id?styles.hoveredNode:''} ${course.status==='locked'?styles.lockedNode:''}`}
                onMouseEnter={()=>setHoveredCourse(course.id)}
                onMouseLeave={()=>setHoveredCourse(null)}
                onClick={()=>handleCourseClick(course)}
              >
                <Database className={styles.nodeIcon}/>
                <div className={`${styles.statusBadge} ${getStatusColor(course.status)}`}>{getStatusIcon(course.status)}</div>
                <div className={styles.sharedBadge}>CHUNG</div>
              </div>
            </div>
          )
        })}

        {/* Path Courses */}
        {paths.map(path=>{
          if(!isPathActive(path.id)) return null;
          const Icon = path.icon;
          return path.courses.map(course=>(
            <div key={course.id} style={{left:`${course.x}%`, top:`${course.y}%`}} className={styles.nodeWrapper}>
              <div
                className={`${styles.courseNode} ${hoveredCourse===course.id?styles.hoveredNode:''} ${course.status==='locked'?styles.lockedNode:''}`}
                onMouseEnter={()=>setHoveredCourse(course.id)}
                onMouseLeave={()=>setHoveredCourse(null)}
                onClick={()=>handleCourseClick(course)}
              >
                <Icon className={styles.nodeIcon}/>
                <div className={`${styles.statusBadge} ${getStatusColor(course.status)}`}>{getStatusIcon(course.status)}</div>
              </div>
            </div>
          ))
        })}
      </div>
    </div>
  )
};

export default LearningPathMap;
