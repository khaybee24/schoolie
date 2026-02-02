const upload = require('../utils/multer');

describe('multer image extension validation', () => {
  test('accepts common image extensions', () => {
    expect(upload.isSupportedImageExtension('photo.jpg')).toBe(true);
    expect(upload.isSupportedImageExtension('photo.jpeg')).toBe(true);
    expect(upload.isSupportedImageExtension('photo.png')).toBe(true);
  });

  test('rejects unsupported extensions', () => {
    expect(upload.isSupportedImageExtension('photo.gif')).toBe(false);
    expect(upload.isSupportedImageExtension('photo.pdf')).toBe(false);
  });

  test('is case-insensitive for extensions', () => {
    expect(upload.isSupportedImageExtension('photo.JPEG')).toBe(true);
    expect(upload.isSupportedImageExtension('photo.PNG')).toBe(true);
  });
});
