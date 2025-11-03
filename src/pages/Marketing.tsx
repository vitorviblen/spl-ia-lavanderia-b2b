import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Lock } from 'lucide-react';

export default function Marketing() {
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

        <Card>
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle>Módulo em Desenvolvimento</CardTitle>
            <CardDescription>
              Estamos trabalhando em recursos de marketing para você
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Megaphone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-2">O que está por vir:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Campanhas automatizadas via WhatsApp</li>
                    <li>• Segmentação de clientes</li>
                    <li>• Templates de mensagens personalizadas</li>
                    <li>• Análise de performance de campanhas</li>
                    <li>• Agendamento de envios</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Em breve você poderá criar campanhas de marketing automatizadas para engajar seus clientes!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
