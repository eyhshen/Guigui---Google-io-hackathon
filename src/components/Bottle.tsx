import React from 'react';
import { ProductShape } from '../types';

interface BottleProps {
  shape: ProductShape;
  colorHex: string;
  size?: number;
  className?: string;
}

export function Bottle({ shape, colorHex, size = 64, className = '' }: BottleProps) {
  // A simple mapping of shapes to SVG paths/elements
  // We'll use a unified viewBox="0 0 100 100"
  
  const renderShape = () => {
    switch (shape) {
      case 'pump':
        return (
          <g>
            <rect x="25" y="40" width="50" height="50" rx="10" fill={colorHex} />
            <rect x="40" y="25" width="20" height="15" fill="#e5e7eb" />
            <path d="M40 25 L35 15 L50 15 Z" fill="#9ca3af" />
            <rect x="50" y="10" width="10" height="10" fill="#9ca3af" />
            <rect x="60" y="10" width="15" height="5" fill="#9ca3af" rx="2" />
          </g>
        );
      case 'tube':
        return (
          <g>
            <path d="M25 20 L75 20 L65 80 L35 80 Z" fill={colorHex} />
            <rect x="35" y="80" width="30" height="15" fill="#4b5563" rx="2" />
          </g>
        );
      case 'jar':
        return (
          <g>
            <rect x="20" y="40" width="60" height="40" rx="8" fill={colorHex} />
            <rect x="15" y="25" width="70" height="15" rx="4" fill="#374151" />
          </g>
        );
      case 'dropper':
        return (
          <g>
            <rect x="30" y="40" width="40" height="50" rx="5" fill={colorHex} />
            <rect x="40" y="25" width="20" height="15" fill="#d1d5db" />
            <path d="M40 25 Q 50 5 60 25" fill="#374151" />
          </g>
        );
      case 'spray':
        return (
          <g>
            <rect x="35" y="45" width="30" height="50" rx="15" fill={colorHex} />
            <rect x="40" y="30" width="20" height="15" fill="#e5e7eb" />
            <rect x="35" y="20" width="30" height="10" fill="#d1d5db" rx="2" />
            <circle cx="65" cy="25" r="2" fill="#9ca3af" />
          </g>
        );
      case 'stick':
        return (
          <g>
            <rect x="35" y="40" width="30" height="50" rx="4" fill={colorHex} />
            <rect x="35" y="20" width="30" height="20" rx="4" fill="#f3f4f6" />
          </g>
        );
      case 'bottle':
      default:
        return (
          <g>
            <rect x="30" y="40" width="40" height="50" rx="10" fill={colorHex} />
            <rect x="40" y="20" width="20" height="20" fill="#f3f4f6" />
            <rect x="38" y="15" width="24" height="5" fill="#d1d5db" rx="2" />
          </g>
        );
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#drop-shadow)">
        {renderShape()}
      </g>
      <defs>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  );
}
