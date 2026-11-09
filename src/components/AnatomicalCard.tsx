/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePlatform } from '../PlatformContext';
import { ArrowRight, BookOpen, HelpCircle, Layers } from 'lucide-react';

interface AnatomicalCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  desc: string;
  progress: number;
  lecturesCount: number;
  qCount: number;
  flashcardsCount?: number;
  onClick: () => void;
  badgeText?: string;
  organMetricLabel?: string;
}

export const AnatomicalCard: React.FC<AnatomicalCardProps> = ({
  name,
  category,
  image,
  desc,
  progress,
  lecturesCount,
  qCount,
  flashcardsCount,
  onClick,
  badgeText,
  organMetricLabel
}) => {
  const { lang } = usePlatform();

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Background soft ambient anatomical illumination */}
      <div className="absolute -top-12 -end-12 w-40 h-40 bg-gradient-to-br from-blue-100/50 via-cyan-50/30 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div>
        {/* Harmoniously integrated anatomical visual chamber - zero text overlap */}
        <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-slate-50/95 via-white to-slate-100/60 border border-slate-100/90 p-3 flex items-center justify-center mb-4 overflow-hidden shadow-inner">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
          />

          {/* Clean metadata badge unboxed or subtle tag */}
          <span className="absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-700 shadow-xs border border-slate-100">
            {badgeText || category}
          </span>

          {organMetricLabel && (
            <span className="absolute bottom-2.5 end-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-medium text-white shadow-xs">
              {organMetricLabel}
            </span>
          )}
        </div>

        {/* Clear typographic zone with guaranteed legibility */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
            {category}
          </span>
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#1D4ED8] transition-colors leading-snug line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      {/* Structural bottom metrics bar */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1 font-medium">
            <BookOpen className="w-3 h-3 text-blue-600" />
            <span>{lecturesCount} {lang === 'ar' ? 'محاضرة' : 'Lectures'}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 font-medium">
            <HelpCircle className="w-3 h-3 text-cyan-600" />
            <span>{qCount} {lang === 'ar' ? 'سؤال' : 'Qs'}</span>
          </span>
        </div>

        {/* Progress bar and numeric percentage */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-bold text-slate-700 text-[11px] tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
