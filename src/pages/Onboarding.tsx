import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Onboarding() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo ao SPL IA!</h1>
          <p className="text-muted-foreground mt-2">
            Configure sua lavanderia em poucos passos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuração Inicial</CardTitle>
            <CardDescription>
              Formulário de onboarding será implementado aqui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em breve: formulário com dados da lavanderia, serviços, preços, etc.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
