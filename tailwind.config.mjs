/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`
		}
		return `rgb(var(${variableName}))`
	}
}

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			textColor: {
				'custom-primary': withOpacity('--color-primary'),
			},
			colors: {
				custom: {
					accent: withOpacity('--color-accent'),
					background: withOpacity('--color-background'),
				},
			},
			backgroundImage: {
				'custom-gradient': 'var(--color-gradient)',
			},
			animation: {
				text: 'text 5s ease infinite',
				point: 'point 300ms ease-out 3 alternate-reverse forwards',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
				point: {
					'0%': {
						'transform': 'translateY(0%)',
					},
					'100%': {
						'transform': 'translateY(-30%)',
					},
				},
			},
		},
	},
	plugins: [],
}
