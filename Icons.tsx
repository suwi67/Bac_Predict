
// A collection of simple SVG icons. In a larger app, consider a library or more robust management.
// Source: Heroicons, Tabler Icons, or similar, simplified for brevity.
// Added aria-hidden="true" to icons that are purely decorative or have adjacent text labels.
import React from 'react';

export const IconPlayerTrackNext: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V15.75L11.25 12L3 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 8.25V15.75L19.5 12L11.25 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25V15.75" />
  </svg>
);

export const IconPlayerTrackPrev: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25V15.75L12.75 12L21 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25V15.75L4.5 12L12.75 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25V15.75" />
  </svg>
);

export const IconTie: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 3m0 0l3-3m-3 3v4.5m0 0l3 3m-3-3l-3 3m12-6l3 3m0 0l3-3m-3 3v4.5m0 0l3 3m-3-3l-3 3" />
  </svg>
);

export const IconSparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75l-1.25-1.75L14.25 12l1.5-1.75L17 8.5l1.25 1.75L19.75 12l-1.5 1.75z" />
  </svg>
);

export const IconBulb: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-7.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75A.75.75 0 0110.5 6h3a.75.75 0 01.75.75v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-2.625c0-.621.504-1.125 1.125-1.125h2.25A1.125 1.125 0 009 11.25V6.75z" />
  </svg>
);

export const IconChartBar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const IconMessageChatbot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-6.375 3h9M3.75 3v13.5A2.25 2.25 0 006 18.75h12A2.25 2.25 0 0020.25 16.5V3.75A2.25 2.25 0 0018 1.5H6A2.25 2.25 0 003.75 3zM12 18.75v2.25m0-13.5V3.75M3 12h18" />
  </svg>
);

export const IconCircleFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="10" cy="10" r="10" />
  </svg>
);

export const IconSlash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15" />
  </svg>
);

export const IconPointFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="10" cy="10" r="5" />
  </svg>
);

export const IconStarFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" d="M10 2.5l2.293 4.646 5.126.745-3.708 3.614.875 5.105L10 14.125l-4.586 2.485.875-5.105L2.581 7.89l5.126-.745L10 2.5z" clipRule="evenodd" />
  </svg>
);

export const IconChartPie: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

export const IconListNumbers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25M3.75 17.25A.75.75 0 013 16.5V15a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75H6a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75h2.25V6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9H6.75V6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12H6.75" />
  </svg>
);

export const IconFlame: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6c.001-.004 0-.008.002-.012A5.591 5.591 0 0012.5 5.5a5.592 5.592 0 00-.306-.153A8.25 8.25 0 0115.362 5.214z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75V21M12 12.75H9.75M12 21H9.75M12 21V12.75M12 12.75A2.25 2.25 0 019.753 10.5M9.75 10.5A2.25 2.25 0 0012 12.75M9.75 10.5H12m0 0V21" />
  </svg>
);

export const IconHistory: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconCircleX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconInfoCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const IconBrandGithub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .5 -.6 1.2 -.5 2v3.5" />
  </svg>
);

export const IconTrendingUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

export const IconRefresh: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const IconCpu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5M15.75 3v1.5M8.25 19.5V21M12 19.5V21M15.75 19.5V21M3 8.25h1.5M3 12h1.5M3 15.75h1.5M19.5 8.25H21M19.5 12H21M19.5 15.75H21M9 17.25h6M9 6.75h6M6.75 9v6M17.25 9v6M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75z" />
  </svg>
);

export const IconFilterCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 10-4.5 0M3.75 6H7.5m3 12h9.75m-9.75 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 10-4.5 0m-3.75 0H7.5m9-6h3.75m-3.75 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 10-4.5 0m-3.75 0H7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25l3.75 3.75M16.5 15.75l3.75-3.75" />
  </svg>
);

export const IconShieldCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622C21 6.042 16.044 2.5 12 2.5c-1.944 0-3.791.501-5.402 1.464z" />
  </svg>
);

export const IconActivity: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h3m10.5 0h3M5.25 4.5l3.536 3.536m6.428-3.536l-3.536 3.536m0 9.192l3.536 3.536M8.786 19.5l-3.536-3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconClock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconViewfinder: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5V12a9 9 0 1018 0V10.5a1.5 1.5 0 00-1.5-1.5H4.5A1.5 1.5 0 003 10.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconPuzzle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 12h3M10.5 12a2.25 2.25 0 01-4.5 0m4.5 0a2.25 2.25 0 00-4.5 0M13.5 12a2.25 2.25 0 014.5 0m-4.5 0a2.25 2.25 0 004.5 0M12 7.5V3.75m0 3.75c-1.036 0-1.875-.84-1.875-1.875S10.964 3.75 12 3.75s1.875.84 1.875 1.875-1.875 1.875-1.875 1.875z" />
  </svg>
);

export const IconBadgeCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

export const IconBrain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a15.995 15.995 0 00-4.764 4.648l-3.876 5.814a1.151 1.151 0 001.597 1.597l5.814-3.876a15.996 15.996 0 004.649-4.763m-3.42-3.42a15.998 15.998 0 00-3.388 1.62m5.043 .025a15.994 15.994 0 01-1.622 3.389m-3.421-3.42a15.995 15.995 0 00-4.764-4.648L6.32 4.707a1.151 1.151 0 00-1.597 1.597l3.876 5.814a15.996 15.996 0 004.649 4.763m-3.42-3.42a15.995 15.995 0 004.764 4.648l3.876 5.814a1.151 1.151 0 001.597-1.597L14.146 17.68a15.996 15.996 0 00-4.649-4.763m3.42 3.42z" />
  </svg>
);

export const IconLogic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3-3m0 0l3-3m-3 3v6m0-6h6m-6 0l6-6M3.75 3v6m0 0h6M3.75 9l6-6M20.25 13.5l-3-3m0 0l-3-3m3 3v6m0-6h-6m6 0l-6-6m3 15v-6m0 0h-6m6 0l-6-6" />
  </svg>
);

export const IconCrosshair: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l12 0M12 6l0 12M12 12l0 .01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929a9.928 9.928 0 00-14.142 0m14.142 14.142a9.928 9.928 0 01-14.142 0" />
  </svg>
);

export const IconScale: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A3.75 3.75 0 016.75 3h10.5A3.75 3.75 0 0121 6.75v10.5A3.75 3.75 0 0117.25 21H6.75A3.75 3.75 0 013 17.25V6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75L6 15l3.75 2.25M14.25 12.75L18 15l-3.75 2.25M12 3v9" />
  </svg>
);

export const IconNetwork: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3.75 3.75h16.5M3.75 20.25h16.5M3.75 12h16.5" />
  </svg>
);

export const IconArrowsShuffle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-2.623-1.055-5.033-2.787-6.763M4.5 12c0 2.623 1.055 5.033 2.787 6.763m12.426-6.763L15 13.5m4.5-1.5L15 10.5M4.5 12H15m0 0L12 10.5M15 12L12 13.5m-7.5-1.5h4.5m-4.5 0L9 10.5m-4.5 1.5L9 13.5" />
  </svg>
);

export const IconTargetArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.25h-3l-.75.75 1.5 1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-2.25m0-13.5V3M3.375 12H12m8.625 0H12" />
  </svg>
);

export const IconDiamond: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324h5.363c.518 0 .747.681.363 1.003l-4.35 3.172a.563.563 0 00-.182.523l1.662 5.035a.563.563 0 01-.814.622l-4.322-3.152a.563.563 0 00-.666 0l-4.322 3.152a.563.563 0 01-.814-.622l1.662-5.035a.563.563 0 00-.182-.523L2.444 9.937a.563.563 0 01.363-1.003h5.363a.563.563 0 00.475-.324L11.48 3.5z" />
  </svg>
);

export const IconRecycle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-5.234-4.266-9.5-9.5-9.5S.5 6.766.5 12s4.266 9.5 9.5 9.5S19.5 17.234 19.5 12zM12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3M7.05 7.05l2.122 2.122M14.828 14.828l2.122 2.122M7.05 16.95l2.122-2.122M14.828 9.172l2.122-2.122" />
  </svg>
);
