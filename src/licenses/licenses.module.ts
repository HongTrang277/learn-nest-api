// src/licenses/licenses.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { License, LicenseSchema } from './schemas/license.schema';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }])
  ],
  controllers: [LicensesController],
  providers: [LicensesService, RolesGuard],
})
export class LicensesModule {}