module.exports = {
  app: {
    name: "Ecom App",
    baseUrl: process.env.BASEURL || "http://localhost:7500",
    origin_front: process.env.ORIGIN_FRONT || "http://localhost:3000",
    // origin_front: process.env.ORIGIN_FRONT || "http://localhost:5173",
  },
  port: process.env.PORT || 7500,
  database: {
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: "1d",
  },
  color: {
    green: "\x1b[32m",
    red: "\x1b[31m",
  },
  // mail: {
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   user: process.env.AUTH_USER,
  //   pass: process.env.AUTH_PASSWORD,
  // },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
