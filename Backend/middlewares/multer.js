import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory

const multerUpload = multer({
  storage, // memory storage
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const singleAvatar = multerUpload.single("avatar");
const attachmentsMulter = multerUpload.array("files", 5);

export { singleAvatar, attachmentsMulter };
