import React, { useState } from 'react';
import { Search, Smartphone, Laptop, Tablet, Watch, Headphones, Glasses, KeyRound, CreditCard, ArrowRight, ShieldCheck, Wrench, Sparkles } from 'lucide-react';
import { PRODUCT_LINES, COMMON_SUPPORT_TOPICS } from '../data/helplineData';
import { SupportTopic } from '../types';

interface HeroSearchProps {
  onSelectTopic: (topic: SupportTopic) => void;
  onSelectProduct: (productId: string) => void;
  selectedProductId: string | null;
  onOpenCoverageCheck: () => void;
  onOpenGeniusBar: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSelectTopic,
  onSelectProduct,
  selectedProductId,
  onOpenCoverageCheck,
  onOpenGeniusBar
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredTopics = searchQuery.trim()
    ? COMMON_SUPPORT_TOPICS.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Tablet':
        return <Tablet className="w-5 h-5" />;
      case 'Watch':
        return <Watch className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Glasses':
        return <Glasses className="w-5 h-5" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative bg-[#f5f5f7] pt-10 pb-14 border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Split Hero: Text & Search on Left / Cinematic Desk Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 mb-3 tracking-wide">
              <span>Official Apple Customer Care</span>
              <span aria-hidden="true">·</span>
              <span>Hardware & Software Helpline</span>
              <span aria-hidden="true">·</span>
              <span>24/7 Support</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight mb-4 text-balance">
              How can Apple Support help you today?
            </h1>

            <p className="text-base text-slate-600 max-w-xl mb-6">
              Connect directly with certified Apple advisors, schedule Genius Bar repairs, or access step-by-step diagnostic tools.
            </p>

            {/* Interactive Search Box with Real-time Dropdown */}
            <div className="relative max-w-xl">
              <div
                className={`relative flex items-center bg-white rounded-xl border transition-all shadow-xs ${
                  isFocused ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="Search symptoms, topics, e.g. 'battery health', 'forgot password'"
                  className="w-full py-3.5 pl-3 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                  aria-label="Search Apple Support topics"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mr-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {isFocused && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 z-30 overflow-hidden divide-y divide-slate-100">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onMouseDown={() => onSelectTopic(topic)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                            {topic.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">{topic.summary}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 ml-2" />
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-xs text-slate-500">
                      No matching articles found. Try &quot;password&quot;, &quot;battery&quot;, &quot;screen&quot;, or call our helpline directly.
                    </div>
                  )}
                </div>
              )}

              {/* Fast Suggested Queries */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
                <span className="text-slate-400 font-medium">Quick links:</span>
                <button
                  onClick={() => setSearchQuery('password')}
                  className="hover:text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  Forgot password
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setSearchQuery('battery')}
                  className="hover:text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  Battery diagnostics
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setSearchQuery('screen')}
                  className="hover:text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  Screen repair fee
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setSearchQuery('subscription')}
                  className="hover:text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  Cancel subscription
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={onOpenCoverageCheck}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Check Your Warranty &amp; AppleCare</span>
              </button>
              <button
                onClick={onOpenGeniusBar}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Book a Genius Bar Appointment</span>
              </button>
            </div>
          </div>

          {/* Right: Authentic Studio Desk Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm bg-white aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/apple_support_hero_desk_1792018119266.jpg"
                alt="Apple hardware devices ready for support and diagnostics"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs">
                  <div className="font-semibold text-sm">Hardware &amp; Software Support</div>
                  <div className="text-slate-200">Official certified repairs with genuine Apple parts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Line Selector Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-tight text-slate-800">
              Select a product for dedicated support
            </h2>
            <span className="text-xs text-slate-500">
              {selectedProductId ? `Filtering by ${selectedProductId.toUpperCase()}` : 'Showing all products'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PRODUCT_LINES.map((product) => {
              const isSelected = selectedProductId === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => onSelectProduct(isSelected ? '' : product.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getProductIcon(product.iconName)}
                  </div>
                  <span className="text-xs font-semibold leading-tight">{product.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
