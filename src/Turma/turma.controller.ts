import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Turma } from './entities/turma.entities';
import { TurmaService } from './turma.service';

@ApiTags('Turma')
@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) { }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Turma[]> {
    return this.turmaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Turma> {
    return this.turmaService.findById(id);
  }
  
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Turma: Turma): Promise<Turma> {
    return this.turmaService.create(Turma)
  }
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() turma: Turma): Promise<Turma> {
    return this.turmaService.update(turma);
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.turmaService.delete(id);
  }
}