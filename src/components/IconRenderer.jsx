import * as LucideIcons from 'lucide-react';

export default function IconRenderer({ name, size = 24, color = 'currentColor', className = '', style = {} }) {
  // Special case for brand icons not in Lucide
  if (name === 'Github' || name === 'GitHub') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  }

  // Map some custom names to Lucide icons if they don't match exactly
  const iconMap = {
    'MilkyWay': 'Sparkles',
    'Rainbow': 'Wind',
    'Theater': 'Clapperboard',
    'Monitor': 'Monitor',
    'Gamepad': 'Gamepad2',
    'School': 'School',
    'Star': 'Star',
    'Sparkles': 'Sparkles',
    'Rocket': 'Rocket',
    'Stars': 'Sparkles',
    'Tv': 'Tv',
    'Zap': 'Zap',
    'Atom': 'Atom',
    'Bot': 'Bot',
    'MessageSquare': 'MessageSquare',
    'Play': 'Play',
    'Palette': 'Palette',
    'Sprout': 'Sprout',
    'Code': 'Code',
    'Trophy': 'Trophy',
    'PartyPopper': 'PartyPopper',
    'Calendar': 'Calendar',
    'BarChart3': 'BarChart3',
    'Settings': 'Settings',
    'Timer': 'Timer',
    'GraduationCap': 'GraduationCap',
    'Check': 'Check',
    'Copy': 'Copy',
    'Search': 'Search',
    'Camera': 'Camera',
    'Users': 'Users',
    'User': 'User',
    'Sun': 'Sun',
    'Moon': 'Moon',
    'X': 'X',
    'Menu': 'Menu',
    'Leaf': 'Leaf',
    'Package': 'Package',
    'Globe': 'Globe',
    'Award': 'Award',
    'Medal': 'Medal',
  };

  const lucideName = iconMap[name] || name;
  const Icon = LucideIcons[lucideName] || LucideIcons.HelpCircle;
  
  return <Icon size={size} color={color} className={className} style={style} />;
}
