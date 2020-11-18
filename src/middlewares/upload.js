import multer from "multer";

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
    // cb(null, `${__basedir}/resources/static/assets/uploads/`);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-xavier-${file.originalname}`);
  },
});

const uploadFile = multer({ storage, fileFilter: excelFilter });

export default uploadFile;
