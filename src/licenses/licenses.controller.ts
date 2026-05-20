import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { LicensesService } from '@/licenses/licenses.service';
import { CreateLicenseDto } from '@/licenses/dto/create-license.dto';
import { JWTAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { PaginationDto, PaginationResponseDto } from '@/common/dto/pagination.dto';
import { License } from '@/licenses/schemas/license.schema';

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
  @ApiOkResponse({ description: 'Danh sách chứng chỉ phân trang' })
  findAll(@Query() query: PaginationDto) {
    return this.licensesService.findAllPaged(query);
  }
}