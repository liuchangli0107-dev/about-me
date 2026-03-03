import type { ElementType } from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Philosophy {
  title: string;
  description: string;
  icon: ElementType;
}
