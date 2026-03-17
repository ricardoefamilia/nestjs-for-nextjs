import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './database/prisma.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PostModule, UploadModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
