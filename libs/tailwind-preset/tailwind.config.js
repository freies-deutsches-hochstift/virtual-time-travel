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

      /* libs/Ui */
      ui: {
        /* MainNav */
        nav: {
          bg: 'var(--ui-nav-bg)',
          link: {
            DEFAULT: 'var(--ui-nav-link)',
            active: 'var(--ui-nav-link-active)',
          },
        },

        /* Dialog */
        dialog: {
          bg: 'var(--main-nav-bg)',
          primary: {
            DEFAULT: 'var(--secondary)',
            v2: 'var(--secondary-light)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            v2: 'var(--secondary-light)',
          },
        },
      },
    },

    extend: {
      gap: {
        ui: {
          nav: '1rem',
        },
      },

      height: {
        ui: {
          nav: 'var(--ui-nav-size)',
        },
      },

      padding: {
        ui: {
          nav: 'var(--ui-nav-padding)',
        },
      },

      maxWidth: {
        app: '768px',
      },
    },
  },
  plugins: [],
};

module.exports = sharedTheme;
