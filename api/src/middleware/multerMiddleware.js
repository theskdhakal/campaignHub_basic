import multer from "multer";

//setup multer

const imageFolderPath = "api/public/img";

const storage = multer.diskStorage({
  //where to store the file

  destination: (req, file, cb) => {
    cb(null, imageFolderPath);
  },

  //what name do you want to give
  filename: (req, file, cb) => {
    //rename fileName

    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
