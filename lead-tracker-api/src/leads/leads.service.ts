import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto, CreateCommentDto } from './dtos';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: dto });
  }

  async findAll(query: LeadQueryDto) {
    const { page = 1, limit = 20, status, q, sort = 'createdAt', order = 'desc' } = query;

    const where: Prisma.LeadWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sort]: order },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        comments: { orderBy: { createdAt: 'desc' } },
        _count: { select: { comments: true } },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const { _count, ...rest } = lead;
    return { ...rest, commentsCount: _count.comments };
  }

  async update(id: string, dto: UpdateLeadDto) {
    await this.ensureLeadExists(id);
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureLeadExists(id);
    await this.prisma.lead.delete({ where: { id } });
  }

  async findComments(leadId: string) {
    await this.ensureLeadExists(leadId);
    return this.prisma.comment.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, text: true, createdAt: true },
    });
  }

  async addComment(leadId: string, dto: CreateCommentDto) {
    await this.ensureLeadExists(leadId);
    return this.prisma.comment.create({
      data: { leadId, text: dto.text },
      select: { id: true, text: true, createdAt: true },
    });
  }

  private async ensureLeadExists(id: string) {
    const count = await this.prisma.lead.count({ where: { id } });
    if (count === 0) {
      throw new NotFoundException('Lead not found');
    }
  }
}
