"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';

export default function PaymentMockupPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = params?.id as string;
  const product = mockProducts.find(p => p.id === id);
  
  const startParam = searchParams?.get('start');
  const endParam = searchParams?.get('end');
  
  const [days, setDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState('');
  
  useEffect(() => {
    if (startParam && endParam) {
      const start = new Date(startParam);
      const end = new Date(endParam);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays > 0 ? diffDays : 0);
    }
  }, [startParam, endParam]);

  if (!product) return null;

  const grandTotal = (days * product.pricePerDay) + product.securityDeposit;

  const handlePay = () => {
    if (!method) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    setIsLoading(true);
    // Simulasi loading payment gateway
    setTimeout(() => {
      router.push('/payment-success');
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '2rem' }}>
      <div className="glass animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', borderRadius: '1rem', background: 'rgba(30, 41, 59, 0.9)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: 'var(--color-primary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            PAYMENT GATEWAY MOCKUP
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Total Pembayaran</h2>
          <div className="text-gradient-primary" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            Rp {grandTotal.toLocaleString('id-ID')}
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Order ID: TRX-{Math.floor(Math.random() * 1000000)}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#cbd5e1' }}>Pilih Metode Pembayaran</h3>
          
          <div className="flex flex-col gap-sm">
            {['Transfer BCA', 'Transfer Mandiri', 'GoPay / QRIS'].map((m) => (
              <div 
                key={m}
                onClick={() => setMethod(m)}
                style={{ 
                  padding: '1rem', 
                  border: `1px solid ${method === m ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`, 
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  background: method === m ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{m}</span>
                {method === m && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
              </div>
            ))}
          </div>
        </div>

        <button 
          className="btn btn-primary flex justify-center items-center gap-xs" 
          onClick={handlePay}
          disabled={isLoading}
          style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', position: 'relative', opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading && <Loader2 className="animate-spin" size={20} />}
          {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}>
            Batalkan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}
