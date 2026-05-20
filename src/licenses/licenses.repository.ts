import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { License } from '@/licenses/schemas/license.schema';
import { CreateLicenseDto } from '@/licenses/dto/create-license.dto';

@Injectable()
export class LicensesRepository {
  constructor(@InjectModel(License.name) private readonly licenseModel: Model<License>) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const newLicense = new this.licenseModel(createLicenseDto);
    return newLicense.save();
  }

  async findAll(): Promise<License[]> {
    return this.licenseModel.find().exec();
  }

  async findPaged(page: number, limit: number): Promise<{ data: License[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.licenseModel.find().skip(skip).limit(limit).exec(),
      this.licenseModel.countDocuments().exec()
    ]);

    return { data, total };
  }
}
