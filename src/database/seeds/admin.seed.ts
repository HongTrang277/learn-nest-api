import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminData = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin123!',
  };

  try {
    const existing = await usersService.findByUsername(adminData.username);
    if (existing) {
      console.log('Admin đã tồn tại, bỏ qua seed.');
    } else {
      // tạo user (role mặc định là 'user')
      const newUser = await usersService.create(adminData);
      // update role thành 'admin' — chỉ thực hiện nội bộ, không qua API
      await usersService.updateRole((newUser as any)._id.toString(), 'admin');
      console.log('Tạo admin thành công!');
      console.log(`   Username: ${adminData.username}`);
      console.log(`   Password: ${adminData.password}`);
    }
  } catch (error) {
    console.error('Lỗi khi seed:', error.message);
  } finally {
    await app.close();
  }
}

seed();
