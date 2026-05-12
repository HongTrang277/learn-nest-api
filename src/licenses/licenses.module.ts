// src/licenses/licenses.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { License, LicenseSchema } from './schemas/license.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }])
  ],
  controllers: [LicensesController],
  providers: [LicensesService],
})
export class LicensesModule {}