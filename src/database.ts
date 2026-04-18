import Database from 'better-sqlite3';
import { join } from 'path';

// Connect to SQLite Database
const db = new Database(join(process.cwd(), 'gym-manager.db'), { verbose: console.log });

// Initialize Database Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user', -- 'user' or 'admin' or 'employee'
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    weight REAL NOT NULL,
    height REAL NOT NULL,
    bmi REAL NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    plan TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'expired', 'canceled'
    paymentStatus TEXT DEFAULT 'paid', -- 'paid', 'pending'
    startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    endDate DATETIME NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    discountPercentage REAL NOT NULL,
    image TEXT,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS frontend_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'image' or 'video'
    url TEXT NOT NULL,
    description TEXT
  );
`);

export default db;
