import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import db from "./src/database";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === API ROUTES ===
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example Basic Auth Mock
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    try {
      const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
      if (user) {
        res.json({ ...user, password: '' });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (e) {
      res.status(500).json({ error: "DB Error" });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    // VERY simple mock "Admin" check - Make first user an admin
    try {
      const userCount = (db.prepare("SELECT COUNT(*) as count FROM users").get() as any).count;
      const role = userCount === 0 ? 'admin' : 'user';
      const insert = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
      const result = insert.run(name, email, password, role);
      res.json({ id: result.lastInsertRowid, name, email, role });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Email already exists" });
    }
  });

  // Users Management 
  app.get("/api/users", (req, res) => {
    const users = db.prepare("SELECT id, name, email, role, createdAt FROM users").all();
    res.json(users);
  });

  // Progress Tracking
  app.get("/api/progress/:userId", (req, res) => {
    const progress = db.prepare("SELECT * FROM progress WHERE userId = ? ORDER BY date ASC").all(req.params.userId);
    res.json(progress);
  });

  app.post("/api/progress", (req, res) => {
    const { userId, weight, height } = req.body;
    // Calculate BMI
    // BMI = weight(kg) / height(m)^2
    const heightInMeters = height / 100;
    const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2);
    try {
      const insert = db.prepare("INSERT INTO progress (userId, weight, height, bmi) VALUES (?, ?, ?, ?)");
      const result = insert.run(userId, weight, height, bmi);
      res.json({ id: result.lastInsertRowid, bmi });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Offers
  app.get("/api/offers", (req, res) => {
    const offers = db.prepare("SELECT * FROM offers WHERE active = 1").all();
    res.json(offers);
  });
  
  app.post("/api/offers", (req, res) => {
    const { title, description, discountPercentage, image } = req.body;
    const insert = db.prepare("INSERT INTO offers (title, description, discountPercentage, image) VALUES (?, ?, ?, ?)");
    insert.run(title, description, discountPercentage, image);
    res.json({ success: true });
  });

  // Media
  app.get("/api/media", (req, res) => {
    const media = db.prepare("SELECT * FROM frontend_media").all();
    res.json(media);
  });
  app.post("/api/media", (req, res) => {
    const { type, url, description } = req.body;
    const insert = db.prepare("INSERT INTO frontend_media (type, url, description) VALUES (?, ?, ?)");
    insert.run(type, url, description);
    res.json({ success: true });
  });

  app.post("/api/auth/register-employee", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const insert = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
      const result = insert.run(name, email, password, 'employee');
      res.json({ id: result.lastInsertRowid, name, email, role: 'employee' });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Email already exists" });
    }
  });

  // Billing / Subscriptions (Mock Strip Payment)
  app.get("/api/subscriptions/all", (req, res) => {
    const subs = db.prepare(`
      SELECT * FROM subscriptions 
      ORDER BY startDate DESC
    `).all();
    res.json(subs);
  });

  app.get("/api/subscriptions/:userId", (req, res) => {
    if (req.params.userId === 'all') return; // Handled above roughly but to avoid issues with path param precedence
    const subs = db.prepare("SELECT * FROM subscriptions WHERE userId = ? ORDER BY startDate DESC").all(req.params.userId);
    res.json(subs);
  });

  app.post("/api/subscriptions/checkout", (req, res) => {
    const { userId, planCents } = req.body;
    // Mock successful payment
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription
    
    // Deactivate previous
    db.prepare("UPDATE subscriptions SET status = 'expired' WHERE userId = ? AND status = 'active'").run(userId);
    
    const insert = db.prepare("INSERT INTO subscriptions (userId, plan, endDate) VALUES (?, ?, ?)");
    insert.run(userId, `Monthly Plan ($${planCents/100})`, endDate.toISOString());
    res.json({ success: true, message: "Payment successful" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support history api fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
