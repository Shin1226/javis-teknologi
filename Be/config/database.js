import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Settings optimal untuk connection pooling
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10
});

// Test connection
db.connect()
  .then(() => {
    console.log('✅ Connected to Supabase PostgreSQL via Connection Pooling');
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error.message);
  });

export default db;