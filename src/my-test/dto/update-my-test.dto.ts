import { PartialType } from '@nestjs/swagger';
import { CreateMyTestDto } from './create-my-test.dto';

export class UpdateMyTestDto extends PartialType(CreateMyTestDto) {}
