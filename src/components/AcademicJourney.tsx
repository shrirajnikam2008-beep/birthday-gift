import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookMarked,
  Compass,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';

interface AcademicJourneyProps {
  onNext: () => void;
}

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

export const AcademicJourney: React.FC<AcademicJourneyProps> = ({ onNext }) => {
  const scholarPhoto = getPhotoById('photo-017');
  const groupPhoto = getPhotoById('photo-044');

  return (
    <section
      aria-label="Chapter 03: The Academic Legend"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-gradient-to-b from-cream via-skyblue-soft/40 to-cream"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-skyblue border-2 border-cocoa shadow-sticker mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
              CHAPTER 03 / 08 • THE ACADEMIC LEGEND
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight mb-3">
            THE MIND THAT NEVER STOPS LEARNING
          </h2>

          <p className="text-sm sm:text-lg font-bold text-cocoa-light leading-relaxed mb-4">
            &ldquo;Some people stop dreaming when life gets busy. Mumma keeps teaching, learning, researching and working towards her next goal.&rdquo;
          </p>

          {/* Role Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {academicRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-paper border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sticker"
              >
                <Star className="w-3 h-3 text-sunshine-deep fill-sunshine" />
                {role}
              </span>
            ))}
          </div>

          <div className="paper-card rounded-2xl px-4 py-2.5 bg-cream-paper inline-block max-w-2xl">
            <p className="font-marathi text-base sm:text-xl font-bold text-cocoa">
              &ldquo;तुझी शिकण्याची जिद्द आणि सतत पुढे जाण्याची इच्छा मला खूप प्रेरणा देते. तुझा अभिमान वाटतो, Mumma.&rdquo;
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left 7 Cols: Live Command Dashboard */}
          <div className="lg:col-span-7 paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper">
            <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b-2 border-dashed border-cocoa/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-skyblue border-2 border-cocoa flex items-center justify-center shadow-sticker">
                  <BookMarked className="w-5 h-5 text-cocoa" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-cocoa">
                    NISHA&apos;S ACADEMIC COMMAND DASHBOARD
                  </h3>
                  <p className="text-xs font-bold text-cocoa-light">
                    Observed with pride by her son
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <ShinchanMascot mood="scholar" className="w-16 h-16" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dashboardMetrics.map((item, idx) => (
                <motion.div
                  key={item.department}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-cream border-2 border-cocoa/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <span className="font-heading text-sm sm:text-base font-bold text-cocoa flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-cocoa-light shrink-0" />
                        {item.department}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-cocoa ${item.badgeColor} text-cocoa mb-2`}
                    >
                      {item.status === 'In Progress' ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>

                    <p className="text-xs font-semibold text-cocoa-light mb-3 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-cream-warm border border-cocoa/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className={`h-full ${item.barColor}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Real Photographs + Next Chapter CTA */}
          <div className="lg:col-span-5 space-y-4">
            {scholarPhoto && (
              <div className="paper-card rounded-3xl p-3.5 pb-4 bg-cream-paper relative">
                <div className="washi-tape -top-3 left-10" />
                <div className="aspect-[4/3] max-h-[220px] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20">
                  <img
                    src={scholarPhoto.src}
                    alt={scholarPhoto.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwritten text-lg sm:text-xl font-bold text-center text-cocoa mt-2">
                  {scholarPhoto.caption}
                </p>
              </div>
            )}

            {groupPhoto && (
              <div className="paper-card rounded-3xl p-3.5 pb-4 bg-cream-paper relative">
                <div className="aspect-[16/9] max-h-[160px] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20">
                  <img
                    src={groupPhoto.src}
                    alt={groupPhoto.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwritten text-base sm:text-lg font-bold text-center text-cocoa mt-2">
                  {groupPhoto.caption}
                </p>
              </div>
            )}

            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                <span>NEXT: ENTER THE MEMORY MUSEUM →</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
