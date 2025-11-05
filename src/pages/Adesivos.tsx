import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

export default function Adesivos() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data } = await supabase.from('lavanderias').select('*').eq('email_usuario', user.email).single();
      if (data) {
        const msg = encodeURIComponent('Oi, preciso de ajuda!');
        const tel = data.telefone_whatsapp.replace(/\D/g, '');
        const qr = await QRCode.toDataURL(`https://wa.me/55${tel}?text=${msg}`, { width: 300 });
        setQrCode(qr);
      }
    };
    fetchData();
  }, [user]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Adesivos QR Code</h1>
        <Card>
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent className="text-center">
            {qrCode && <img src={qrCode} alt="QR" className="mx-auto w-64" />}
            <Button className="mt-4"><Download className="mr-2" />Baixar</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
