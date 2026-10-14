import React, { useState } from 'react';
import { Calculator, Check, AlertCircle, Wrench, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { REPAIR_PRICING } from '../data/helplineData';
import { RepairPriceEstimate } from '../types';

interface RepairCostCalculatorProps {
  onBookAppointment: (model: string, serviceType: string) => void;
  onCallForEstimate: () => void;
}

export const RepairCostCalculator: React.FC<RepairCostCalculatorProps> = ({
  onBookAppointment,
  onCallForEstimate
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('iphone');
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 16 Pro Max');

  const modelsForProduct = Array.from(
    new Set(REPAIR_PRICING.filter((p) => p.productId === selectedProduct).map((p) => p.model))
  );

  const availableRepairs = REPAIR_PRICING.filter(
    (p) => p.productId === selectedProduct && p.model === selectedModel
  );

  const handleProductChange = (prodId: string) => {
    setSelectedProduct(prodId);
    const firstModel = REPAIR_PRICING.find((p) => p.productId === prodId)?.model;
    if (firstModel) setSelectedModel(firstModel);
  };

  return (
    <section id="repair-costs" className="py-14 bg-[#f5f5f7] border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            <Calculator className="w-4 h-4" />
            <span>Transparent Pricing Matrix</span>
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Official Apple Repair Cost Estimator
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            All repairs are performed by Apple-certified technicians using genuine Apple parts, precision tools, and factory calibration.
          </p>
        </div>

        {/* Product & Model Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-100">
            {/* Product Segmented Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => handleProductChange('iphone')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedProduct === 'iphone'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                iPhone
              </button>
              <button
                onClick={() => handleProductChange('mac')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedProduct === 'mac'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mac
              </button>
              <button
                onClick={() => handleProductChange('ipad')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedProduct === 'ipad'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                iPad
              </button>
              <button
                onClick={() => handleProductChange('watch')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedProduct === 'watch'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Apple Watch
              </button>
            </div>

            {/* Model Selector Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {modelsForProduct.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="pt-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Service / Component</th>
                  <th className="pb-3 text-right">With AppleCare+</th>
                  <th className="pb-3 text-right">Estimated Out-of-Warranty</th>
                  <th className="pb-3 pl-6">Estimated Turnaround</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {availableRepairs.map((repair, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 pl-2 font-medium text-slate-900">
                      <div className="font-semibold">{repair.serviceType}</div>
                      <div className="text-[11px] text-slate-500">Genuine Apple Factory Part</div>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-emerald-700 font-mono text-sm tabular-nums">
                        {repair.appleCarePrice === 0 ? '$0 (Free)' : `$${repair.appleCarePrice}`}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-semibold text-slate-900 font-mono text-sm tabular-nums">
                        ${repair.outOfWarrantyPrice}
                      </span>
                    </td>
                    <td className="py-4 pl-6 text-slate-600">{repair.estimatedTurnaround}</td>
                    <td className="py-4 text-right pr-2">
                      <button
                        onClick={() => onBookAppointment(repair.model, repair.serviceType)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        Book Repair
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality Split Banner: Photo of AppleCare workbench with genuine parts promise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="lg:col-span-5 h-64 lg:h-full">
            <img
              src="/src/assets/images/apple_technician_care_1792018119692.jpg"
              alt="Certified Apple technician calibrating hardware"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Apple Certified Service Standards</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-3">
              Why Genuine Apple Parts Matter
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Sensor Calibration:</strong> Screen replacements are calibrated with Apple factory software to retain Face ID, True Tone, and ProMotion refresh rates.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Preserved Water Resistance:</strong> Re-sealed with authentic OEM acoustic and ingress gaskets tested under positive air pressure.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>90-Day Apple Warranty:</strong> Every replacement part is guaranteed by Apple for 90 days or the remaining term of your AppleCare coverage.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onCallForEstimate}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Speak with Repair Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
