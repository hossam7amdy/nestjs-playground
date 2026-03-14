import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  cats: Cat[];

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat: Cat = {
      ...createCatDto,
      id: this.cats.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Promise.resolve(cat);
  }

  async findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }

  async findOne(id: number): Promise<Cat> {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with "${id}" is not found`);
    }
    return Promise.resolve(cat);
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with "${id}" is not found`);
    }
    this.cats[index] = {
      ...this.cats[index],
      ...updateCatDto,
    };
    return Promise.resolve(this.cats[index]);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }
}
