const express = require("express"); //web framework for node.js

const morgan = require("morgan"); // http request logger middleware for node.js

const routes = require("./routes/index");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");

// const xss = require("xss");

const cors = require("cors");

// const cookieParser = require("cookie-parser"); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

// const session = require("cookie-session"); // Simple cookie-based session middleware.

const app = express();

//
app.use(
    cors({
      origin: "*",
  
      methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  
      credentials: true, //
  
      //   Access-Control-Allow-Credentials is a header that, when set to true , tells browsers to expose the response to the frontend JavaScript code. The credentials consist of cookies, authorization headers, and TLS client certificates.
    })
  );
  
  // app.use(cookieParser());
  
  // Setup express response and body parser configurations
  app.use(express.json({ limit: "10kb" })); // Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
  app.use(bodyParser.json()); // Returns middleware that only parses json
  app.use(bodyParser.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies
  
  // app.use(
  //   session({
  //     secret: "keyboard cat",
  //     proxy: true,
  //     resave: true,
  //     saveUnintialized: true,
  //     cookie: {
  //       secure: false,
  //     },
  //   })
  // );
  
  app.use(helmet());
  
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  
  const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // In one hour
    message: "Too many Requests from this IP, please try again in an hour!",
  });
  
  app.use("/tawk", limiter);
  
  // app.use(
  //   express.urlencoded({
  //     extended: true,
  //   })
    
  // ); // Returns middleware that only parses urlencoded bodies
  
  app.use(mongoSanitize());
  
  //app.use(xss());
  
  app.use(routes);
  
  module.exports = app;