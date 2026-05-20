import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Số trang cần lấy', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số bản ghi mỗi trang', default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class PaginationResponseDto<T> {
  @ApiPropertyOptional({ description: 'Danh sách dữ liệu' })
  data: T[];

  @ApiPropertyOptional({ description: 'Trang hiện tại' })
  page: number;

  @ApiPropertyOptional({ description: 'Số lượng bản ghi mỗi trang' })
  limit: number;

  @ApiPropertyOptional({ description: 'Tổng số bản ghi' })
  total: number;

  @ApiPropertyOptional({ description: 'Tổng số trang' })
  totalPages: number;

  constructor(data: T[], page: number, limit: number, total: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}
