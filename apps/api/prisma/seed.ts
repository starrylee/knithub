import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 清理现有数据
  await prisma.post.deleteMany();
  await prisma.project.deleteMany();
  await prisma.yarnStash.deleteMany();
  await prisma.user.deleteMany();

  // 创建示例用户
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@knithub.com',
      username: 'AliceKnits',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      bio: '热爱编织的程序员，专注于棒针和钩针',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@knithub.com',
      username: 'BobYarns',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      bio: '毛线收藏家，喜欢尝试各种新花样',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'carol@knithub.com',
      username: 'CarolCrafts',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
      bio: '手工编织爱好者，分享我的作品',
    },
  });

  // 创建示例项目
  await prisma.project.createMany({
    data: [
      {
        title: '北欧风围巾',
        description: '给妈妈的生日礼物，选用美利奴羊毛',
        status: 'active',
        progress: 65,
        patternName: '经典麻花围巾',
        coverImage: 'https://images.unsplash.com/photo-1605218427368-35b0f996d2e6?w=400',
        userId: user1.id,
      },
      {
        title: '婴儿毛衣',
        description: '给即将出生的小宝宝',
        status: 'active',
        progress: 30,
        patternName: '基础款婴儿毛衣',
        coverImage: 'https://images.unsplash.com/photo-1572295727871-d296d6a1b6ff?w=400',
        userId: user1.id,
      },
      {
        title: '钩针毯子',
        description: '祖母方格拼接毯',
        status: 'completed',
        progress: 100,
        patternName: '祖母方格经典款',
        coverImage: 'https://images.unsplash.com/photo-1584184804424-0c84d362c3e6?w=400',
        userId: user2.id,
      },
      {
        title: '羊毛袜',
        description: '冬天的温暖',
        status: 'hibernating',
        progress: 45,
        patternName: '基础款羊毛袜',
        userId: user3.id,
      },
    ],
  });

  // 创建示例线材库存
  await prisma.yarnStash.createMany({
    data: [
      {
        brand: 'Malabrigo',
        name: 'Worsted',
        color: '日落橙',
        colorCode: '#E8735A',
        weight: 'worsted',
        quantity: 5,
        unit: 'skeins',
        notes: '非常柔软的羊毛',
        userId: user1.id,
      },
      {
        brand: 'Cascade',
        name: '220',
        color: '森林绿',
        colorCode: '#2D5016',
        weight: 'worsted',
        quantity: 3,
        unit: 'skeins',
        userId: user1.id,
      },
      {
        brand: 'Lion Brand',
        name: 'Mandala',
        color: '独角兽',
        weight: 'dk',
        quantity: 2,
        unit: 'skeins',
        notes: '渐变色段染',
        userId: user2.id,
      },
    ],
  });

  // 创建示例帖子
  await prisma.post.createMany({
    data: [
      {
        content: '终于完成了这条围巾！花了整整两个月，但是看到成品的那一刻一切都值得了 🧶✨',
        imageUrl: 'https://images.unsplash.com/photo-1605218427368-35b0f996d2e6?w=600',
        userId: user1.id,
        likesCount: 42,
        commentsCount: 8,
      },
      {
        content: '新买的毛线到了，颜色太美了！迫不及待想开始新项目',
        imageUrl: 'https://images.unsplash.com/photo-1619250907682-6625547d6900?w=600',
        userId: user2.id,
        likesCount: 28,
        commentsCount: 5,
      },
      {
        content: '分享一个刚学会的针法，效果真的很棒！',
        imageUrl: 'https://images.unsplash.com/photo-1584184804424-0c84d362c3e6?w=600',
        userId: user3.id,
        likesCount: 56,
        commentsCount: 12,
      },
      {
        content: '周末的编织时光，一杯茶，一团线，完美 🍵',
        imageUrl: 'https://images.unsplash.com/photo-1572295727871-d296d6a1b6ff?w=600',
        userId: user1.id,
        likesCount: 35,
        commentsCount: 6,
      },
      {
        content: '给小侄女织的毛衣，希望她会喜欢 💕',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
        userId: user3.id,
        likesCount: 67,
        commentsCount: 15,
      },
      {
        content: '整理了一下我的线材库，原来我已经买了这么多...',
        imageUrl: 'https://images.unsplash.com/photo-1619250907682-6625547d6900?w=600',
        userId: user2.id,
        likesCount: 89,
        commentsCount: 23,
      },
    ],
  });

  console.log('✅ Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
