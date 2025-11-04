import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    }
  });

  useEffect(() => {
    if (user) {
      checkOnboardingStatus();
    }
  }, [user, navigate]);

  const checkOnboardingStatus = async () => {
    if (!user?.email) return;

    try {
      const { data: lavanderia } = await supabase
        .from('lavanderias')
        .select('nome_lavanderia')
        .eq('email_usuario', user.email)
        .single();

      if (!lavanderia?.nome_lavanderia) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      // Se não existe a tabela ainda, vai para dashboard
      navigate('/dashboard');
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao entrar',
          description: error.message === 'Invalid login credentials' 
            ? 'Email ou senha incorretos' 
            : error.message,
        });
        return;
      }

      if (authData.user) {
        const { data: lavanderia } = await supabase
          .from('lavanderias')
          .select('nome_lavanderia')
          .eq('email_usuario', authData.user.email)
          .single();

        if (!lavanderia?.nome_lavanderia) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: CheckCircle2, text: 'Atendimento 24/7 com IA' },
    { icon: CheckCircle2, text: 'WhatsApp integrado' },
    { icon: CheckCircle2, text: 'Adesivos QR personalizados' },
    { icon: CheckCircle2, text: 'Gestão de Wi-Fi' },
    { icon: CheckCircle2, text: 'Suporte dedicado' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Formulário - Esquerda */}
      <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">SPL IA</h1>
            <h2 className="text-2xl font-semibold text-foreground">Bem-vindo de volta</h2>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" {...register('rememberMe')} />
              <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                Lembrar-me
              </Label>
            </div>

            {/* Botão Entrar */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            {/* Esqueceu a senha */}
            <div className="text-center">
              <button
                type="button"
                disabled
                className="text-sm text-muted-foreground cursor-not-allowed"
              >
                Esqueceu a senha?
              </button>
            </div>
          </form>

          {/* Rodapé */}
          <div className="text-center text-sm text-muted-foreground">
            Ainda não assinou?{' '}
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </div>

      {/* Benefícios - Direita (oculto no mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary via-primary to-accent p-12 items-center justify-center">
        <div className="max-w-md space-y-8 text-white">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Automatize sua Lavanderia
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Transforme seu atendimento com inteligência artificial
            </p>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                  <benefit.icon className="w-4 h-4" />
                </div>
                <p className="text-lg font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-primary-foreground/80">
              Junte-se a centenas de lavanderias que já automatizaram seu atendimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
