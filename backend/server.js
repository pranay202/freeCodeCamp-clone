//libraries
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";

// configs
import googleAuthConfig from "./config/google.config.js";
import routeConfig from "./config/route.config.js";

//Routes
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//middlewares
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());

// passport cofiguration
googleAuthConfig(passport);
routeConfig(passport);

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}..`.yellow
      .bold
  )
);
