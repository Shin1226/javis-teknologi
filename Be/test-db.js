import mysql from 'mysql2/promise';

async function testDatabase() {
  try {
    console.log('🧪 Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'javisteknologi'
    });

    console.log('✅ Database connected successfully!');
    
    // Test query users
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('📊 Total users:', users.length);
    
    // Show user details
    if (users.length > 0) {
      console.log('👤 User details:');
      users.forEach(user => {
        console.log('  Email:', user.email);
        console.log('  Name:', user.name);
        console.log('  Password hash:', user.password);
        console.log('  Hash length:', user.password.length);
        console.log('  ---');
      });
    } else {
      console.log('❌ No users found in database');
    }
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
}

testDatabase();