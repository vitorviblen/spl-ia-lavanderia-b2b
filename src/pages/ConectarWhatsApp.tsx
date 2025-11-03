import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone } from 'lucide-react';

export default function ConectarWhatsApp() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Conectar WhatsApp</h1>
          <p className="text-muted-foreground mt-2">
            Escaneie o QR Code para conectar seu WhatsApp
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                Escaneie com seu WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                O QR Code será gerado aqui após implementação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como conectar</CardTitle>
              <CardDescription>
                Siga os passos abaixo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Abra o WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    No seu celular, abra o WhatsApp Business
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Acesse Dispositivos Conectados</p>
                  <p className="text-sm text-muted-foreground">
                    Toque em ⋮ e selecione "Dispositivos conectados"
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Escaneie o QR Code</p>
                  <p className="text-sm text-muted-foreground">
                    Aponte a câmera para o QR Code acima
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="secondary">
                <Smartphone className="h-4 w-4 mr-2" />
                Atualizar QR Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
