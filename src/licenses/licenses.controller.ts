import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LicensesService } from '@/licenses/licenses.service';
import { CreateLicenseDto } from '@/licenses/dto/create-license.dto';
import { JWTAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
@ApiTags('Licenses') 
@ApiBearerAuth()      
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JWTAuthGuard, RolesGuard)
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licensesService.create(createLicenseDto);
  }

  @Get()
  findAll() {
    return this.licensesService.findAll();
  }
}