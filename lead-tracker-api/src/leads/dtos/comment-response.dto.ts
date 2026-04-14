import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'Called the client, waiting for reply' })
  text: string;

  @ApiProperty({ example: '2026-04-14T12:00:00.000Z' })
  createdAt: Date;
}

