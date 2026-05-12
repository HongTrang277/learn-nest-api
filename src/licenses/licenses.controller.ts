import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard'; 
@ApiTags('Licenses') 
@ApiBearerAuth()      
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  @UseGuards(JWTAuthGuard) 
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licensesService.create(createLicenseDto);
  }

  @Get()
  findAll() {
    return this.licensesService.findAll();
  }
}