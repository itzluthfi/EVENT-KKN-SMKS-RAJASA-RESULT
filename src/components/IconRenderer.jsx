import * as LucideIcons from 'lucide-react';

export default function IconRenderer({ name, size = 24, color = 'currentColor', className = '', style = {} }) {
  // Map some custom names to Lucide icons if they don't match exactly
  const iconMap = {
    'MilkyWay': 'Sparkles',
    'Rainbow': 'Wind', // Lucide doesn't have a great Rainbow, maybe use CloudRain or Wind
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
    'Github': 'Github',
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
