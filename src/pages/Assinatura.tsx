import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface AssinaturaData {
  assinatura_status: string;
  data_vencimento: string;
  data_cancelamento: string | null;
  valor_mensal: number;
}

export default function Assinatura() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assinatura, setAssinatura] = useState<AssinaturaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('lavanderias')
          .select('assinatura_status, data_vencimento, data_cancelamento, valor_mensal')
          .eq('email_usuario', user.email)
          .single();
        if (error) throw error;
        setAssinatura(data);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Erro ao carregar.' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, toast]);

  const handlePagamento = () => window.open(`https://pay.cakto.com.br/renovar-splia?email=${user?.email}`, '_blank');

  if (loading) return <MainLayout><div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div></MainLayout>;

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Assinatura</h1>
        <Card>
          <CardHeader>
            <CardTitle>Status: {assinatura?.assinatura_status}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handlePagamento}><CreditCard className="mr-2" />Pagar</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
