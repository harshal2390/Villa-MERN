import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/villahub")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const villaSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  image: String,
  description: String,
});

const Villa = mongoose.model("Villa", villaSchema);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

//  LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "SECRET_KEY", {
      expiresIn: "1h",
    });
    console.log(token);
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

//  GET ALL VILLAS
app.get("/villas", verifyToken, async (req, res) => {
  try {
    const villas = await Villa.find();
    res.json(villas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET SINGLE VILLA
app.get("/villas/:id", verifyToken, async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id);
    res.json(villa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  ADD VILLA
app.post("/villas", verifyToken, async (req, res) => {
  try {
    const villa = new Villa(req.body);
    await villa.save();
    res.json(villa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  UPDATE VILLA
app.put("/villas/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Villa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  DELETE VILLA
app.delete("/villas/:id", verifyToken, async (req, res) => {
  try {
    await Villa.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/villas/bulk", verifyToken, async (req, res) => {
  try {
    const villas = await Villa.insertMany(req.body);
    res.json(villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================
app.listen(5000, () => console.log("Server running on port 5000"));
