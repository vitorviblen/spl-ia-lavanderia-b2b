import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { title: 'Conversas Hoje', value: '0', icon: MessageSquare, change: '+0%' },
  { title: 'Clientes Ativos', value: '0', icon: Users, change: '+0%' },
  { title: 'Taxa de Resposta', value: '0%', icon: TrendingUp, change: '+0%' },
  { title: 'Tempo Médio', value: '0min', icon: Clock, change: '+0%' },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do seu atendimento automatizado
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">
                  {stat.title}
                </CardDescription>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change} vs. semana passada
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas interações do seu bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade ainda. Conecte seu WhatsApp para começar!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
