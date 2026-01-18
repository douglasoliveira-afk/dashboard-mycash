/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primitive Tokens (Mapped from extracted values)
                neutral: {
                    0: '#FFFFFF',
                    100: '#F9FAFB',
                    500: '#9CA3AF',
                    1000: '#111827', // Also used for text-primary
                    1100: '#080B12',
                    DEFAULT: '#9CA3AF'
                },
                brand: {
                    100: '#FBFFE6',
                    500: '#DFFE35', // Primary Brand Color
                    1000: '#5A6B01',
                    DEFAULT: '#DFFE35'
                },
                danger: {
                    100: '#FEEEEE',
                    500: '#F04438',
                    1000: '#330E0E',
                    DEFAULT: '#F04438'
                },
                success: {
                    100: '#E8F9F2',
                    500: '#2BB673',
                    1000: '#042518',
                    DEFAULT: '#2BB673'
                },
                warning: {
                    100: '#FEF3E7',
                    500: '#F79009',
                    1000: '#331B02',
                    DEFAULT: '#F79009'
                },
                info: {
                    100: '#EBF5FF',
                    500: '#55A1F2',
                    1000: '#081B30',
                    DEFAULT: '#55A1F2'
                },
                // Semantic Tokens (Proxies)
                primary: {
                    DEFAULT: '#DFFE35', // brand-500
                    foreground: '#111827', // neutral-1000
                },
                secondary: {
                    DEFAULT: '#E7E8E9', // secondary-50 (Mapped)
                    foreground: '#111827',
                },
                background: '#FFFFFF', // neutral-0
                surface: '#FFFFFF', // surface-500
                text: {
                    primary: '#111827', // neutral-1000
                    secondary: '#9CA3AF', // neutral-500
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                '0': '0px',
                '2': '2px', // space-2
                '4': '4px', // space-4
                '8': '8px', // space-8
                '12': '12px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '40': '40px',
                '48': '48px',
                '64': '64px',
                '80': '80px',
                '88': '88px',
                '128': '128px',
            },
            borderRadius: {
                'none': '0px',
                'sm': '4px', // shape-4
                'md': '8px', // shape-8
                'lg': '12px', // shape-12
                'xl': '16px', // shape-16
                'full': '9999px', // shape-100 (approx)
            }
        },
    },
    plugins: [],
}
