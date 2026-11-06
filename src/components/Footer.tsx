import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onReplay: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplay }) => {
  return (
    <footer className="bg-cream-paper border-t-2 border-cocoa/20 py-10 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="font-heading text-lg sm:text-xl font-bold text-cocoa flex items-center justify-center sm:justify-start gap-2">
            <span>Made with ❤️ by your son.</span>
          </p>
          <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
            THE NISHA UNIVERSE • तुझ्यासाठी... कारण तू खूप खास आहेस! • 9 November 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunshine hover:bg-sunshine-deep text-cocoa text-xs sm:text-sm font-extrabold border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top / Replay</span>
            <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
          </button>
        </div>
      </div>
    </footer>
  );
};
