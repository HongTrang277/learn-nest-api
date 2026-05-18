// src/licenses/licenses.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicensesService } from '@/licenses/licenses.service';
import { LicensesController } from '@/licenses/licenses.controller';
import { License, LicenseSchema } from '@/licenses/schemas/license.schema';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }])
  ],
  controllers: [LicensesController],
  providers: [LicensesService, RolesGuard],
})
export class LicensesModule {}