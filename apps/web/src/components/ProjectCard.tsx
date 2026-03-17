import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Project } from '@knithub/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusLabels = {
    active: '进行中',
    completed: '已完成',
    hibernating: '已暂停',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    hibernating: 'bg-amber-100 text-amber-700',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-tea/5">
      {/* 封面图 */}
      <div className="aspect-video bg-tea/5 overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-tea/30">
            <span className="text-4xl">🧶</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* 标题和状态 */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-tea line-clamp-1">{project.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>
        
        {/* 图解名称 */}
        {project.patternName && (
          <p className="text-xs text-tea/50 mb-3">{project.patternName}</p>
        )}
        
        {/* 进度条 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-tea/60">进度</span>
            <span className="font-medium text-coral">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
