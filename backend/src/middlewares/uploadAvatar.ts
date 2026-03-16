import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

// 保存先ディレクトリ
const AVATAR_DIR = "uploads/avatars";

// storage 定義
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ディレクトリが無ければ作成
    if (!fs.existsSync(AVATAR_DIR)) {
      fs.mkdirSync(AVATAR_DIR, { recursive: true });
    }
    cb(null, AVATAR_DIR);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${ext}`;
    cb(null, filename);
  },
});

// avatar アップロード用ミドルウェア
export const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("画像ファイルのみアップロード可能です"));
      return;
    }
    cb(null, true);
  },
});
