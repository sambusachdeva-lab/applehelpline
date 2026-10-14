import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ChevronRight, X, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';
import { APPLE_STORES, PRODUCT_LINES } from '../data/helplineData';
import { GeniusBarAppointment, SupportTopic } from '../types';

interface GeniusBarBookingProps {
  initialTopic?: SupportTopic | null;
  onClose?: () => void;
}

export const GeniusBarBooking: React.FC<GeniusBarBookingProps> = ({ initialTopic, onClose }) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(APPLE_STORES[0].id);
  const [selectedProduct, setSelectedProduct] = useState<string>(initialTopic?.productId || 'iphone');
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [selectedTime, setSelectedTime] = useState<string>('14:30');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(initialTopic?.title || 'Screen diagnostics & hardware check');
  const [confirmedReservation, setConfirmedReservation] = useState<GeniusBarAppointment | null>(null);

  const currentStore = APPLE_STORES.find((s) => s.id === selectedStoreId) || APPLE_STORES[0];

  const timeSlots = ['10:15 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:15 PM', '05:45 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const reservationCode = `GB-${Math.floor(10000 + Math.random() * 90000)}-${currentStore.name.slice(6, 9).toUpperCase()}`;

    const newAppointment: GeniusBarAppointment = {
      id: String(Date.now()),
      storeName: currentStore.name,
      address: currentStore.address,
      date: selectedDate === 'today' ? 'Today' : selectedDate === 'tomorrow' ? 'Tomorrow' : 'In 2 Days',
      time: selectedTime,
      product: selectedProduct.toUpperCase(),
      issueDescription: notes,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || 'On file',
      reservationCode
    };

    setConfirmedReservation(newAppointment);
  };

  return (
    <section id="genius-bar" className="py-14 bg-[#f5f5f7] border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              In-Person Technical Service
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Genius Bar &amp; Apple Store Appointments
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Get hands-on support from certified Apple specialists using genuine parts and diagnostic equipment.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 p-1 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" /> Close Booking
            </button>
          )}
        </div>

        {confirmedReservation ? (
          /* Confirmation Pass */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Appointment Confirmed</span>
            </div>

            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
              You&apos;re booked at the Genius Bar
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              A confirmation email has been dispatched to{' '}
              <span className="font-semibold text-slate-900">{confirmedReservation.customerEmail}</span> with calendar invite details.
            </p>

            <div className="bg-[#fbfbfd] rounded-xl border border-slate-200 p-5 mb-6 divide-y divide-slate-100">
              <div className="pb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Reservation Code</div>
                  <div className="text-xl font-bold font-mono text-blue-600 tabular-nums">
                    {confirmedReservation.reservationCode}
                  </div>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-800">
                  <QrCode className="w-7 h-7" />
                </div>
              </div>

              <div className="py-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 font-medium mb-0.5">Location</div>
                  <div className="font-semibold text-slate-900">{confirmedReservation.storeName}</div>
                  <div className="text-slate-500 text-[11px]">{confirmedReservation.address}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium mb-0.5">Time &amp; Date</div>
                  <div className="font-semibold text-slate-900">
                    {confirmedReservation.date} at {confirmedReservation.time}
                  </div>
                  <div className="text-slate-500 text-[11px]">Product: {confirmedReservation.product}</div>
                </div>
              </div>

              <div className="pt-4 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">What to bring:</span> Your device, government photo ID, and ensure your device is backed up to iCloud.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Print / Save Pass
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
              {/* 1. Store Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  1. Select Nearby Apple Store
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {APPLE_STORES.map((store) => (
                    <div
                      key={store.id}
                      onClick={() => setSelectedStoreId(store.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedStoreId === store.id
                          ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-semibold text-slate-900">{store.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{store.city}</div>
                      <div className="text-[10px] text-blue-600 font-medium mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Next: {store.nextAvailable}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Device Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  2. Select Device for Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRODUCT_LINES.slice(0, 4).map((prod) => (
                    <button
                      type="button"
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        selectedProduct === prod.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {prod.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Date & Time */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  3. Select Date &amp; Time
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {['today', 'tomorrow', 'in 2 days'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 text-xs font-medium rounded-lg border capitalize transition-colors cursor-pointer ${
                        selectedDate === d
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer tabular-nums ${
                        selectedTime === slot
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Contact Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  4. Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name (e.g. Alex Morgan)"
                      className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Apple ID / Email (e.g. alex@icloud.com)"
                      className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Phone for SMS Reminders (e.g. +1 555-019-2831)"
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Brief description of the symptom or repair required..."
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Confirm Genius Bar Appointment
              </button>
            </form>

            {/* Right: Genius Bar Visual Presentation & Store Information */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-2xs bg-white aspect-16/9">
                <img
                  src="/src/assets/images/apple_genius_bar_1792018119674.jpg"
                  alt="Apple Store Genius Bar customer assistance"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{currentStore.name}</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">{currentStore.address}</p>
                <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3">
                  <div>
                    <span className="font-medium text-slate-700">Hours: </span>
                    {currentStore.hours}
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Phone: </span>
                    <span className="font-mono">{currentStore.phone}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900">
                  <span className="font-semibold">Genuine Parts Guarantee:</span> All repairs are conducted using official Apple diagnostic machines and sealed factory parts.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
