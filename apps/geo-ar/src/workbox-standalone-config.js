module.exports = {
  globDirectory: "./",
  globPatterns: [
    "**/*.{css,eot,html,ico,jpg,js,json,png,svg,ttf,txt,webmanifest,woff,woff2,webm,xml,csv,md}",
  ],
  globFollow: true, // follow symlinks
  globStrict: true, // fail the build if anything goes wrong while reading the files
  swDest: "./service-worker.js",
  maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20Mb
};
