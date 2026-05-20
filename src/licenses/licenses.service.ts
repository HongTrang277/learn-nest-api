// src/licenses/licenses.service.ts
import { Injectable } from '@nestjs/common';
import { License } from '@/licenses/schemas/license.schema';
import { CreateLicenseDto } from '@/licenses/dto/create-license.dto';
import { LicensesRepository } from '@/licenses/licenses.repository';
import { PaginationDto, PaginationResponseDto } from '@/common/dto/pagination.dto';

@Injectable()
export class LicensesService {

  constructor(private readonly licensesRepository: LicensesRepository) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    return this.licensesRepository.create(createLicenseDto);
  }

  async findAll(): Promise<License[]> {
    return this.licensesRepository.findAll();
  }

  async findAllPaged(query: PaginationDto): Promise<PaginationResponseDto<License>> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const { data, total } = await this.licensesRepository.findPaged(page, limit);

    return new PaginationResponseDto<License>(data, page, limit, total);
  }
}