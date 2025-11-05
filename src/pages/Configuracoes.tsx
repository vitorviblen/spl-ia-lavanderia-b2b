import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Configuracoes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [nome, setNome] = useState('');
  const [wifi, setWifi] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data } = await supabase.from('lavanderias').select('*').eq('email_usuario', user.email).single();
      if (data) {
        setNome(data.nome_lavanderia || '');
        setWifi(data.nome_wifi || '');
      }
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
    await supabase.from('lavanderias').update({ nome_lavanderia: nome, nome_wifi: wifi }).eq('email_usuario', user?.email);
    toast({ title: 'Salvo!' });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <Card>
          <CardHeader><CardTitle>Dados</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Nome</Label><Input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div><Label>Wi-Fi</Label><Input value={wifi} onChange={(e) => setWifi(e.target.value)} /></div>
            <Button onClick={handleSave}><Save className="mr-2" />Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
