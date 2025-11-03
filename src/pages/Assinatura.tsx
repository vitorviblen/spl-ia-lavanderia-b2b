import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: 'R$ 97',
    period: '/mês',
    features: [
      'Até 500 conversas/mês',
      'IA básica de atendimento',
      'Integração WhatsApp',
      'Dashboard de métricas',
    ],
  },
  {
    name: 'Profissional',
    price: 'R$ 197',
    period: '/mês',
    features: [
      'Até 2.000 conversas/mês',
      'IA avançada personalizada',
      'Múltiplos WhatsApp',
      'Dashboard completo',
      'Suporte prioritário',
    ],
    recommended: true,
  },
  {
    name: 'Empresarial',
    price: 'R$ 397',
    period: '/mês',
    features: [
      'Conversas ilimitadas',
      'IA premium personalizada',
      'Múltiplos WhatsApp',
      'Dashboard avançado',
      'Suporte VIP 24/7',
      'API personalizada',
    ],
  },
];

export default function Assinatura() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Assinatura</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seu plano e pagamento
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plano Atual</CardTitle>
            <CardDescription>
              Seu plano e status de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Plano Trial</p>
                <p className="text-sm text-muted-foreground">Válido até 30 dias após cadastro</p>
              </div>
              <Badge variant="secondary">Ativo</Badge>
            </div>
            <Button className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Assinar Plano
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Escolha seu Plano</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.recommended ? 'border-primary shadow-lg' : ''}>
                <CardHeader>
                  {plan.recommended && (
                    <Badge className="w-fit mb-2">Recomendado</Badge>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? 'default' : 'outline'}
                  >
                    Selecionar Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
