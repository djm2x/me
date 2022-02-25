import { LanguageModule } from './language/language.module';
import { ProjectModule } from './project/project.module';
import { InfoModule } from './info/info.module';
import { ExperienceModule } from './experience/experience.module';
import { SkillModule } from './skill/skill.module';
import { EducationModule } from './education/education.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/roles.guard';
import { JwtAuthGuard } from './shared/jwt-auth.guard';
import { AllExceptionsFilter } from './shared/all-exceptions.filter';
import { MyTestModule } from './my-test/my-test.module';

@Module({
  imports: [
    HomeModule,
    EducationModule,
    SkillModule,
    ExperienceModule,
    InfoModule,
    ProjectModule,
    LanguageModule,
    /** Load and parse .env files from the environments directory */
    ConfigModule.forRoot({
      // envFilePath: '../.env',
      // load: [mysqlDB],
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'docs'),
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/db.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MyTestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule { }
