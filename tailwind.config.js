module.exports = {
  content: [
    './app/views/**/*.html.erb', 
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/assets/builds/**/*.js' // Ensure JS files are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Ensure DaisyUI plugin is added here
  ],
}