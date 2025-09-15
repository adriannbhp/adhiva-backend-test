import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (_req, res) => res.json({ ok: true }));