import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Smartphone, CreditCard, Settings, Sticker, TestTube2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LavanderiaData {
  nome_lavanderia: string;
  status_whatsapp: string;
  assinatura_status: string;
  data_vencimento: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lavanderia, setLavanderia] = useState<LavanderiaData | null>(null);
  const [mensagensHoje, setMensagensHoje] = useState(0);
  const [contatosColetados, setContatosColetados] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Buscar dados da lavanderia
        const { data: lavanderiaData, error: lavanderiaError } = await supabase
          .from('lavanderias')
          .select('nome_lavanderia, status_whatsapp, assinatura_status, data_vencimento')
          .eq('email_usuario', user.email)
          .single();

        if (lavanderiaError) throw lavanderiaError;

        if (lavanderiaData) {
          setLavanderia(lavanderiaData);

          // Verificar se está bloqueado
          if (lavanderiaData.assinatura_status === 'blocked') {
            navigate('/assinatura-bloqueada');
            return;
          }

          // Buscar mensagens de hoje
          const hoje = new Date().toISOString().split('T')[0];
          const { count: msgCount } = await supabase
            .from('historico_mensagens')
            .select('*', { count: 'exact', head: true })
            .eq('lavanderia_id', user.id)
            .gte('created_at', hoje);

          setMensagensHoje(msgCount || 0);

          // Buscar contatos coletados
          const { count: contatosCount } = await supabase
            .from('contatos_marketing')
            .select('*', { count: 'exact', head: true })
            .eq('lavanderia_id', user.id);

          setContatosColetados(contatosCount || 0);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível carregar os dados do dashboard.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [user, navigate, toast]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '--/--/----';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Olá, {lavanderia?.nome_lavanderia || 'Usuário'}! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo ao painel do SPL IA
            </p>
          </div>
          <Badge variant={lavanderia?.status_whatsapp === 'conectado' ? 'default' : 'destructive'}>
            {lavanderia?.status_whatsapp === 'conectado' ? '✅ WhatsApp Conectado' : '❌ Desconectado'}
          </Badge>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Status WhatsApp</CardTitle>
              <Smartphone className="h-8 w-8 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lavanderia?.status_whatsapp === 'conectado' ? 'Conectado' : 'Desconectado'}
              </div>
              {lavanderia?.status_whatsapp !== 'conectado' && (
                <Button 
                  size="sm" 
                  className="mt-3 w-full" 
                  onClick={() => navigate('/conectar-whatsapp')}
                >
                  Reconectar
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Hoje</CardTitle>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mensagensHoje}</div>
              <p className="text-xs text-muted-foreground mt-1">
                mensagens atendidas hoje
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contatos Coletados</CardTitle>
              <Users className="h-8 w-8 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{contatosColetados}</div>
              <p className="text-xs text-muted-foreground mt-1">
                contatos no banco de dados
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Próxima Cobrança</CardTitle>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 39,90</div>
              <p className="text-xs text-muted-foreground mt-1">
                Vencimento: {formatDate(lavanderia?.data_vencimento || '')}
              </p>
              <Button 
                size="sm" 
                variant="link" 
                className="mt-2 p-0 h-auto"
                onClick={() => navigate('/assinatura')}
              >
                Ver detalhes →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button 
                className="h-auto py-6 flex-col gap-2" 
                variant="outline"
                onClick={() => navigate('/configuracoes')}
              >
                <Settings className="h-8 w-8" />
                <span className="text-base font-medium">Configurar Lavanderia</span>
              </Button>
              <Button 
                className="h-auto py-6 flex-col gap-2" 
                variant="outline"
                onClick={() => navigate('/adesivos')}
              >
                <Sticker className="h-8 w-8" />
                <span className="text-base font-medium">Gerar Adesivos</span>
              </Button>
              <Button 
                className="h-auto py-6 flex-col gap-2" 
                variant="outline"
                onClick={() => {
                  if (lavanderia?.status_whatsapp === 'conectado') {
                    toast({
                      title: 'WhatsApp Ativo',
                      description: 'Seu WhatsApp está funcionando perfeitamente!',
                    });
                  } else {
                    navigate('/conectar-whatsapp');
                  }
                }}
              >
                <TestTube2 className="h-8 w-8" />
                <span className="text-base font-medium">Testar WhatsApp</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas interações do seu bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mensagensHoje === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma atividade ainda. Conecte seu WhatsApp para começar!
              </p>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                {mensagensHoje} mensagens processadas hoje
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
