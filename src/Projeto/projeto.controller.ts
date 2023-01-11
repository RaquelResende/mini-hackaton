import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Projeto } from './entities/projeto.entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projeto')
@Controller('projetos')
export class ProdutoController {
  constructor(private readonly projetoService: ProjetoService) { }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Projeto[]> {
    return this.projetoService.findAll();
  }

  @Get('/:id_projeto')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id_projeto', ParseIntPipe) id_projeto: number): Promise<Projeto> {
    return this.projetoService.findById(id_projeto);
  }

  @Get('/buscar/:nomeProjeto')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nomeProjeto') nome: string): Promise<Projeto[]> {
    return this.projetoService.findByNome(nome);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() projeto: Projeto): Promise<Projeto> {
    return this.projetoService.create(projeto);
  }
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() projeto: Projeto): Promise<Projeto> {
    return this.projetoService.update(projeto);
  }
  @Delete('/deletar/:id_projeto')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id_projeto', ParseIntPipe) id_projeto: number) {
    return this.projetoService.delete(id_projeto);
  }
}
