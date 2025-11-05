import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function ConectarWhatsApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'waiting' | 'connected' | 'error'>('loading');
  const [timeLeft, setTimeLeft] = useState(60);
  const [instanceId, setInstanceId] = useState<string>('');

  useEffect(() => {
    // Buscar QR Code do localStorage
    const qrTemp = localStorage.getItem('qrcode_temp');
    if (qrTemp) {
      setQrCode(qrTemp);
      setStatus('waiting');
    } else {
      setStatus('error');
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'QR Code não encontrado. Complete o onboarding novamente.',
      });
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (status !== 'waiting') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus('error');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Polling para verificar conexão
  useEffect(() => {
    if (!user || status !== 'waiting') return;

    const checkConnection = async () => {
      try {
        const { data: lavanderia } = await supabase
          .from('lavanderias')
          .select('instancia_evolution_id')
          .eq('email_usuario', user.email)
          .single();

        if (!lavanderia?.instancia_evolution_id) return;

        setInstanceId(lavanderia.instancia_evolution_id);

        const response = await axios.get(
          `https://preciousbeetle-evolution.cloudfy.live/instance/connectionState/${lavanderia.instancia_evolution_id}`,
          { headers: { apikey: 'LJSsP1Xgxb5KsV5quKgMn2aNqEhrNcKO' } }
        );

        if (response.data.state === 'open') {
          await supabase
            .from('lavanderias')
            .update({ status_whatsapp: 'conectado' })
            .eq('email_usuario', user.email);

          setStatus('connected');
          toast({
            title: 'Conectado!',
            description: 'WhatsApp conectado com sucesso.',
          });
          
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
      }
    };

    const interval = setInterval(checkConnection, 5000);
    checkConnection(); // Verificar imediatamente

    return () => clearInterval(interval);
  }, [user, status, navigate, toast]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleForceCheck = async () => {
    setStatus('loading');
    try {
      const { data: lavanderia } = await supabase
        .from('lavanderias')
        .select('instancia_evolution_id')
        .eq('email_usuario', user?.email)
        .single();

      if (lavanderia?.instancia_evolution_id) {
        const response = await axios.get(
          `https://preciousbeetle-evolution.cloudfy.live/instance/connectionState/${lavanderia.instancia_evolution_id}`,
          { headers: { apikey: 'LJSsP1Xgxb5KsV5quKgMn2aNqEhrNcKO' } }
        );

        if (response.data.state === 'open') {
          await supabase
            .from('lavanderias')
            .update({ status_whatsapp: 'conectado' })
            .eq('email_usuario', user?.email);
          
          setStatus('connected');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setStatus('waiting');
        }
      }
    } catch (error) {
      setStatus('error');
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível verificar a conexão.',
      });
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Conectar WhatsApp</h1>
              <p className="text-muted-foreground">
                Siga os passos abaixo para conectar seu WhatsApp
              </p>
            </div>

            {/* Instruções */}
            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <p className="pt-1">📱 Abra o WhatsApp no celular</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <p className="pt-1">⋮ Vá em Mais opções</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <p className="pt-1">🔗 Aparelhos conectados</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <p className="pt-1">📷 Conectar um aparelho</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  5
                </div>
                <p className="pt-1">✅ Escaneie o código abaixo</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center mb-6">
              {status === 'loading' && (
                <div className="flex items-center justify-center w-[300px] h-[300px] bg-muted rounded-lg">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              )}
              
              {status === 'waiting' && qrCode && (
                <div className="relative">
                  <img
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QR Code"
                    className="w-[300px] h-[300px] rounded-lg shadow-lg"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Expira em: <span className="font-bold text-primary">{timeLeft}s</span>
                    </p>
                  </div>
                </div>
              )}

              {status === 'connected' && (
                <div className="flex flex-col items-center justify-center w-[300px] h-[300px] bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    Conectado!
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex flex-col items-center justify-center w-[300px] h-[300px] bg-destructive/10 rounded-lg">
                  <div className="text-6xl mb-4">❌</div>
                  <p className="text-xl font-bold text-destructive">
                    {timeLeft === 0 ? 'QR Code Expirado' : 'Erro na Conexão'}
                  </p>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              {status === 'waiting' && (
                <Badge className="animate-pulse" variant="secondary">
                  ⏳ Aguardando conexão...
                </Badge>
              )}
              {status === 'connected' && (
                <Badge className="bg-green-500">✅ Conectado!</Badge>
              )}
              {status === 'error' && (
                <Badge variant="destructive">❌ Erro na conexão</Badge>
              )}
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-3">
              {(status === 'error' || timeLeft === 0) && (
                <Button onClick={handleRefresh} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Gerar novo QR Code
                </Button>
              )}
              
              {status === 'waiting' && (
                <Button onClick={handleForceCheck} variant="secondary" className="w-full">
                  ✅ Já conectei
                </Button>
              )}
              
              <Button
                onClick={() => navigate('/onboarding')}
                variant="outline"
                className="w-full"
              >
                ← Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
