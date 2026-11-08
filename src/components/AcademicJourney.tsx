import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookMarked,
  Compass,
  CheckCircle2,
  Clock,
  Star,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';

interface AcademicJourneyProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const academicRoles = [
  'Professor',
  'Researcher',
  'PhD Scholar',
  'Guide & Mentor',
  'Lifelong Learner',
];

const dashboardMetrics = [
  {
    id: 'prof',
    department: 'Professor Mode',
    status: 'Always ON',
    level: 100,
    badgeColor: 'bg-sunshine',
    barColor: 'bg-sunshine-deep',
    detail: 'Inspiring classrooms with dedication, clarity, and warmth.',
    highlight: 'Beloved by cohorts of students for making every lecture engaging and meaningful.',
  },
  {
    id: 'res',
    department: 'Research & PhD Scholarship',
    status: 'Active Pursuit',
    level: 96,
    badgeColor: 'bg-skyblue',
    barColor: 'bg-skyblue-deep',
    detail: 'Pursuing PhD scholarship and new horizons with relentless curiosity.',
    highlight: 'Late-evening reading, notes on the terrace, and unwavering scholarly rigor.',
  },
  {
    id: 'guide',
    department: 'Guidance Department',
    status: 'Open 24/7',
    level: 100,
    badgeColor: 'bg-blush',
    barColor: 'bg-blush-deep',
    detail: 'Trusted advisor for students, colleagues, and our entire family.',
    highlight: 'The first person everyone turns to when a big academic or life decision awaits.',
  },
  {
    id: 'home',
    department: 'Family & Career Balance',
    status: 'Masterclass',
    level: 100,
    badgeColor: 'bg-peach',
    barColor: 'bg-peach-deep',
    detail: 'Balancing big academic dreams while keeping home full of love.',
    highlight: 'Proving every single day that ambition and deep family devotion go hand in hand.',
  },
];

export const AcademicJourney: React.FC<AcademicJourneyProps> = ({ onPrev, onNext }) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('res');
  const scholarPhoto = getPhotoById('photo-017'); // Terrace scholar with books & laptop
  const educatorPhoto = getPhotoById('photo-002'); // Educator portrait

  const activeMetric =
    dashboardMetrics.find((m) => m.id === selectedMetricId) || dashboardMetrics[1];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Chapter 03 Header */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-skyblue border-2 border-cocoa shadow-sticker mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 03 • HER WORLD &amp; ACADEMICS
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
          THE MIND THAT NEVER STOPS LEARNING
        </h2>

        <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5 max-w-2xl mx-auto">
          &ldquo;Some people stop dreaming when life gets busy. Mumma keeps teaching, learning, researching and working towards her next goal.&rdquo;
        </p>

        {/* Role Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3.5">
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
      </div>

      {/* Part 1: Academic Command Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper max-w-4xl mx-auto mb-10 sm:mb-14 relative"
      >
        <div className="washi-tape washi-tape-blue -top-2.5 left-1/2 -translate-x-1/2" />

        <div className="flex items-center justify-between gap-4 pb-3.5 mb-4 border-b-2 border-dashed border-cocoa/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-skyblue border-2 border-cocoa flex items-center justify-center shadow-sticker shrink-0">
              <BookMarked className="w-5 h-5 sm:w-6 sm:h-6 text-cocoa" />
            </div>
            <div>
              <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-cocoa">
                NISHA&apos;S ACADEMIC COMMAND DASHBOARD
              </h3>
              <p className="text-xs font-bold text-cocoa-light">
                Tap any pillar below • Observed with pride by her family
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <ShinchanMascot mood="scholar" className="w-14 h-14" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-4">
          {dashboardMetrics.map((item, idx) => {
            const isSelected = item.id === selectedMetricId;
            return (
              <button
                key={item.department}
                type="button"
                onClick={() => setSelectedMetricId(item.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-sunshine-soft/60 border-cocoa shadow-sticker -translate-y-0.5'
                    : 'bg-cream border-cocoa/20 hover:border-cocoa/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-heading text-xs sm:text-sm font-bold text-cocoa flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cocoa-light shrink-0" />
                      {item.department}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-cocoa ${item.badgeColor} text-cocoa shrink-0`}
                    >
                      {item.status === 'Active Pursuit' ? (
                        <Clock className="w-2.5 h-2.5" />
                      ) : (
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      )}
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-cocoa-light mb-3 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-cocoa mb-1">
                    <span>Mastery &amp; Dedication</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-cream-warm border border-cocoa/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full ${item.barColor}`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Family Observation Note */}
        <div className="p-3.5 rounded-2xl bg-skyblue-soft/70 border-2 border-cocoa/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center gap-2 text-left">
            <Award className="w-4 h-4 text-cocoa shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm font-bold text-cocoa">
              <span className="font-extrabold">{activeMetric.department}:</span>{' '}
              {activeMetric.highlight}
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-cocoa-light shrink-0">
            Family Verified ✨
          </span>
        </div>
      </motion.div>

      {/* Part 2: Two Authentic Academic Photographs */}
      <div>
        <div className="text-center mb-6">
          <div className="paper-card rounded-2xl px-5 py-3 bg-cream-paper inline-block max-w-2xl">
            <p className="font-marathi text-sm sm:text-lg font-bold text-cocoa">
              &ldquo;तुझी शिकण्याची जिद्द आणि सतत पुढे जाण्याची इच्छा मला खूप प्रेरणा देते. तुझा अभिमान वाटतो, Mumma.&rdquo;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Photo 1: Terrace Scholar (photo-017) */}
          {scholarPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="paper-card-interactive rounded-3xl p-4 sm:p-5 pb-5 bg-cream-paper relative flex flex-col justify-between"
            >
              <div className="washi-tape washi-tape-blue -top-2.5 left-8" />
              <div>
                <div className="relative w-full h-56 sm:h-68 rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center">
                  <span className="photo-corner-tl" />
                  <span className="photo-corner-br" />
                  <img
                    src={scholarPhoto.src}
                    alt={scholarPhoto.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3.5 text-center">
                <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                  {scholarPhoto.caption}
                </p>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-skyblue-soft border border-cocoa/20 text-xs font-bold text-cocoa mt-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-skyblue-deep" />
                  Scholar in deep concentration
                </span>
              </div>
            </motion.div>
          )}

          {/* Photo 2: Educator Portrait (photo-002) */}
          {educatorPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="paper-card-interactive rounded-3xl p-4 sm:p-5 pb-5 bg-cream-paper relative flex flex-col justify-between"
            >
              <div className="washi-tape washi-tape-pink -top-2.5 right-8" />
              <div>
                <div className="relative w-full h-56 sm:h-68 rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center">
                  <span className="photo-corner-tl" />
                  <span className="photo-corner-br" />
                  <img
                    src={educatorPhoto.src}
                    alt={educatorPhoto.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3.5 text-center">
                <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                  {educatorPhoto.caption}
                </p>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sunshine-soft border border-cocoa/20 text-xs font-bold text-cocoa mt-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                  Inspiring students with grace &amp; warmth
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chapter 03 Navigation Bridge CTA */}
      {(onPrev || onNext) && (
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-cream-paper hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREV: THE QUEEN</span>
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-skyblue hover:bg-skyblue-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>NEXT: ENTER THE MEMORY MUSEUM (44 PHOTOS)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicJourney;
