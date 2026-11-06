import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookMarked, Compass, Sparkles, CheckCircle2, Clock, Star } from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';

const academicRoles = [
  'Professor',
  'Researcher',
  'PhD Scholar',
  'Guide & Mentor',
  'Ambitious Woman',
  'Lifelong Learner',
];

const dashboardMetrics = [
  {
    department: 'Professor Mode',
    status: 'Always ON',
    level: 100,
    badgeColor: 'bg-sunshine',
    barColor: 'bg-sunshine-deep',
    detail: 'Inspiring classrooms with dedication, clarity, and warmth.',
  },
  {
    department: 'Research Mode',
    status: 'In Progress',
    level: 95,
    badgeColor: 'bg-skyblue',
    barColor: 'bg-skyblue-deep',
    detail: 'Pursuing PhD scholarship and new horizons with relentless curiosity.',
  },
  {
    department: 'Guidance Department',
    status: 'Open 24/7',
    level: 100,
    badgeColor: 'bg-blush',
    barColor: 'bg-blush-deep',
    detail: 'Trusted advisor for students, colleagues, and our entire family.',
  },
  {
    department: 'Family Management',
    status: 'Expert Level',
    level: 100,
    badgeColor: 'bg-peach',
    barColor: 'bg-peach-deep',
    detail: 'Balancing big academic dreams while keeping home full of love.',
  },
];

export const AcademicJourney: React.FC = () => {
  const scholarPhoto = getPhotoById('photo-017'); // Rooftop composed portrait
  const groupPhoto = getPhotoById('photo-044'); // JD Chaware Vidyamandir get-together
  const fortPhoto = getPhotoById('photo-012'); // Turquoise suit with glasses

  return (
    <section
      id="academic"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-skyblue-soft/50 to-cream border-y-2 border-cocoa/15 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-skyblue border-2 border-cocoa shadow-sticker mb-4">
            <GraduationCap className="w-4 h-4 text-cocoa" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
              Section 03 • The Academic Legend
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mb-5">
            THE MIND THAT NEVER STOPS LEARNING
          </h2>

          <p className="text-base sm:text-xl font-bold text-cocoa-light leading-relaxed mb-6">
            &ldquo;Some people stop dreaming when life gets busy. Mumma keeps teaching, learning, researching and working towards her next goal.&rdquo;
          </p>

          {/* Role Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {academicRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa text-xs sm:text-sm font-extrabold text-cocoa shadow-sticker"
              >
                <Star className="w-3.5 h-3.5 text-sunshine-deep fill-sunshine" />
                {role}
              </span>
            ))}
          </div>

          {/* Marathi Pride Quote */}
          <div className="paper-card rounded-2xl p-4 sm:p-6 bg-cream-paper inline-block max-w-2xl relative">
            <div className="washi-tape washi-tape-blue -top-3 left-1/2 -translate-x-1/2" />
            <p className="font-marathi text-lg sm:text-2xl font-bold text-cocoa leading-relaxed">
              &ldquo;तुझी शिकण्याची जिद्द आणि सतत पुढे जाण्याची इच्छा मला खूप प्रेरणा देते. तुझा अभिमान वाटतो, Mumma.&rdquo;
            </p>
          </div>
        </div>

        {/* Dashboard & Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 7 Cols: Interactive Academic Dashboard */}
          <div className="lg:col-span-7 paper-card rounded-3xl p-6 sm:p-8 bg-cream-paper relative">
            <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b-2 border-dashed border-cocoa/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-skyblue border-2 border-cocoa flex items-center justify-center shadow-sticker">
                  <BookMarked className="w-6 h-6 text-cocoa" />
                </div>
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-cocoa">
                    NISHA&apos;S LIVE COMMAND DASHBOARD
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-cocoa-light">
                    Real-time inspiration metrics observed by her son
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <ShinchanMascot mood="scholar" className="w-20 h-20" />
              </div>
            </div>

            <div className="space-y-5">
              {dashboardMetrics.map((item, idx) => (
                <motion.div
                  key={item.department}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 sm:p-5 rounded-2xl bg-cream border-2 border-cocoa/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-heading text-base sm:text-lg font-bold text-cocoa flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cocoa-light" />
                      {item.department}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border-2 border-cocoa ${item.badgeColor} text-cocoa`}
                    >
                      {item.status === 'In Progress' ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-cocoa-light mb-3">
                    {item.detail}
                  </p>

                  <div className="w-full h-3 rounded-full bg-cream-warm border border-cocoa/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 }}
                      className={`h-full ${item.barColor}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Real Photographs */}
          <div className="lg:col-span-5 space-y-6">
            {scholarPhoto && (
              <div className="paper-card rounded-3xl p-4 pb-6 bg-cream-paper relative -rotate-1 hover:rotate-0 transition-transform">
                <div className="washi-tape -top-3 left-10" />
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20">
                  <img
                    src={scholarPhoto.src}
                    alt={scholarPhoto.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwritten text-xl sm:text-2xl font-bold text-center text-cocoa mt-3">
                  {scholarPhoto.caption}
                </p>
              </div>
            )}

            {groupPhoto && (
              <div className="paper-card rounded-3xl p-4 pb-5 bg-cream-paper relative rotate-1 hover:rotate-0 transition-transform">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20">
                  <img
                    src={groupPhoto.src}
                    alt={groupPhoto.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwritten text-lg sm:text-xl font-bold text-center text-cocoa mt-2.5">
                  {groupPhoto.caption}
                </p>
              </div>
            )}

            {fortPhoto && (
              <div className="paper-card rounded-2xl p-3 bg-sunshine-soft flex items-center gap-3.5">
                <img
                  src={fortPhoto.src}
                  alt={fortPhoto.description}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-cocoa shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-cocoa-light flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                    Always Inspiring
                  </p>
                  <p className="text-sm font-bold text-cocoa mt-0.5">
                    Teaching with passion, researching with purpose, and leading by example every single day.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
