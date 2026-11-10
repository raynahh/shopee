import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  TicketPercent,
  Check,
  Truck,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CartItem, Voucher } from '../types';
import { formatRupiah } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  availableVouchers: Voucher[];
  appliedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher | null) => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSelect,
  onSelectAll,
  availableVouchers,
  appliedVoucher,
  onApplyVoucher,
  onCheckoutSuccess,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'confirm' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'shopeepay' | 'cod' | 'bca'>('shopeepay');

  const selectedItems = cartItems.filter((item) => item.selected);
  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.code === 'SHOPEE50K' && subtotal >= appliedVoucher.minSpend) {
      discountAmount = 50000;
    } else if (appliedVoucher.code === 'ONGKIRNOL') {
      discountAmount = 15000; // Simulated free delivery discount
    } else if (appliedVoucher.code === 'CASHBACK10') {
      discountAmount = Math.min(25000, Math.round(subtotal * 0.1));
    }
  }

  const shippingCost = selectedItems.length > 0 ? (appliedVoucher?.code === 'ONGKIRNOL' ? 0 : 15000) : 0;
  const totalPayment = Math.max(0, subtotal - discountAmount + (appliedVoucher?.code === 'ONGKIRNOL' ? 0 : shippingCost));

  const handleApplyCode = (code: string) => {
    const found = availableVouchers.find((v) => v.code.toLowerCase() === code.trim().toLowerCase());
    if (found) {
      if (subtotal < found.minSpend) {
        setVoucherError(`Min. belanja ${formatRupiah(found.minSpend)} untuk voucher ini.`);
      } else {
        onApplyVoucher(found);
        setVoucherError('');
        setInputCode('');
      }
    } else {
      setVoucherError('Kode voucher tidak valid atau sudah habis.');
    }
  };

  const handleProcessCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep('success');
      onCheckoutSuccess();
    }, 1200);
  };

  const handleCloseAll = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ee4d2d] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {checkoutStep === 'cart'
                  ? `Keranjang Belanja (${cartItems.length})`
                  : checkoutStep === 'confirm'
                  ? 'Konfirmasi Pembelian'
                  : 'Pesanan Berhasil!'}
              </h2>
              {checkoutStep === 'cart' && (
                <p className="text-[11px] text-slate-400">Gratis ongkir tersedia untukmu</p>
              )}
            </div>
          </div>

          <button
            onClick={handleCloseAll}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content based on step */}
        {checkoutStep === 'cart' ? (
          cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-orange-50 text-[#ee4d2d] flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Keranjangmu Masih Kosong</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                Jelajahi promo Flash Sale dan produk terlaris kami, lalu tambahkan barang impianmu ke keranjang!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-[#ee4d2d] hover:bg-[#d83c1d] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Select All Checkbox */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="w-4 h-4 accent-[#ee4d2d] rounded cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800">
                    Pilih Semua ({cartItems.length})
                  </span>
                </label>
                <span className="text-slate-400">
                  {selectedItems.length} produk dipilih
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3 hover:border-orange-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => onToggleSelect(item.id)}
                      className="mt-2 w-4 h-4 accent-[#ee4d2d] rounded cursor-pointer shrink-0"
                    />

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                        {item.product.name}
                      </h4>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          Varian: <span className="font-medium text-slate-700">{item.selectedVariant}</span>
                        </p>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#ee4d2d] font-mono tabular-nums">
                          {formatRupiah(item.product.price)}
                        </span>

                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-md bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          aria-label="Hapus produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Selector Section */}
              <div className="p-3.5 bg-orange-50/70 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <TicketPercent className="w-4 h-4 text-[#ee4d2d]" />
                    <span>Voucher Shopee</span>
                  </div>
                  {appliedVoucher && (
                    <button
                      onClick={() => onApplyVoucher(null)}
                      className="text-[11px] text-red-600 hover:underline font-semibold"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                {appliedVoucher ? (
                  <div className="bg-white p-2.5 rounded-lg border border-orange-300 flex items-center justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold bg-[#ee4d2d] text-white px-1.5 py-0.5 rounded">
                        {appliedVoucher.code}
                      </span>
                      <p className="text-xs font-medium text-slate-800 mt-1">
                        {appliedVoucher.title}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Masukkan kode promo (misal: SHOPEE50K)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#ee4d2d]"
                      />
                      <button
                        onClick={() => handleApplyCode(inputCode)}
                        className="px-3 py-1.5 bg-[#ee4d2d] text-white text-xs font-semibold rounded-lg hover:bg-[#d83c1d] transition-colors"
                      >
                        Pakai
                      </button>
                    </div>

                    {voucherError && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{voucherError}</p>
                    )}

                    {/* Quick clickable vouchers */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {availableVouchers.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => handleApplyCode(v.code)}
                          className="text-[10px] bg-white hover:bg-orange-100 text-slate-700 hover:text-[#ee4d2d] border border-orange-200 px-2 py-1 rounded font-mono font-medium transition-colors"
                        >
                          +{v.code} ({v.type === 'shipping' ? 'Ongkir Rp0' : v.code})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : checkoutStep === 'confirm' ? (
          /* Confirmation Screen */
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {/* Delivery address */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                📍 Alamat Pengiriman
              </span>
              <p className="font-semibold text-slate-900">Rayhan Alghifari (0812-3456-7890)</p>
              <p className="text-slate-600 mt-0.5">
                Jl. Kebon Jeruk Raya No. 42, RT 03 / RW 05, Kebon Jeruk, Jakarta Barat, DKI Jakarta, 11530
              </p>
            </div>

            {/* Selected Payment Method */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2">
                💳 Pilih Metode Pembayaran
              </span>
              <div className="space-y-2">
                {[
                  { id: 'shopeepay', label: 'ShopeePay (Saldo: Rp850.000)', desc: 'Gratis biaya admin + Extra koin' },
                  { id: 'cod', label: 'COD (Bayar di Tempat)', desc: 'Bayar tunai ke kurir saat barang tiba' },
                  { id: 'bca', label: 'BCA Virtual Account', desc: 'Verifikasi instan otomatis' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === m.id
                        ? 'border-[#ee4d2d] bg-orange-50/50'
                        : 'border-slate-200 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id as any)}
                      className="mt-0.5 accent-[#ee4d2d]"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{m.label}</p>
                      <p className="text-[10px] text-slate-500">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Item summary */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2">
                Rincian Pesanan ({selectedItems.length} barang)
              </span>
              <div className="space-y-1.5 text-slate-600">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[11px]">
                    <span className="truncate max-w-[200px]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Pembayaran Berhasil!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
              Pesananmu sedang diproses oleh penjual. Nomor Resi pengiriman akan diperbarui dalam beberapa jam.
            </p>
            <div className="my-4 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 w-full border border-slate-200">
              NO. PESANAN: <span className="font-bold text-[#ee4d2d]">SN-20261109-9041</span>
            </div>
            <button
              onClick={handleCloseAll}
              className="mt-2 w-full py-2.5 bg-[#ee4d2d] hover:bg-[#d83c1d] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}

        {/* Footer Checkout Bar */}
        {cartItems.length > 0 && checkoutStep !== 'success' && (
          <div className="p-4 border-t border-slate-100 bg-white space-y-3 sticky bottom-0">
            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal Produk</span>
                <span className="font-mono tabular-nums">{formatRupiah(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Diskon Voucher</span>
                  <span className="font-mono tabular-nums">-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Ongkos Kirim
                </span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold">GRATIS</span>
                  ) : (
                    formatRupiah(shippingCost)
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Total Pembayaran</span>
                  <span className="text-[10px] text-slate-400">Termasuk PPN & Asuransi</span>
                </div>
                <span className="text-lg font-black text-[#ee4d2d] font-mono tabular-nums">
                  {formatRupiah(totalPayment)}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('confirm')}
                disabled={selectedItems.length === 0}
                className="w-full py-3 bg-[#ee4d2d] hover:bg-[#d83c1d] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Checkout ({selectedItems.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handleProcessCheckout}
                  disabled={isCheckingOut}
                  className="py-2.5 bg-[#ee4d2d] hover:bg-[#d83c1d] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  {isCheckingOut ? (
                    <span>Memproses...</span>
                  ) : (
                    <>
                      <span>Bayar Sekarang</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
