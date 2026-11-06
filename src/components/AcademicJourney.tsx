import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookMarked,
  Compass,
  CheckCircle2,
  Clock,
  Star,
  BookOpen,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';

const academicRoles = [
  'Professor',
  'Researcher',
  'PhD Scholar',
  'Guide & Mentor',
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
  const scholarPhoto = getPhotoById('photo-017'); // Terrace scholar with books & laptop
  const educatorPhoto = getPhotoById('photo-002'); // Educator portrait in saree

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
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3">
          {academicRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cream-paper border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sticker"
            >
              <Star className="w-2.5 h-2.5 text-sunshine-deep fill-sunshine" />
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
        className="paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper max-w-4xl mx-auto mb-10 sm:mb-14"
      >
        <div className="flex items-center justify-between gap-4 pb-3.5 mb-4 border-b-2 border-dashed border-cocoa/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-skyblue border-2 border-cocoa flex items-center justify-center shadow-sticker">
              <BookMarked className="w-5 h-5 sm:w-6 sm:h-6 text-cocoa" />
            </div>
            <div>
              <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-cocoa">
                NISHA&apos;S ACADEMIC COMMAND DASHBOARD
              </h3>
              <p className="text-xs font-bold text-cocoa-light">
                Real-time status observed with pride by her family
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <ShinchanMascot mood="scholar" className="w-14 h-14" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {dashboardMetrics.map((item, idx) => (
            <div
              key={item.department}
              className="p-3.5 rounded-2xl bg-cream border-2 border-cocoa/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="font-heading text-xs sm:text-sm font-bold text-cocoa flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cocoa-light shrink-0" />
                    {item.department}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-cocoa ${item.badgeColor} text-cocoa`}
                  >
                    {item.status === 'In Progress' ? (
                      <Clock className="w-2.5 h-2.5" />
                    ) : (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    )}
                    {item.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-cocoa-light mb-2.5 leading-relaxed">
                  {item.detail}
                </p>
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
          ))}
        </div>
      </motion.div>

      {/* Part 2: Two Authentic Academic Photographs */}
      <div>
        <div className="text-center mb-6">
          <div className="paper-card rounded-2xl px-5 py-2 bg-cream-paper inline-block max-w-2xl">
            <p className="font-marathi text-sm sm:text-base font-bold text-cocoa">
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
              className="paper-card rounded-3xl p-3.5 sm:p-5 pb-5 bg-cream-paper relative flex flex-col justify-between"
            >
              <div className="washi-tape washi-tape-blue -top-2.5 left-8" />
              <div>
                <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center">
                  <img
                    src={scholarPhoto.src}
                    alt={scholarPhoto.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-handwritten text-lg sm:text-xl font-bold text-cocoa">
                  {scholarPhoto.caption}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cocoa-light mt-1">
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
              className="paper-card rounded-3xl p-3.5 sm:p-5 pb-5 bg-cream-paper relative flex flex-col justify-between"
            >
              <div className="washi-tape washi-tape-pink -top-2.5 right-8" />
              <div>
                <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center">
                  <img
                    src={educatorPhoto.src}
                    alt={educatorPhoto.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-handwritten text-lg sm:text-xl font-bold text-cocoa">
                  {educatorPhoto.caption}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cocoa-light mt-1">
                  <Star className="w-3.5 h-3.5 text-sunshine-deep fill-sunshine" />
                  Inspiring students with grace &amp; warmth
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicJourney;
