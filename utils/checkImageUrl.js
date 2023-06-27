export const checkImageURL = (url) => {
  if (!url) return false
  else {
    const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
    console.log(pattern.test(url))
    return pattern.test(url);
  }
};