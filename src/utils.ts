// Generate live screenshot URL from a website using image.thum.io
export const getScreenshotUrl = (url: string) =>
  `https://image.thum.io/get/width/600/crop/400/${url}`
