import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Megaphone, Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Marketing() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Marketing</h1>
            <Badge variant="secondary">Em breve</Badge>
          </div>
          <p className="text-muted-foreground mt-2">
            Funcionalidade em desenvolvimento
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-3xl">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <Lock className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">Módulo em Desenvolvimento</CardTitle>
              <CardDescription className="text-base">
                Estamos trabalhando em recursos incríveis de marketing para você
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Megaphone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-3">O que está por vir:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Campanhas automatizadas via WhatsApp</p>
                          <p className="text-sm text-muted-foreground">Envie mensagens programadas para seus clientes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Segmentação de clientes</p>
                          <p className="text-sm text-muted-foreground">Crie grupos personalizados para campanhas direcionadas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Templates de mensagens personalizadas</p>
                          <p className="text-sm text-muted-foreground">Modelos prontos que você pode adaptar</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Análise de performance de campanhas</p>
                          <p className="text-sm text-muted-foreground">Métricas de abertura, resposta e conversão</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Agendamento de envios</p>
                          <p className="text-sm text-muted-foreground">Programe mensagens para os melhores horários</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
                <p className="text-lg font-medium mb-2">
                  🚀 Lançamento previsto para breve!
                </p>
                <p className="text-sm text-muted-foreground">
                  Em breve você poderá criar campanhas de marketing automatizadas para engajar seus clientes!
                </p>
              </div>

              <div className="flex justify-center">
                <Button onClick={() => navigate('/dashboard')} variant="outline" size="lg">
                  ← Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}
