import React from 'react';

export interface TechIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

/**
 * Official Git Logo: Rotated orange diamond with branching commit nodes
 */
export const GitOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#F05032" fillOpacity="0.15" />
    <path
      d="M21.6 10.9L13.1 2.4a1.5 1.5 0 0 0-2.1 0L8.9 4.5l2.7 2.7a1.8 1.8 0 0 1 2.2 2.3l2.6 2.6a1.8 1.8 0 1 1-1.1 1.1l-2.4-2.4v4.5a1.8 1.8 0 1 1-1.5 0v-4.6a1.8 1.8 0 0 1-1-2.4L7.8 6.1 2.4 11.5a1.5 1.5 0 0 0 0 2.1l8.5 8.5a1.5 1.5 0 0 0 2.1 0l8.6-8.6a1.5 1.5 0 0 0 0-2.6z"
      fill="#F05032"
    />
  </svg>
);

/**
 * Official Docker Logo: Blue whale with shipping containers
 */
export const DockerOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#2496ED" fillOpacity="0.15" />
    {/* Containers */}
    <rect x="5.5" y="8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="8" y="8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="10.5" y="8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="8" y="5.8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="10.5" y="5.8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="13" y="5.8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="13" y="8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    <rect x="15.5" y="8" width="2" height="1.8" rx="0.3" fill="#2496ED" />
    {/* Whale Body */}
    <path
      d="M21.5 11.2c-.4-.1-1.3-.2-2.1.3-.3.2-.6.5-.8.9-.7-.3-1.6-.4-2.5-.4-4.8 0-7.8 3.5-7.8 5 0 .2 0 .4.1.6 1.1 1.4 3.5 1.9 6.2 1.9 4.2 0 7.4-1.8 7.4-4.8 0-.4-.1-.8-.2-1.2.6-.6.8-1.5-.3-2.3z"
      fill="#2496ED"
    />
    <circle cx="16.5" cy="13.5" r="0.6" fill="#fff" />
  </svg>
);

/**
 * Official Kubernetes Logo: 7-spoked ship steering wheel inside heptagon
 */
export const KubernetesOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#326CE5" fillOpacity="0.15" />
    {/* Steering Wheel Outer Ring */}
    <circle cx="12" cy="12" r="7.5" stroke="#326CE5" strokeWidth="1.5" fill="none" />
    {/* Central Hub */}
    <circle cx="12" cy="12" r="2.2" fill="#326CE5" />
    <circle cx="12" cy="12" r="1.1" fill="#fff" />
    {/* 7 Spoke lines and handles */}
    <path
      d="M12 4.5v15M5.2 7.7l13.6 8.6M5.2 16.3l13.6-8.6M4.5 12h15"
      stroke="#326CE5"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Official Linux Logo: Tux the penguin with yellow beak and flippers
 */
export const LinuxOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#FCC624" fillOpacity="0.15" />
    {/* Penguin Body (Black) */}
    <ellipse cx="12" cy="13" rx="6.5" ry="7.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
    {/* White Belly */}
    <ellipse cx="12" cy="14" rx="4" ry="5.5" fill="#f8fafc" />
    {/* Eyes */}
    <ellipse cx="10" cy="8.5" rx="1.2" ry="1.6" fill="#fff" />
    <ellipse cx="14" cy="8.5" rx="1.2" ry="1.6" fill="#fff" />
    <circle cx="10.4" cy="8.6" r="0.6" fill="#0f172a" />
    <circle cx="13.6" cy="8.6" r="0.6" fill="#0f172a" />
    {/* Beak */}
    <polygon points="12,9.2 10.2,11.2 13.8,11.2" fill="#FCC624" />
    {/* Feet / Flippers */}
    <ellipse cx="8.5" cy="20" rx="2.5" ry="1.2" fill="#FCC624" />
    <ellipse cx="15.5" cy="20" rx="2.5" ry="1.2" fill="#FCC624" />
  </svg>
);

/**
 * Official HashiCorp Terraform Logo: 4 isometric geometric prism tiles
 */
export const TerraformOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#844FBA" fillOpacity="0.15" />
    {/* Top Left Tile */}
    <polygon points="4.5,4 9.5,6.8 9.5,12 4.5,9.2" fill="#844FBA" />
    {/* Top Right Tile */}
    <polygon points="10.5,7.4 15.5,10.2 15.5,15.4 10.5,12.6" fill="#A069D6" />
    {/* Rightmost Small Tile */}
    <polygon points="16.5,10.8 21.5,13.6 21.5,18.8 16.5,16" fill="#844FBA" />
    {/* Bottom Left Tile */}
    <polygon points="10.5,13.8 15.5,16.6 15.5,21.8 10.5,19" fill="#6B34A3" />
  </svg>
);

/**
 * Official DevOps Logo: Continuous Infinity Loop with CI/CD Gradient
 */
export const DevOpsOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#A855F7" fillOpacity="0.15" />
    <defs>
      <linearGradient id="devopsGrad" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path
      d="M7.5 7.5C5 7.5 3 9.5 3 12s2 4.5 4.5 4.5c2.2 0 3.7-1.5 4.5-2.7.8 1.2 2.3 2.7 4.5 2.7 2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5c-2.2 0-3.7 1.5-4.5 2.7C11.2 9 9.7 7.5 7.5 7.5zm0 2.2c1.4 0 2.4 1.1 3 2.3-.6 1.2-1.6 2.3-3 2.3-1.3 0-2.3-1-2.3-2.3 0-1.3 1-2.3 2.3-2.3zm9 0c1.3 0 2.3 1 2.3 2.3 0 1.3-1 2.3-2.3 2.3-1.4 0-2.4-1.1-3-2.3.6-1.2 1.6-2.3 3-2.3z"
      fill="url(#devopsGrad)"
    />
  </svg>
);

/**
 * Roadmap Icon: Star/Compass Career Path
 */
export const RoadmapOfficialIcon: React.FC<TechIconProps> = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ flexShrink: 0, ...style }}
  >
    <rect width="24" height="24" rx="5" fill="#EAB308" fillOpacity="0.15" />
    <circle cx="12" cy="12" r="7.5" stroke="#EAB308" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
    <path
      d="M12 4.5L14 9.5L19 12L14 14.5L12 19.5L10 14.5L5 12L10 9.5L12 4.5Z"
      fill="#EAB308"
      stroke="#CA8A04"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="12" r="1.5" fill="#fff" />
  </svg>
);
