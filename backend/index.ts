import express from "express";
import cors from "cors";
import externalRoutes from "./routes/externalRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// router
app.use("/api", externalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`BFF API running on port ${PORT}`);
});
