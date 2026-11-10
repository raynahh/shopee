import React, { useState } from 'react';
import { X, TicketPercent, Check, Copy, Sparkles, Clock } from 'lucide-react';
import { Voucher } from '../types';

interface PromoVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: Voucher[];
  onApplyVoucher: (voucher: Voucher) => void;
}

export const PromoVoucherModal: React.FC<PromoVoucherModalProps> = ({
  isOpen,
  onClose,
  vouchers,
  onApplyVoucher,
}) => {
  if (!isOpen) return null;

  const [claimedCodes, setClaimedCodes] = useState<string[]>([]);

  const handleClaim = (voucher: Voucher) => {
    if (!claimedCodes.includes(voucher.code)) {
      setClaimedCodes((prev) => [...prev, voucher.code]);
    }
    onApplyVoucher(voucher);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ee4d2d] to-[#ff7337] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TicketPercent className="w-6 h-6" />
            <div>
              <h2 className="text-base font-bold">Pusat Voucher Shopee</h2>
              <p className="text-xs text-orange-100">Klaim voucher dan gunakan saat checkout</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 space-y-3.5 max-h-[60vh] overflow-y-auto">
          {vouchers.map((voucher) => {
            const isClaimed = claimedCodes.includes(voucher.code);
            return (
              <div
                key={voucher.id}
                className="flex items-stretch border border-orange-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm transition-shadow bg-white"
              >
                {/* Left Ticket Stub */}
                <div className="w-24 bg-gradient-to-b from-orange-500 to-red-500 text-white p-3 flex flex-col justify-center items-center text-center shrink-0 relative">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                    {voucher.type === 'shipping' ? 'GRATIS ONGKIR' : 'DISKON'}
                  </span>
                  <span className="text-xs font-black mt-1 font-mono">{voucher.code}</span>
                  {/* Decorative notch */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />
                </div>

                {/* Right Info */}
                <div className="flex-1 p-3.5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {voucher.title}
                    </h3>
                    <p className="text-[11px] text-[#ee4d2d] font-semibold mt-0.5">
                      {voucher.discountText}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{voucher.expiresIn}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex justify-end">
                    <button
                      onClick={() => handleClaim(voucher)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isClaimed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#ee4d2d] hover:bg-[#d83c1d] text-white shadow-xs'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Sudah Diklaim</span>
                        </>
                      ) : (
                        <span>Klaim Sekarang</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
