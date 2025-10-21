// BE/config/database.js - UNTUK POSTGRESQL (SUPABASE)
import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : false
});

// Test connection
db.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL database (Supabase)');
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error.message);
  });

export default db;