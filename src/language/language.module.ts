import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';

@Module({
	controllers: [LanguageController],
	imports: [
		TypeOrmModule.forFeature([LanguageService]),
	],
	providers: [ ]
})
export class LanguageModule {}
