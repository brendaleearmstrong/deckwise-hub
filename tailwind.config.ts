
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				slate: {
					DEFAULT: '#3A5A7A',
					light: '#6282A0',
					dark: '#2A4560',
					foreground: '#FFFFFF'
				},
				green: {
					50: '#ECFDF5',
					100: '#D1FAE5',
					500: '#10B981',
					600: '#059669',
					700: '#047857',
					800: '#065F46',
					900: '#064E3B'
				},
				// Changed from rust to green to match the image
				rust: {
					DEFAULT: '#2E7D32', // Changed to match the green in the image
					light: '#4CAF50',
					dark: '#1B5E20',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#F57C00',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#43A047',
					foreground: '#FFFFFF'
				},
				info: {
					DEFAULT: '#0288D1',
					foreground: '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'hammer-tap': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-15deg)' },
					'50%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'nail-gun-tap': {
					'0%': { transform: 'translateY(0)' },
					'25%': { transform: 'translateY(2px)' },
					'50%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'hammer-tap': 'hammer-tap 0.3s ease-in-out',
				'nail-gun-tap': 'nail-gun-tap 0.3s ease-in-out'
			},
			fontFamily: {
				'roboto': ['Roboto', 'sans-serif'],
				'open-sans': ['"Open Sans"', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
