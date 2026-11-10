import React, { useState } from 'react';
import { Smartphone, Download, Share2, X, PlusSquare, MoreVertical, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');

  // If already running standalone on home screen, do not show
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 bg-yellow-300 hover:bg-yellow-400 text-slate-900 px-2.5 py-1 rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
          title="Pasang aplikasi ke layar beranda HP"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#ee4d2d]" />
          <span className="hidden sm:inline">Pasang di Beranda HP</span>
          <span className="sm:hidden">Pasang App</span>
        </button>
      )}

      {/* Interactive Mobile Installation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#ee4d2d] to-[#ff6433] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-[#ee4d2d] flex items-center justify-center font-bold shadow-sm">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight">Pasang di Beranda HP</h3>
                  <p className="text-xs text-white/80">Buka langsung seperti aplikasi asli</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'android'
                    ? 'border-[#ee4d2d] text-[#ee4d2d] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Android (Chrome)</span>
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'ios'
                    ? 'border-[#ee4d2d] text-[#ee4d2d] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>iPhone / iPad (Safari)</span>
              </button>
            </div>

            {/* Instructions Body */}
            <div className="p-5 text-slate-700 text-xs space-y-4">
              {activeTab === 'android' ? (
                <>
                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Tombol Otomatis</p>
                      <p className="text-[11px] text-slate-600">Klik tombol ini untuk instal instan</p>
                    </div>
                    {isInstallable ? (
                      <button
                        onClick={async () => {
                          await install();
                          setShowModal(false);
                        }}
                        className="px-3 py-1.5 bg-[#ee4d2d] text-white font-bold rounded-lg hover:bg-[#d83c1d] transition-colors"
                      >
                        Instal Sekarang
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 bg-slate-200 px-2 py-1 rounded">
                        Gunakan Cara Manual
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-slate-900 text-sm">Cara Manual di Google Chrome:</p>
                  <ol className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <div>
                        Buka website ini di <strong>Google Chrome</strong> di HP Anda.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <div>
                        Ketuk tombol <strong>menu titik tiga (⋮)</strong> di pojok kanan atas browser Chrome.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                      <div>
                        Pilih <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Instal Aplikasi"</strong>.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                      <div>
                        Ketuk <strong>"Instal"</strong>. Ikon Shopee Nusantara akan muncul di beranda HP Anda!
                      </div>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-900 text-sm">Cara di iPhone / iPad (Safari):</p>
                  <ol className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <div>
                        Buka website ini menggunakan browser <strong>Safari</strong> bawaan Apple.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <div>
                        Ketuk ikon <strong>Bagikan / Share</strong> (persegi dengan panah mengarah ke atas) di bilah bawah Safari.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                      <div>
                        Gulir menu ke bawah lalu ketuk <strong>"Tambah ke Layar Utama"</strong> (<em>Add to Home Screen</em>).
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                      <div>
                        Ketuk <strong>"Tambah"</strong> di pojok kanan atas. Ikon Shopee Nusantara akan langsung terpasang di layar utama iPhone Anda!
                      </div>
                    </li>
                  </ol>
                </>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Setelah terpasang, aplikasi berjalan layar penuh (fullscreen) tanpa bar URL browser.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 bg-[#ee4d2d] hover:bg-[#d83c1d] text-white font-bold rounded-xl text-xs transition-colors"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
