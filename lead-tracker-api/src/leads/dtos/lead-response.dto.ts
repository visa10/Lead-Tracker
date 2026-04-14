import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatus } from '@prisma/client';

export class LeadResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  email: string | null;

  @ApiPropertyOptional({ example: 'Acme Inc.' })
  company: string | null;

  @ApiProperty({ enum: LeadStatus, example: LeadStatus.NEW })
  status: LeadStatus;

  @ApiPropertyOptional({ example: 5000 })
  value: number | null;

  @ApiPropertyOptional({ example: 'Met at conference' })
  notes: string | null;

  @ApiProperty({ example: '2026-04-14T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-04-14T12:00:00.000Z' })
  updatedAt: Date;
}

export class LeadDetailResponseDto extends LeadResponseDto {
  @ApiProperty({ example: 3, description: 'Total number of comments' })
  commentsCount: number;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}

export class PaginatedLeadsResponseDto {
  @ApiProperty({ type: [LeadResponseDto] })
  data: LeadResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}

