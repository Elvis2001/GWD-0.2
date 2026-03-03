declare module "cors";
declare module "dotenv";
declare module "multer";
declare module "cloudinary";

declare namespace Express {
  interface Request {
    adminUser?: {
      id: string;
      email?: string;
    };
    files?: unknown;
  }
}
