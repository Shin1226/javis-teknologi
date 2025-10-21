// BE/reset-database.js
import db from './config/database.js';
import bcrypt from 'bcryptjs';

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');

    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Users table created/verified');

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 12);
    console.log('🔑 Password hashed');

    // Insert demo user
    const [result] = await db.execute(`
      INSERT INTO users (email, password, name) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        password = VALUES(password),
        name = VALUES(name)
    `, ['admin@javisteknologi.com', hashedPassword, 'Administrator']);

    console.log('✅ Demo user inserted/updated');

    // Verify the user was created
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', ['admin@javisteknologi.com']);
    
    if (users.length > 0) {
      console.log('👤 User verification:');
      console.log('   Email:', users[0].email);
      console.log('   Name:', users[0].name);
      console.log('   Password hash:', users[0].password.substring(0, 20) + '...');
    }

    console.log('🎉 Database reset completed successfully!');
    console.log('📧 Login credentials:');
    console.log('   Email: admin@javisteknologi.com');
    console.log('   Password: password123');
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
  } finally {
    process.exit();
  }
}

resetDatabase();