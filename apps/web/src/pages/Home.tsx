import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { feedApi, statsApi, projectApi } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { PostCard } from '@/components/PostCard';
import { ProjectCard } from '@/components/ProjectCard';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { FolderHeart, Package, Wrench, Plus, ArrowRight } from 'lucide-react';
import type { Project, PostWithUser } from '@knithub/types';

// Dashboard 组件（已登录状态）
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: statsData } = useQuery({
    queryKey: ['stats'],
    queryFn: statsApi.getStats,
  });

  const { data: projectsData } = useQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => projectApi.getProjects({ status: 'active', limit: 4 }),
  });

  const { data: feedData } = useQuery({
    queryKey: ['feed'],
    queryFn: () => feedApi.getFeed({ limit: 6 }),
  });

  const stats = statsData?.data;
  const projects: Project[] = projectsData?.data?.items || [];
  const feed: PostWithUser[] = feedData?.data?.items || [];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎语 */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-tea mb-2">
            欢迎回来，{user?.username}！
          </h1>
          <p className="text-tea/60">今天想编织点什么？</p>
        </div>

        {/* 统计卡片 */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="进行中项目"
              value={stats.activeProjects}
              icon={FolderHeart}
              color="coral"
            />
            <StatCard
              title="线材库存"
              value={stats.yarnStashCount}
              icon={Package}
              color="blue"
            />
            <StatCard
              title="已完成作品"
              value={stats.completedProjects}
              icon={FolderHeart}
              color="green"
            />
            <StatCard
              title="社区作品"
              value={stats.totalPosts}
              icon={FolderHeart}
              color="amber"
            />
          </div>
        )}

        {/* 快捷入口 */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={() => navigate('/projects/new')}>
            <Plus className="w-4 h-4 mr-2" />
            新建项目
          </Button>
          <Button variant="outline" onClick={() => navigate('/stash/new')}>
            <Package className="w-4 h-4 mr-2" />
            添加线材
          </Button>
          <Button variant="outline" onClick={() => navigate('/tools')}>
            <Wrench className="w-4 h-4 mr-2" />
            打开工具
          </Button>
        </div>

        {/* 进行中的项目 */}
        {projects.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-tea">进行中的项目</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* 社区动态 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-tea">社区动态</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/explore')}>
              探索更多
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feed.map((post: PostWithUser) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// LandingPage 组件（未登录状态）
function LandingPage() {
  const navigate = useNavigate();

  const { data: feedData } = useQuery({
    queryKey: ['feed', 'public'],
    queryFn: () => feedApi.getFeed({ limit: 6 }),
  });

  const feed: PostWithUser[] = feedData?.data?.items || [];

  const features = [
    {
      icon: FolderHeart,
      title: '项目管理',
      description: '轻松追踪你的编织项目，记录进度，管理图解和笔记',
    },
    {
      icon: FolderHeart,
      title: '图解库',
      description: '整理和收藏你喜欢的编织图解，随时随地查看',
    },
    {
      icon: Package,
      title: '线材管理',
      description: '记录你的线材库存，追踪用量，规划新项目',
    },
    {
      icon: FolderHeart,
      title: '社区分享',
      description: '与全球编织爱好者分享作品，获取灵感和反馈',
    },
    {
      icon: Wrench,
      title: '实用工具',
      description: '密度计算器、尺寸转换、针号对照等编织必备工具',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-tea mb-6 leading-tight">
              编织爱好者的
              <span className="text-coral">温暖社区</span>
            </h1>
            <p className="text-lg md:text-xl text-tea/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              管理你的编织项目，追踪线材库存，与志同道合的朋友分享创作灵感
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}>
                开始使用
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/explore')}>
                浏览作品
              </Button>
            </div>
          </div>
        </div>
        
        {/* 装饰背景 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-coral/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-tea mb-4">功能特色</h2>
            <p className="text-tea/60">为编织爱好者打造的贴心功能</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-tea/5"
              >
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-coral" />
                </div>
                <h3 className="text-lg font-semibold text-tea mb-2">{feature.title}</h3>
                <p className="text-tea/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-tea mb-4">社区精选</h2>
            <p className="text-tea/60">看看社区里的编织达人们都在创作什么</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {feed.map((post: PostWithUser) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate('/explore')}>
              探索更多作品
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-tea/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-tea">KnitHub</span>
            </div>
            <p className="text-sm text-tea/50">
              © 2024 KnitHub. 编织爱好者的温暖社区
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-tea/50 hover:text-tea transition-colors">关于我们</a>
              <a href="#" className="text-sm text-tea/50 hover:text-tea transition-colors">使用条款</a>
              <a href="#" className="text-sm text-tea/50 hover:text-tea transition-colors">隐私政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home 页面主组件
export function Home() {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Dashboard /> : <LandingPage />;
}
