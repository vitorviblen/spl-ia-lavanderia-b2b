import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';

export default function Adesivos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerar Adesivos QR</h1>
          <p className="text-muted-foreground mt-2">
            Crie adesivos com QR Code para seus clientes
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Preview do Adesivo</CardTitle>
              <CardDescription>
                Visualize como ficará o adesivo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex flex-col items-center justify-center p-8 border-2 border-dashed border-border">
                <QrCode className="h-32 w-32 text-muted-foreground" />
                <p className="text-sm font-medium mt-4">Escaneie para atendimento</p>
                <p className="text-xs text-muted-foreground mt-2">SPL IA - Lavanderia</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Personalize seu adesivo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Tamanho</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">Pequeno</Button>
                  <Button variant="default">Médio</Button>
                  <Button variant="outline">Grande</Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Formato</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="default">Quadrado</Button>
                  <Button variant="outline">Retangular</Button>
                </div>
              </div>
              <Button className="w-full mt-6">
                <Download className="h-4 w-4 mr-2" />
                Baixar Adesivo (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dicas de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Cole os adesivos em locais visíveis da sua lavanderia</p>
            <p>• Incentive clientes a escanear para atendimento rápido</p>
            <p>• Você pode imprimir quantos adesivos precisar</p>
            <p>• O QR Code é único para sua lavanderia</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
