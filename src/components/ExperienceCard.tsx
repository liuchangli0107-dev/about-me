import React from 'react';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="relative pl-8 border-l-2 border-slate-200">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-2xl font-bold text-blue-600">{experience.company}</h3>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-mono">{experience.period}</span>
      </div>
      <div className="text-blue-600 font-bold mb-4">{experience.role}</div>
      <p className="text-slate-600 mb-6 leading-relaxed italic">
        &quot;{experience.description}&quot;
      </p>
      <div className="flex flex-wrap gap-2">
        {experience.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-500">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
