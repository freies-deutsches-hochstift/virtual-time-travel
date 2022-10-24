const sharedTheme = {
  theme: {
    fontFamily: {
      headline: "var(--font-headline)",
      body: "var(--font-body)",
    },

    colors: {
      primary: {
        a: "var(--primary-a)",
        DEFAULT: "var(--primary)",
        b: "var(--primary-b)",
      },
      secondary: {
        light: "var(--secondary-light)",
        DEFAULT: "var(--secondary)",
        dark: "var(--secondary-dark)",
      },

      /* libs/Ui */
      ui: {
        /* MainNav */
        nav: {
          bg: "var(--ui-nav-bg)",
          link: {
            DEFAULT: "var(--ui-nav-link)",
            active: "var(--ui-nav-link-active)",
          },
        },

        /* Dialog */
        dialog: {
          overlay: "var(--ui-dialog-overlay)",
          bg: "var(--ui-dialog-bg)",
          primary: {
            DEFAULT: "var(--ui-dialog-primary)",
            v2: "var(--ui-dialog-primary-v2)",
          },
          secondary: {
            DEFAULT: "var(--ui-dialog-secondary)",
            v2: "var(--ui-dialog-secondary-v2)",
          },
        },

        /* Button */
        button: {
          primary: {
            DEFAULT: "var(--ui-button-primary)",
            bg: "var(--ui-button-primary-bg)",
          },

          secondary: {
            DEFAULT: "var(--ui-button-secondary)",
            bg: "var(--ui-button-secondary-bg)",
          },

          disabled: {
            DEFAULT: "var(--ui-button-disabled)",
            bg: "var(--ui-button-disabled-bg)",
          },

          highlight: {
            DEFAULT: "var(--ui-button-highlight)",
            bg: "var(--ui-button-highlight-bg)",
          },
        },

        pov: {
          DEFAULT: "var(--ui-pov-primary)",

          compass: {
            DEFAULT: "var(--ui-pov-compass-primary-text)",
            bg: "var(--ui-pov-compass-primary)",
            highlight: {
              DEFAULT: "var(--ui-pov-compass-highlight-text)",
              bg: "var(--ui-pov-compass-highlight)",
            },
          },
        },

        /* Cards */
        cards: {
          DEFAULT: "var(--ui-cards-text)",
          bg: "var(--ui-cards-bg)",
          highlight: {
            DEFAULT: "var(--ui-cards-highlight)",
            a: "var(--ui-cards-highlight-a)",
          },
          details: {
            DEFAULT: "var(--ui-card-details-text)",
            bg: "var(--ui-card-details-bg)",
          },
        },
      },
    },

    extend: {
      gap: {
        ui: {
          nav: "var(--ui-nav-links-gap)",
        },
      },

      width: {
        ui: {
          pov: {
            DEFAULT: "var(--ui-pov-size)",
            wave: "var(--ui-pov-wave-size)",
            compass: {
              tick: "var(--ui-pov-compass-tick-width)",
              tickmarker: "var(--ui-pov-compass-tickmarker-width)",
            },
          },
          toggle: "var(--ui-toggle-size)",
        },
      },

      minWidth: {
        ui: {
          toggle: "calc(var(--ui-toggle-size) * 2)",
        },
      },

      height: {
        ui: {
          nav: "var(--ui-nav-size)",
          pov: {
            DEFAULT: "var(--ui-pov-size)",
            wave: "var(--ui-pov-wave-size)",
            compass: {
              tick: "var(--ui-pov-compass-tick-height)",
              tickmarker: "var(--ui-pov-compass-tickmarker-height)",
            },
          },
          toggle: "var(--ui-toggle-size)",
        },
      },

      inset: {
        ui: {
          pov: {
            DEFAULT: "calc(var(--ui-pov-wave-size) / 2 + 10vh)",
            compass: {
              tick: "var(--ui-pov-compass-tick-inset)",
              tickmarker: "var(--ui-pov-compass-tickmarker-inset)",
            },
          },
        },
      },

      padding: {
        ui: {
          nav: "var(--ui-nav-padding)",
          dialog: "var(--ui-dialog-padding)",
        },
      },

      maxWidth: {
        app: "var(--app-max-width)",
        ui: {
          dialog: "var(--ui-dialog-max-width)",
        },
      },

      zIndex: {
        max: "999",
        top: "99",
      },

      borderRadius: {
        ui: {
          button: "var(--ui-button-radius)",
          dialog: "var(--ui-dialog-radius)",
        },
      },
    },
  },
  plugins: [],
};

module.exports = sharedTheme;
