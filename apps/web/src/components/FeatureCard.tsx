import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-tea/5">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral/20 transition-colors">
          <Icon className="w-6 h-6 text-coral" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
