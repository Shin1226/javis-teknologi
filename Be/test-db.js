import mysql from 'mysql2/promise';

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'javisteknologi'
    });

    console.log('Database connected successfully!');
 
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('Total users:', users.length);

    if (users.length > 0) {
      console.log('User details:');
      users.forEach(user => {
        console.log('Name:', user.name);
        console.log('Password hash:', user.password);
        console.log('Hash length:', user.password.length);
        console.log('---');
      });
    } else {
      console.log('No users found in database');
    }
    
    await connection.end();
    
  } catch (error) {
    console.log('Database error:', error.message);
  }
}

testDatabase();