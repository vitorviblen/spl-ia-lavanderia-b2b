import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { HexColorPicker } from 'react-colorful';
import InputMask from 'react-input-mask';
import axios from 'axios';
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Wifi,
  MapPin,
  Palette,
  Loader2,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

const step1Schema = z.object({
  nome_lavanderia: z.string().min(1, 'Nome da lavanderia é obrigatório'),
  telefone: z.string().min(15, 'Telefone inválido').regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido'),
});

const step2Schema = z.object({
  nome_wifi: z.string().optional(),
  senha_wifi: z.string().optional(),
  link_maps: z.string().url('Link do Google Maps inválido').or(z.literal('')).optional(),
});

const step3Schema = z.object({
  cor_primaria: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida'),
  cor_secundaria: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showWifiPassword, setShowWifiPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome_lavanderia: '',
    telefone: '',
    nome_wifi: '',
    senha_wifi: '',
    link_maps: '',
    cor_primaria: '#2563eb',
    cor_secundaria: '#10b981',
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nome_lavanderia: formData.nome_lavanderia,
      telefone: formData.telefone,
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      nome_wifi: formData.nome_wifi,
      senha_wifi: formData.senha_wifi,
      link_maps: formData.link_maps,
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      cor_primaria: formData.cor_primaria,
      cor_secundaria: formData.cor_secundaria,
    },
  });

  const progressPercentage = (currentStep / 3) * 100;

  const handleStep1Next = (data: Step1Data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Next = (data: Step2Data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handleStep3Submit = async (data: Step3Data) => {
    setIsLoading(true);
    const finalData = { ...formData, ...data };

    try {
      // TODO: Substituir pela URL real do N8N
      const response = await axios.post(
        'https://seu-n8n.com/webhook/cadastro-lavanderia',
        {
          email: user?.email,
          ...finalData,
        }
      );

      // Salvar QR code temporariamente
      if (response.data?.qrcode) {
        localStorage.setItem('qrcode_temp', response.data.qrcode);
      }

      toast({
        title: 'Lavanderia configurada!',
        description: 'Agora vamos conectar seu WhatsApp.',
      });

      navigate('/conectar-whatsapp');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao configurar',
        description: 'Não foi possível completar o cadastro. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
              currentStep >= step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {currentStep > step ? <Check className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-1 transition-colors ${
                currentStep > step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">SPL IA</h1>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercentage} className="h-2" />

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <Card>
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Configure sua Lavanderia</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={step1Form.handleSubmit(handleStep1Next)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome_lavanderia">Nome da Lavanderia *</Label>
                    <Input
                      id="nome_lavanderia"
                      placeholder="Ex: Lavanderia São João"
                      {...step1Form.register('nome_lavanderia')}
                    />
                    {step1Form.formState.errors.nome_lavanderia && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.nome_lavanderia.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Número WhatsApp *</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <InputMask
                        mask="(99) 99999-9999"
                        {...step1Form.register('telefone')}
                      >
                        {/* @ts-ignore */}
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            id="telefone"
                            placeholder="(11) 99999-9999"
                            className="pl-10"
                          />
                        )}
                      </InputMask>
                    </div>
                    {step1Form.formState.errors.telefone && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.telefone.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Próximo <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Wi-Fi e Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={step2Form.handleSubmit(handleStep2Next)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome_wifi">Nome da Rede Wi-Fi</Label>
                    <div className="relative">
                      <Wifi className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="nome_wifi"
                        placeholder="Ex: WiFi_Lavanderia"
                        className="pl-10"
                        {...step2Form.register('nome_wifi')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senha_wifi">Senha do Wi-Fi</Label>
                    <div className="relative">
                      <Input
                        id="senha_wifi"
                        type={showWifiPassword ? 'text' : 'password'}
                        placeholder="********"
                        {...step2Form.register('senha_wifi')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowWifiPassword(!showWifiPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showWifiPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link_maps">Link Google Maps</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="link_maps"
                        type="url"
                        placeholder="https://maps.google.com/..."
                        className="pl-10"
                        {...step2Form.register('link_maps')}
                      />
                    </div>
                    {step2Form.formState.errors.link_maps && (
                      <p className="text-sm text-destructive">
                        {step2Form.formState.errors.link_maps.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                      size="lg"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" /> Voltar
                    </Button>
                    <Button type="submit" className="flex-1" size="lg">
                      Próximo <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Cores da sua Marca</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={step3Form.handleSubmit(handleStep3Submit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Cor Primária</Label>
                      <div className="flex items-center gap-3">
                        <HexColorPicker
                          color={formData.cor_primaria}
                          onChange={(color) => {
                            setFormData({ ...formData, cor_primaria: color });
                            step3Form.setValue('cor_primaria', color);
                          }}
                          style={{ width: '100%', height: '150px' }}
                        />
                      </div>
                      <Input
                        value={formData.cor_primaria}
                        readOnly
                        className="font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Cor Secundária</Label>
                      <div className="flex items-center gap-3">
                        <HexColorPicker
                          color={formData.cor_secundaria}
                          onChange={(color) => {
                            setFormData({ ...formData, cor_secundaria: color });
                            step3Form.setValue('cor_secundaria', color);
                          }}
                          style={{ width: '100%', height: '150px' }}
                        />
                      </div>
                      <Input
                        value={formData.cor_secundaria}
                        readOnly
                        className="font-mono"
                      />
                    </div>
                  </div>

                  {/* Preview do Adesivo */}
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Palette className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Preview do adesivo com as cores selecionadas
                    </p>
                    <div className="flex gap-2 justify-center mt-4">
                      <div
                        className="w-16 h-16 rounded"
                        style={{ backgroundColor: formData.cor_primaria }}
                      />
                      <div
                        className="w-16 h-16 rounded"
                        style={{ backgroundColor: formData.cor_secundaria }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                      size="lg"
                      disabled={isLoading}
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" /> Voltar
                    </Button>
                    <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Configurando...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-5 w-5" /> Finalizar
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        {/* Indicador do passo */}
        <p className="text-center text-sm text-muted-foreground">
          Passo {currentStep} de 3
        </p>
      </div>
    </div>
  );
}
