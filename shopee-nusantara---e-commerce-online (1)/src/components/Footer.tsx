import React from 'react';
import { ShieldCheck, Truck, CreditCard, Award, Headphones, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-white border-t border-slate-200 text-slate-600 text-xs">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ee4d2d] flex items-center justify-center mb-2">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Gratis Ongkir</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Ke seluruh pelosok Indonesia</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ee4d2d] flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Garansi 100% Original</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Jaminan uang kembali jika palsu</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ee4d2d] flex items-center justify-center mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Pembayaran Aman</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">ShopeePay, COD & Bank Transfer</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ee4d2d] flex items-center justify-center mb-2">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Layanan 24/7</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Customer service siap melayani</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-2 text-slate-500 text-[11px]">
              <li className="hover:text-[#ee4d2d] cursor-pointer">Pusat Bantuan</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Cara Pembelian</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Pengiriman & Pelacakan</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Garansi Shopee</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Hubungi Kami</li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Jelajahi Shopee
            </h4>
            <ul className="space-y-2 text-slate-500 text-[11px]">
              <li className="hover:text-[#ee4d2d] cursor-pointer">Tentang Kami</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Karir</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Kebijakan Privasi</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Shopee Mall</li>
              <li className="hover:text-[#ee4d2d] cursor-pointer">Flash Sale Harian</li>
            </ul>
          </div>

          {/* Col 3: Pembayaran & Pengiriman */}
          <div className="col-span-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Metode Pembayaran
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {['ShopeePay', 'COD', 'BCA', 'Mandiri', 'BNI', 'BRI', 'Indomaret', 'Alfamart'].map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200 text-[10px] font-semibold text-slate-700"
                >
                  {p}
                </span>
              ))}
            </div>

            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
              Jasa Pengiriman
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Shopee Xpress', 'J&T Express', 'SiCepat', 'JNE', 'Ninja Van', 'GoSend', 'GrabExpress'].map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200 text-[10px] font-semibold text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Download App */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Download Aplikasi
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-[#ee4d2d]" />
                <div>
                  <p className="text-[10px] text-slate-400">Tersedia di</p>
                  <p className="text-xs font-bold text-slate-800">Google Play & App Store</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Scan kode QR atau cari "Shopee" di toko aplikasi smartphone kamu.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 Shopee Nusantara. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <span>Negara: Indonesia</span>
            <span>·</span>
            <span>Singapura</span>
            <span>·</span>
            <span>Malaysia</span>
            <span>·</span>
            <span>Thailand</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
