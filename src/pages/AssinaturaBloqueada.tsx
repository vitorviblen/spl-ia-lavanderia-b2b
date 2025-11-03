import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CreditCard } from 'lucide-react';

export default function AssinaturaBloqueada() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-destructive/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Assinatura Vencida</CardTitle>
          <CardDescription>
            Sua assinatura está inativa. Renove para continuar usando o SPL IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Por que minha conta foi bloqueada?</h3>
            <p className="text-sm text-muted-foreground">
              Não identificamos o pagamento da sua assinatura. Para continuar usando todos os recursos do SPL IA, é necessário manter sua assinatura ativa.
            </p>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Renovar Assinatura
            </Button>
            <Button variant="outline" className="w-full">
              Falar com Suporte
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Tem dúvidas? Entre em contato conosco pelo suporte@splia.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
