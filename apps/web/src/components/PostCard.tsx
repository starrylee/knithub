import { Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PostWithUser } from '@knithub/types';

interface PostCardProps {
  post: PostWithUser;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-tea/5">
      {/* 图片 */}
      {post.imageUrl && (
        <div className="aspect-square overflow-hidden">
          <img
            src={post.imageUrl}
            alt="作品图片"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      {/* 内容 */}
      <div className="p-4">
        {/* 用户信息 */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.user.avatar || undefined} alt={post.user.username} />
            <AvatarFallback className="bg-coral/10 text-coral text-xs">
              {post.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-tea">{post.user.username}</span>
        </div>
        
        {/* 文字内容 */}
        <p className="text-sm text-tea/70 line-clamp-2 mb-3">{post.content}</p>
        
        {/* 互动数据 */}
        <div className="flex items-center gap-4 text-xs text-tea/50">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {post.likesCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {post.commentsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
