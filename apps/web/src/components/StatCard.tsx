import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: 'coral' | 'blue' | 'green' | 'amber';
}

const colorVariants = {
  coral: 'bg-coral/10 text-coral',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-amber-100 text-amber-600',
};

export function StatCard({ title, value, icon: Icon, color = 'coral' }: StatCardProps) {
  return (
    <Card className="border-tea/5">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorVariants[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-tea/60">{title}</p>
          <p className="text-2xl font-display font-bold text-tea">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
