const multer = require('multer');

// Memóriában tároljuk a feltöltött fájlokat (buffer formátumban), hogy közvetlenül átadjuk a Cloudinary-nak (nem kell helyi mentés)
const storage = multer.memoryStorage();

// Biztonsági ellenőrzés: csak képeket engedjünk fel
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Engedélyezzük a fájlt
  } else {
    cb(new Error('Csak JPG, JPEG, PNG vagy WEBP formátumú képek engedélyezettek!'), false); // Tiltjuk a fájlt hibaüzenettel
  }
};

// Létrehozzuk a middleware példányt
const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Max 5 MB egy kép mérete
    files: 5 // Max 5 kép feltöltése egy hotelhez egyszerre
  },
  fileFilter: fileFilter
});

module.exports = uploadMiddleware;