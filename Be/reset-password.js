import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

async function resetPassword() {
  try {
    // Generate new hash for password123
    const newPassword = 'password123';
    const newHash = await bcrypt.hash(newPassword, 12);
    
    console.log('🔄 Generating new password hash...');
    console.log('🔑 New password:', newPassword);
    console.log('🔐 New hash:', newHash);
    
    // Update database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'javisteknologi'
    });
    
    await connection.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [newHash, 'admin@javisteknologi.com']
    );
    
    console.log('✅ Password updated in database!');
    
    // Verify the new hash
    const isValid = await bcrypt.compare(newPassword, newHash);
    console.log('✅ New password verification:', isValid);
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

resetPassword();