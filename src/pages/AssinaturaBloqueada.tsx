import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CreditCard } from 'lucide-react';

export default function AssinaturaBloqueada() {
  const handlePagamento = () => window.open('https://pay.cakto.com.br/renovar-splia', '_blank');
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 dark:bg-red-950/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">Assinatura Suspensa</CardTitle>
          <CardDescription>Seu acesso está bloqueado por falta de pagamento.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={handlePagamento}><CreditCard className="mr-2" />Pagar Agora</Button>
          <p className="text-xs text-center text-muted-foreground">📞 Dúvidas? contato@splia.com</p>
        </CardContent>
      </Card>
    </div>
  );
}
