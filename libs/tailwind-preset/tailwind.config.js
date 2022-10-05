const sharedTheme = {
  theme: {
    fontFamily: {
      headline: 'var(--font-headline)',
      body: 'var(--font-body)',
    },

    colors: {
      primary: {
        light: 'var(--primary-light)',
        DEFAULT: 'var(--primary)',
        dark: 'var(--primary-dark)',
      },
      secondary: {
        light: 'var(--secondary-light)',
        DEFAULT: 'var(--secondary)',
        dark: 'var(--secondary-dark)',
      },
      'main-nav-bg': 'var(--main-nav-bg)',
      'main-nav-link': {
        DEFAULT: 'var(--secondary)',
        active: 'var(--secondary-light)',
      },
    },

    extend: {
      gap: {
        'main-nav': '1rem',
      },

      height: {
        'main-nav': 'var(--main-nav-size)',
      },

      padding: {
        'main-nav': 'var(--main-nav-padding)',
      },

      maxWidth: {
        app: '768px',
      },
    },
  },
  plugins: [],
};

module.exports = sharedTheme;
