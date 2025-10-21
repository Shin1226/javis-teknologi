import bcrypt from 'bcryptjs';

async function testPassword() {
  try {
    const storedHash = '$2a$12$8ZBK5hDPuVq6e8Ot6SAkBuR3OPr5v7Q13nXqQFx.ySqjJqNZrq1Ym';
    const testPassword = 'password123';
    
    console.log('🧪 Testing password verification...');
    console.log('🔐 Stored hash:', storedHash);
    console.log('🔑 Test password:', testPassword);
    
    const isValid = await bcrypt.compare(testPassword, storedHash);
    console.log('✅ Password validation result:', isValid);
    
    if (!isValid) {
      console.log('❌ Password does not match!');
      console.log('💡 Try these passwords:');
      
      const commonPasswords = ['password', 'admin123', 'Password123', 'password123 '];
      for (const pwd of commonPasswords) {
        const result = await bcrypt.compare(pwd, storedHash);
        console.log(`   "${pwd}": ${result ? '✅ MATCH' : '❌ NO MATCH'}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testPassword();