import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import animation from 'tailwindcss-animated';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			animation: {
				tilt: 'tilt 10s infinite linear',
				pulse: 'pulse-bg 5s cubic-bezier(0, 0, 0, 0.5) infinite',
				'pulse-bg-once': 'pulse-bg-once 2s ease-in forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			},
			keyframes: {
				tilt: {
					'0%, 50%, 100%': {
						transform: 'rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(5deg)'
					},
					'75%': {
						transform: 'rotate(5deg)'
					}
				},
				'pulse-bg': {
					'0%': { backgroundColor: 'var(--tw-gradient-from)' },
					'50%': { backgroundColor: 'var(--tw-gradient-to)', transform: 'scale(1.5)' },
					'100%': { backgroundColor: 'var(--tw-gradient-from)' }
				},
				'pulse-bg-once': {
					to: { backgroundColor: 'transparent' }
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			spacing: {
				3.5: '14px',
				13: '52px',
				15: '60px',
				18: '72px',
				22: '84px',
				25: '100px',
				26: '110px',
				38: '152px',
				46: '184px',
				50: '200px'
			},
			screens: {
				sm: '430px',
				md: '786px',
				lg: '1200px',
				xl: '1440px'
			},
			lineHeight: {
				header: '60px'
			},
			fontSize: {
				head: '14px',
				'3.5xl': '32px',
				'4.5xl': '40px',
				'5.5xl': '56px'
			},
			fontFamily: {
				sans: ['"PublicSans"', ...defaultTheme.fontFamily.sans],
				ss: ['Source']
			},
			colors: {
				f1: '#0071B6',
				b1: '#F6F6F6',
				f2: '#003C61',
				f3: '#8A8A8A',
				f4: '#96D7FF',
				f5: '#05205E'
			}
		}
	},
	plugins: [
		forms,
		animation,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'wintry',
						enhancements: true
					}
				]
			}
		})
	]
} satisfies Config;
