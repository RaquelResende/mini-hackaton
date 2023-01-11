import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Grupo } from './entities/grupo.entities';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Grupo')
@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Grupo[]> {
    return this.grupoService.findAll();
  }

  @Get('/:numeroGrupo')
  @HttpCode(HttpStatus.OK)
  findByNumeroGrupo(@Param('numeroGrupo', ParseIntPipe) numeroGrupo: number): Promise<Grupo>{
    return this.grupoService.findByNumeroGrupo(numeroGrupo);
  }
@Post('/cadastrar')
@HttpCode(HttpStatus.CREATED)
create(@Body()Grupo: Grupo): Promise<Grupo>{
  return this.grupoService.create(Grupo)
}
@Put('/atualizar')
@HttpCode(HttpStatus.OK)
update(@Body()grupo: Grupo): Promise<Grupo>{
  return this.grupoService.update(grupo);
}
@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number){
  return this.grupoService.delete(id);
}
}
