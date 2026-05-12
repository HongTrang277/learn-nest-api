// src/licenses/licenses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { License } from './schemas/license.schema';
import { CreateLicenseDto } from './dto/create-license.dto';

@Injectable()
export class LicensesService {

  constructor(@InjectModel(License.name) private licenseModel: Model<License>) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const newLicense = new this.licenseModel(createLicenseDto);
    return newLicense.save(); 
  }

  async findAll(): Promise<License[]> {
    return this.licenseModel.find().exec(); 
  }
}