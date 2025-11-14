// index.js (Node server)

import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";  
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

// CORS: MUST be before session & routes
app.use(
  cors({
    credentials: true, // support cookies
    origin: process.env.CLIENT_URL || "http://localhost:3000", // frontend URL
  })
);

// Session options
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));

// JSON middleware AFTER CORS & session
app.use(express.json());

// Lab5 / Hello demos
Hello(app);
Lab5(app);

// Kambaz routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);  
EnrollmentsRoutes(app, db);

const port = process.env.PORT || 4000;
app.listen(port);
