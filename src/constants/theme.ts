export const Colors = {
  light: {
    text: '#111827',
    muted: '#6b7280',
    background: '#f3f4f6',
    card: '#ffffff',
    border: '#e5e7eb',
    primary: '#4f46e5', // Unimate 
    onPrimary: '#ffffff',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
  },
  dark: {
    text: '#f9fafb',
    muted: '#9ca3af',
    background: '#0f172a', // Tamno plava pozadina
    card: '#1e293b',       // Tamna kartica
    border: '#334155',
    primary: '#818cf8',
    onPrimary: '#0f172a',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
  },
} as const;

export type Theme = typeof Colors['light'];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;