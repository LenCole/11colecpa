module.exports = {
  darkMode: 'class',
  content: [
    "./src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/blog/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/pages/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  theme: {
    screens: {
      'sm': '480p',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['serif'],
    },
    // colors: {
    //   // transparent: 'transparent',
    //   // black: '#000',
    //   // white: '#fff',
    // },
    // borderRadius: {
    //   'none': '0',
    //   'sm': '.125rem',
    //   DEFAULT: '.25rem',
    //   'lg': '.5rem',
    //   'full': '9999px',
    // },
  }
}
