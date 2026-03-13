import React from 'react';
import {
  Database,
  Server,
  Code,
  Box,
  Wind,
  Cloud,
  Briefcase,
  Cog,
  Bot,
} from 'lucide-react';
import {
    SiPhp,
    SiLaravel,
    SiSymfony,
    SiCodeigniter,
    SiRabbitmq,
    SiMysql,
    SiReact,
    SiVite,
    SiTailwindcss,
    SiTypescript,
    SiFirebase,
    SiGooglecloud,
    SiDocker,
    SiGit
} from 'react-icons/si';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const iconComponents: { [key: string]: React.ElementType } = {
  react: SiReact,
  vite: SiVite,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  firebase: SiFirebase,
  'google-cloud': SiGooglecloud,
  docker: SiDocker,
  git: SiGit,
  php: SiPhp,
  laravel: SiLaravel,
  symfony: SiSymfony,
  codeigniter: SiCodeigniter,
  rabbitmq: SiRabbitmq,
  mysql: SiMysql,
  oracle: Database, // Fallback to a generic database icon
  database: Database,
  server: Server,
  code: Code,
  box: Box,
  wind: Wind,
  cloud: Cloud,
  briefcase: Briefcase,
  cog: Cog,
  bot: Bot,
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = iconComponents[name.toLowerCase()];

  if (!IconComponent) {
    return <Code {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;
