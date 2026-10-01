import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Compass, Calendar, Wallet, Sparkles, MapPin, CheckCircle2, Luggage } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIPlanner = () => {
  const { submitEnquiry, showToast, setIsChatOpen } = useApp();

  const [destinationChoice, setDestinationChoice] = useState('Kashmir');
  const [datesChoice, setDatesChoice] = useState('Next Month');
  const [budgetChoice, setBudgetChoice] = useState('₹30,000 – ₹60,000');
  const [styleChoice, setStyleChoice] = useState('Mountain Adventure');
  const [travelersChoice, setTravelersChoice] = useState('2 Travellers');

  const [isGenerating, setIsGenerating] = useState(false);

  // Curated Trip Recommendation State with real Hotel, Experiences, and Itinerary
  const [recommendation, setRecommendation] = useState({
    destination: 'The Kashmir Escape',
    region: 'Srinagar, Gulmarg & Pahalgam, India',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    whyItFits: 'Waking up on a hand-carved cedar houseboat on Dal Lake as morning mist lifts off the Pir Panjal mountains, ascending Apharwat Peak on the Gulmarg Gondola, and walking through Pahalgam pine valleys.',
    duration: '6 Days · 5 Nights',
    estimatedBudget: 'From ₹49,999 per person',
    recommendedStay: 'Sukoon Premier Cedar Houseboat & The Khyber Mountain Resort',
    includedHighlights: [
      'Private AC Chauffeur throughout entire itinerary',
      '5 Nights Luxury Stays: 2N Cedar Houseboat + 3N Boutique Mountain Lodges',
      'Priority Passes: Phase II Gulmarg Gondola tickets pre-arranged',
      'Daily authentic Kashmiri breakfasts and multi-course Wazwan dinners'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Srinagar & Dal Lake Sunset Shikara',
        desc: 'VIP airport greeting. Check into your heritage cedar houseboat. Enjoy an evening Shikara cruise with freshly brewed saffron Kahwa tea.'
      },
      {
        day: 'Day 2',
        title: 'Mughal Gardens & Historic Artisan Bazaars',
        desc: 'Visit Shalimar & Nishat Bagh. Guided walk through Old Srinagar copper engravers and 4th-generation Pashmina shawl ateliers.'
      },
      {
        day: 'Day 3',
        title: 'Gulmarg + Gondola Phase II (13,780 ft)',
        desc: 'Scenic drive to Gulmarg. Ascend to Apharwat Peak for breathtaking Himalayan snow panoramas. Evening fireside dinner.'
      },
      {
        day: 'Day 4',
        title: 'Pahalgam Valley of Shepherds',
        desc: 'Meander through saffron fields of Pampore to Pahalgam. Scenic afternoon walk along the rushing Lidder River.'
      },
      {
        day: 'Day 5',
        title: 'Betaab Valley & Pine Meadow Picnic',
        desc: 'Explore the unspoiled pine forests and glacial streams of Betaab Valley and Aru. Special evening outdoor barbecue.'
      },
      {
        day: 'Day 6',
        title: 'Airport Transfer & Farewell Saffron Hamper',
        desc: 'Morning transfer to Srinagar Airport with a hand-selected organic saffron and walnut travel hamper.'
      }
    ]
  });

  const handleCreateItinerary = (e) => {
    e?.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const dest = destinationChoice.toLowerCase();

      if (dest.includes('bali')) {
        setRecommendation({
          destination: 'Bali Tropical Sanctuary & Coastal Cliffs',
          region: 'Ubud, Nusa Penida & Uluwatu, Indonesia',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
          whyItFits: 'A balanced voyage combining the lush emerald river terraces of Ubud with private catamaran cruises across Nusa Penida and sunset cliffside dinners in Uluwatu.',
          duration: '8 Days · 7 Nights',
          estimatedBudget: 'From $2,650 per person',
          recommendedStay: 'Capella Ubud Rainforest Retreat & Bulgari Resort Uluwatu',
          includedHighlights: [
            'Private villa with heated infinity plunge pool',
            'Full-day private catamaran cruise to Nusa Penida manta lagoons',
            'Private blessing ceremony at Tirta Empul water temple',
            'Daily artisan breakfast & personal villa butler service'
          ],
          itinerary: [
            { day: 'Day 1', title: 'Arrival at Denpasar & Private Chauffeur to Ubud', desc: 'VIP airport meet and transfer to your rainforest pool villa.' },
            { day: 'Day 2', title: 'Ubud Rice Terraces & Traditional Water Blessing', desc: 'Morning walk in Tegallalang terraces followed by holy spring ceremony.' },
            { day: 'Day 3', title: 'Mount Batur Sunrise Jeep & Natural Hot Springs', desc: 'Dawn 4x4 volcanic trail and soak in geothermal mineral pools.' },
            { day: 'Day 4', title: 'Transfer to South Coast & Uluwatu Clifftop', desc: 'Scenic coastal drive and check into oceanfront cliff pavilion.' },
            { day: 'Day 5', title: 'Nusa Penida Private Speedboat Charter', desc: 'Snorkeling with manta rays and swimming in Kelingking beach coves.' },
            { day: 'Day 6', title: 'Spa & Holistic Sound Healing', desc: 'Full afternoon traditional Balinese massage and sound healing.' },
            { day: 'Day 7', title: 'Kecak Fire Dance at Uluwatu Cliff Temple', desc: 'Sunset temple performance followed by Jimbaran seafood dinner.' },
            { day: 'Day 8', title: 'Airport Chauffeur Transfer', desc: 'Farewell transfer to Ngurah Rai Airport with Balinese coffee hamper.' }
          ]
        });
      } else if (dest.includes('amalfi')) {
        setRecommendation({
          destination: 'Amalfi Coastal Splendor & Capri',
          region: 'Positano, Capri & Ravello, Italy',
          image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
          whyItFits: 'Sun-drenched pastel cliffs, private Riva motorboat sails to secluded Capri grottoes, and candlelit cliffside dinners overlooking the Mediterranean.',
          duration: '7 Days · 6 Nights',
          estimatedBudget: 'From $3,450 per person',
          recommendedStay: 'Le Sirenuse Positano & Villa Cimbrone, Ravello',
          includedHighlights: [
            'Positano cliffside suite with private sea balcony',
            'Full-day private Riva yacht charter to Capri and Faraglioni',
            'Ravello cliffside garden tour with centuries-old wine tasting',
            'Private Mercedes chauffeur along the Amalfi Drive'
          ],
          itinerary: [
            { day: 'Day 1', title: 'Naples Airport Chauffeur to Positano Suite', desc: 'Scenic transfer along the cliffs. Welcome Prosecco on your balcony.' },
            { day: 'Day 2', title: 'Private Riva Yacht Sail around Capri', desc: 'Swim in the Green & White Grottoes. Dock for lunch at La Fontelina.' },
            { day: 'Day 3', title: 'Amalfi Village & Cathedral of St. Andrew', desc: 'Explore historic Amalfi and taste fresh artisan lemon sorbet.' },
            { day: 'Day 4', title: 'Ravello Clifftop Gardens & Wine Cellars', desc: 'Visit Villa Rufolo and enjoy panoramic chamber music gardens.' },
            { day: 'Day 5', title: 'Path of the Gods Guided Panoramic Trek', desc: 'Hike the scenic cliff path overlooking the Mediterranean coastline.' },
            { day: 'Day 6', title: 'Michelin Clifftop Dining in Positano', desc: 'Celebratory candlelit sunset dinner overlooking pastel houses.' },
            { day: 'Day 7', title: 'Private Chauffeur Return to Naples Airport', desc: 'Private transfer with gift hamper of authentic Limoncello.' }
          ]
        });
      } else if (dest.includes('kyoto')) {
        setRecommendation({
          destination: 'Timeless Kyoto & Alpine Hakone',
          region: 'Honshu, Japan',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
          whyItFits: 'A contemplative voyage that balances the quiet poetry of moss gardens in Arashiyama with private volcanic hot springs overlooking Mount Fuji.',
          duration: '10 Days · 9 Nights',
          estimatedBudget: 'From $4,850 per person',
          recommendedStay: 'Gion Hatanaka Heritage Ryokan & Gora Kadan Onsen',
          includedHighlights: [
            'First-Class JR Green Car Shinkansen passes',
            'Private tea ceremony with a 15th-generation tea master',
            'Private onsen bath in your garden ryokan suite',
            'Authentic multi-course Kaiseki dinners included daily'
          ],
          itinerary: [
            { day: 'Day 1–2', title: 'Tokyo Modern Metropolis & Private Food Tours', desc: 'Stay in central Ginza. Explore Tsukiji outer market and Omotesando.' },
            { day: 'Day 3–4', title: 'Hakone Hot Springs with Mount Fuji Views', desc: 'Shinkansen to Hakone. Soak in natural mineral onsens at your ryokan.' },
            { day: 'Day 5–7', title: 'Kyoto Imperial Temples & Bamboo Groves', desc: 'After-hours access to Fushimi Inari and Arashiyama bamboo forest.' },
            { day: 'Day 8', title: 'Private Tea Master Ceremony & Gion Dusk Walk', desc: 'Exclusive tea pavilion ritual and lantern-lit walk through geisha quarters.' },
            { day: 'Day 9', title: 'Nara Deer Park & Ancient Todai-ji Temple', desc: 'Day excursion to Nara to visit the Great Buddha and ancient parks.' },
            { day: 'Day 10', title: 'Bullet Train Return to Tokyo Narita', desc: 'Seamless first-class Shinkansen transfer to your return flight.' }
          ]
        });
      } else if (dest.includes('goa')) {
        setRecommendation({
          destination: 'Goa Heritage & Quiet Waters',
          region: 'Assagao & Aldona, India',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
          whyItFits: 'Away from crowded beaches, the historic Portuguese estates of Assagao offer serene colonial architecture, private courtyard pools, and quiet backwaters matching your desired budget and restful cadence.',
          duration: '5 Days · 4 Nights',
          estimatedBudget: 'From ₹28,500 per person',
          recommendedStay: 'Villa Amor Heritage Portuguese Estate, Assagao',
          includedHighlights: [
            'Private Portuguese heritage villa with private courtyard plunge pool',
            'Sunset catamaran charter to Grand Island with dolphin watching',
            'Quiet morning kayaking through Aldona mangrove estuaries',
            'Artisan Goan seafood dinner prepared by your private villa chef'
          ],
          itinerary: [
            { day: 'Day 1', title: 'Arrival & Welcome to Assagao Heritage Villa', desc: 'Chauffeur transfer from Mopa/Dabolim. Settle into your courtyard villa.' },
            { day: 'Day 2', title: 'Morning Aldona Kayaking & Susegad Poolside Afternoon', desc: 'Glide through quiet backwater mangroves with a local naturalist.' },
            { day: 'Day 3', title: 'Private Sunset Catamaran Sail to Grand Island', desc: 'Sail past Cabo de Rama, swim in clear water, and enjoy sunset drinks.' },
            { day: 'Day 4', title: 'Historic Fontainhas Latin Quarter & Private Chef Dinner', desc: 'Walk past colorful heritage houses, art galleries, and enjoy fresh seafood.' },
            { day: 'Day 5', title: 'Chauffeur Transfer to Airport', desc: 'Private airport transfer with a box of authentic Goan cashew feni sweets.' }
          ]
        });
      } else {
        setRecommendation({
          destination: 'The Kashmir Escape',
          region: 'Srinagar, Gulmarg & Pahalgam, India',
          image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
          whyItFits: 'Waking up on a hand-carved cedar houseboat on Dal Lake as morning mist lifts off the Pir Panjal mountains, ascending Apharwat Peak on the Gulmarg Gondola, and walking through Pahalgam pine valleys.',
          duration: '6 Days · 5 Nights',
          estimatedBudget: 'From ₹49,999 per person',
          recommendedStay: 'Sukoon Premier Cedar Houseboat & The Khyber Mountain Resort',
          includedHighlights: [
            'Private AC Chauffeur throughout entire itinerary',
            '5 Nights Luxury Stays: 2N Cedar Houseboat + 3N Boutique Mountain Lodges',
            'Priority Passes: Phase II Gulmarg Gondola tickets pre-arranged',
            'Daily authentic Kashmiri breakfasts and multi-course Wazwan dinners'
          ],
          itinerary: [
            { day: 'Day 1', title: 'Arrival in Srinagar & Dal Lake Sunset Shikara', desc: 'VIP airport greeting. Check into your heritage cedar houseboat.' },
            { day: 'Day 2', title: 'Mughal Gardens & Historic Artisan Bazaars', desc: 'Visit Shalimar & Nishat Bagh. Guided walk through Old Srinagar copper ateliers.' },
            { day: 'Day 3', title: 'Gulmarg + Gondola Phase II (13,780 ft)', desc: 'Scenic drive to Gulmarg. Ascend to Apharwat Peak for snow panoramas.' },
            { day: 'Day 4', title: 'Pahalgam Valley of Shepherds', desc: 'Meander through saffron fields of Pampore to Pahalgam. Walk along Lidder River.' },
            { day: 'Day 5', title: 'Betaab Valley & Pine Meadow Picnic', desc: 'Explore the unspoiled pine forests and glacial streams of Betaab Valley.' },
            { day: 'Day 6', title: 'Airport Transfer & Farewell Saffron Hamper', desc: 'Morning transfer to Srinagar Airport with a hand-selected saffron gift.' }
          ]
        });
      }

      showToast(`Custom itinerary prepared for ${destinationChoice}.`, 'info');
    }, 1200);
  };

  const handleRequestQuote = () => {
    submitEnquiry({
      fullName: 'Private Voyager',
      email: 'guest@auravoyage.com',
      destination: recommendation.destination,
      dates: datesChoice,
      travelers: travelersChoice,
      budget: budgetChoice,
      style: styleChoice,
      notes: `Consulted AI Travel Planner: Destination=${recommendation.destination}. Duration=${recommendation.duration}. Recommended Stay: ${recommendation.recommendedStay}.`
    });
  };

  return (
    <section id="ai-planner" className="pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-32 bg-canvas border-b border-black/[0.07]">
      <div className="w-full max-w-[1200px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER: PRACTICAL TRAVEL ASSISTANT
            "Tell us where you want to go. We'll build the trip."
            ========================================================================= */}
        <div className="text-center mb-8 sm:mb-12 max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#f4eee3] text-champagne-dark text-[11px] font-mono uppercase tracking-[0.2em] mb-2 font-semibold">
            <Sparkles size={12} className="text-champagne-dark" />
            <span>AI Travel Assistant</span>
          </div>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink leading-tight mb-2.5 sm:mb-3 text-balance">
            Tell us where you want to go. <br className="hidden xs:inline" />
            <span className="italic font-light lowercase font-display">We'll build the trip.</span>
          </h2>
          <p className="text-xs sm:text-base text-ink-muted max-w-[520px] mx-auto font-light leading-relaxed text-pretty">
            Answer a few quick questions to receive an instant, day-by-day itinerary with verified boutique stays, pricing, and experiences.
          </p>
        </div>

        {/* =========================================================================
            PRACTICAL FORM INPUTS
            ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-black/[0.09] shadow-deep p-3.5 xs:p-5 sm:p-8 mb-8 sm:mb-14">
          <form onSubmit={handleCreateItinerary} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
            
            {/* 1. Destination */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold">
                Destination
              </label>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#f8f5ee] border border-black/[0.06]">
                <MapPin size={16} className="text-champagne-dark flex-shrink-0" />
                <select
                  value={destinationChoice}
                  onChange={(e) => setDestinationChoice(e.target.value)}
                  className="w-full text-xs font-semibold text-ink bg-transparent border-none outline-none cursor-pointer truncate"
                >
                  <option value="Kashmir">Kashmir, India</option>
                  <option value="Bali">Bali, Indonesia</option>
                  <option value="Amalfi">Amalfi Coast, Italy</option>
                  <option value="Kyoto">Kyoto, Japan</option>
                  <option value="Goa">Goa, India</option>
                  <option value="Swiss Alps">Swiss Alps, Switzerland</option>
                </select>
              </div>
            </div>

            {/* 2. Dates */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold">
                When?
              </label>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#f8f5ee] border border-black/[0.06]">
                <Calendar size={16} className="text-champagne-dark flex-shrink-0" />
                <select
                  value={datesChoice}
                  onChange={(e) => setDatesChoice(e.target.value)}
                  className="w-full text-xs font-semibold text-ink bg-transparent border-none outline-none cursor-pointer truncate"
                >
                  <option value="Next Month">Next Month (Immediate)</option>
                  <option value="Winter 2026">Winter Alpine (Dec – Feb)</option>
                  <option value="Spring 2027">Spring Blossoms (Mar – May)</option>
                  <option value="Autumn 2026">Autumn 2026</option>
                  <option value="Flexible">Flexible Dates</option>
                </select>
              </div>
            </div>

            {/* 3. Budget */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold">
                Budget / Person
              </label>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#f8f5ee] border border-black/[0.06]">
                <Wallet size={16} className="text-champagne-dark flex-shrink-0" />
                <select
                  value={budgetChoice}
                  onChange={(e) => setBudgetChoice(e.target.value)}
                  className="w-full text-xs font-semibold text-ink bg-transparent border-none outline-none cursor-pointer truncate"
                >
                  <option value="Under ₹30,000">Under ₹30,000 (Value)</option>
                  <option value="₹30,000 – ₹60,000">₹30,000 – ₹60,000 (Curated)</option>
                  <option value="₹60,000 – ₹1.5L">₹60,000 – ₹1.5L (Premium)</option>
                  <option value="$3,500+">$3,500+ (Ultra Luxury)</option>
                </select>
              </div>
            </div>

            {/* 4. Travel Style */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold">
                Travel Style
              </label>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#f8f5ee] border border-black/[0.06]">
                <Compass size={16} className="text-champagne-dark flex-shrink-0" />
                <select
                  value={styleChoice}
                  onChange={(e) => setStyleChoice(e.target.value)}
                  className="w-full text-xs font-semibold text-ink bg-transparent border-none outline-none cursor-pointer truncate"
                >
                  <option value="Mountain Adventure">Mountain Adventure</option>
                  <option value="Beach & Islands">Beach & Island Escape</option>
                  <option value="Culture & Heritage">Culture & Heritage</option>
                  <option value="Couples Romance">Couples Romance</option>
                  <option value="Slow Wellness">Slow Travel & Wellness</option>
                </select>
              </div>
            </div>

            {/* 5. Create Button */}
            <div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-xl bg-ink hover:bg-ink-soft text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm group flex items-center justify-center gap-2 disabled:opacity-50 min-h-[42px]"
              >
                <span>{isGenerating ? 'Building...' : 'Create Itinerary'}</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>

          {/* Quick Pre-Set Prompt Pills */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-3.5 mt-3.5 border-t border-black/[0.06] text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted flex-shrink-0">Quick ideas:</span>
            {[
              { label: '🏔️ Kashmir Snow', dest: 'Kashmir', style: 'Mountain Adventure' },
              { label: '🏖️ Goa Villa', dest: 'Goa', style: 'Beach & Islands' },
              { label: '⛩️ Kyoto Ryokan', dest: 'Kyoto', style: 'Culture & Heritage' },
              { label: '🌊 Amalfi Clifftop', dest: 'Amalfi', style: 'Couples Romance' }
            ].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => {
                  setDestinationChoice(pill.dest);
                  setStyleChoice(pill.style);
                  handleCreateItinerary();
                }}
                className="py-1 px-2.5 sm:px-3 rounded-full bg-[#f2ece2] hover:bg-[#e7dfce] text-ink text-[11px] sm:text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Loading Indicator */}
          {isGenerating && (
            <div className="mt-4 text-center text-xs text-champagne-dark font-mono tracking-wider animate-pulse">
              Matching your travel preferences with verified stays & routes...
            </div>
          )}
        </div>

        {/* =========================================================================
            GENERATED DAY-BY-DAY ITINERARY DOSSIER
            ========================================================================= */}
        {recommendation && !isGenerating && (
          <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-deep border border-black/[0.09]">
            
            {/* Itinerary Header Banner */}
            <div className="relative aspect-[16/10] sm:aspect-[21/8] overflow-hidden bg-dark">
              <img
                src={recommendation.image}
                alt={recommendation.destination}
                className="w-full h-full object-cover brightness-[0.78] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/95 via-[#0b0c0e]/30 to-transparent via-55%" />

              <div className="absolute top-3 xs:top-4 left-3 xs:left-4 bg-white/95 backdrop-blur-md py-0.5 xs:py-1 px-2.5 xs:px-3 rounded-full text-[9px] xs:text-[10px] font-mono tracking-wider uppercase font-semibold text-ink shadow-sm">
                Generated Travel Dossier
              </div>

              <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-3 xs:left-4 sm:left-6 right-3 xs:right-4 sm:right-6 text-white">
                <span className="text-[10px] xs:text-[11px] font-mono tracking-[0.2em] uppercase text-champagne block mb-0.5 sm:mb-1 truncate">
                  {recommendation.region} · {recommendation.duration}
                </span>

                <h3 className="font-display text-xl xs:text-2xl sm:text-4xl font-normal uppercase text-white mb-1 leading-tight truncate">
                  {recommendation.destination}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 font-light max-w-[620px] line-clamp-2">
                  {recommendation.whyItFits}
                </p>
              </div>
            </div>

            {/* Practical Quick Specs Bar */}
            <div className="p-3.5 sm:p-6 bg-[#faf8f5] border-b border-black/[0.07] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-0.5 whitespace-nowrap">
                  Trip Duration
                </span>
                <span className="font-semibold text-ink text-sm sm:text-base whitespace-nowrap">
                  {recommendation.duration}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-0.5 whitespace-nowrap">
                  Estimated Pricing
                </span>
                <span className="font-display text-base sm:text-xl font-normal text-ink font-semibold whitespace-nowrap">
                  {recommendation.estimatedBudget}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-0.5 whitespace-nowrap">
                  Recommended Stay
                </span>
                <span className="font-medium text-ink text-xs sm:text-sm line-clamp-1 text-pretty">
                  {recommendation.recommendedStay}
                </span>
              </div>
            </div>

            {/* What's Included & Day-By-Day Itinerary Feed */}
            <div className="p-4 xs:p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Day-By-Day Itinerary (Span 7) */}
              <div className="lg:col-span-7">
                <h4 className="font-mono text-xs uppercase tracking-wider text-champagne-dark font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <Luggage size={14} className="text-champagne-dark" />
                  <span>Day-By-Day Itinerary</span>
                </h4>

                <div className="space-y-3 sm:space-y-3.5 relative before:absolute before:top-3 before:bottom-3 before:left-[14px] sm:before:left-[17px] before:w-[1.5px] before:bg-black/[0.08]">
                  {recommendation.itinerary.map((step, idx) => (
                    <div key={idx} className="relative pl-7 sm:pl-9 text-xs">
                      {/* Step Circle Indicator */}
                      <span className="absolute left-2 sm:left-2.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-champagne-dark flex items-center justify-center text-[8.5px] font-mono font-bold text-ink">
                        {idx + 1}
                      </span>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf8f5] border border-black/[0.05]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono font-semibold text-champagne-dark uppercase tracking-wider text-[10.5px]">
                            {step.day}
                          </span>
                        </div>
                        <h5 className="font-semibold text-ink text-xs sm:text-sm mb-1">
                          {step.title}
                        </h5>
                        <p className="text-ink-muted font-light leading-relaxed text-[11.5px]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Highlights (Span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-champagne-dark font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-champagne-dark" />
                    <span>What's Included in This Trip</span>
                  </h4>

                  <ul className="space-y-2.5 sm:space-y-3 text-xs text-ink-soft mb-5 sm:mb-6">
                    {recommendation.includedHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#faf8f5] border border-black/[0.05]">
                        <CheckCircle2 size={15} className="text-status-emerald flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f4eee3] border border-black/[0.07] text-xs text-ink-muted leading-relaxed">
                    💡 <strong>Traveler Tip:</strong> This itinerary can be customized by changing dates, adding private activities, or upgrading villa suites.
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-black/[0.07] flex flex-col xs:flex-row items-stretch gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="flex-1 py-3 px-4 sm:px-5 rounded-xl bg-ink hover:bg-ink-soft text-white text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-sm group flex items-center justify-center gap-2 text-center whitespace-nowrap"
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="py-3 px-4 rounded-xl border border-black/15 hover:border-black/30 text-ink text-[11px] sm:text-xs uppercase tracking-wider font-semibold hover:bg-sand/40 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <MessageSquare size={13} />
                    <span>Ask Concierge</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
