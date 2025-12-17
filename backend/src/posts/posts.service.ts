import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // 글쓰기 (제목, 내용 + 작성자ID)
  async create(createPostDto: CreatePostDto, authorId: number) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: authorId,
      },
    });
  }

  // 전체 조회(작성자 정보)
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.post.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: { email: true, nickname: true },
          },
        },
      }),
      this.prisma.post.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
  // 상세 조회
  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { email: true, nickname: true },
        },
        comments: {
          include: {
            author: {
              select: { nickname: true },
            },
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
