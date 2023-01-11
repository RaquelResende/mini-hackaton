import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Grupo } from './entities/grupo.entities';
import { Projeto } from '../Projeto/entities/projeto.entities';
import { Turma } from '../Turma/entities/turma.entities';
import { TurmaService } from '../Turma/turma.service';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
    private turmaService: TurmaService
  ){}

  async findAll(): Promise<Grupo[]> {
    return await this.grupoRepository.find({
      relations:{
        turma: true,
        projeto:true
      }
    });
  }

  async findById (id: number): Promise<Grupo> {
    let grupo = await this.grupoRepository.findOne({
      where:{
        id
      },
      relations:{
        turma: true,
        projeto:true
      }
    });
    if (!grupo) {
      throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
    }
      return grupo;
  }

  async findByNumeroGrupo (numeroGrupo: number): Promise<Grupo> {
    let grupo = await this.grupoRepository.findOne({
      where:{
        numeroGrupo
      },
      relations:{
        turma: true,
        projeto:true
      }
    });
    if (!grupo) {
      throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
    }
      return grupo;
  }

  async create(grupo: Grupo): Promise<Grupo>{

    if (grupo.turma){
      let turma= await this.turmaService.findById(grupo.turma.id)

      if (!turma)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND)
    }

    let grupoTeste = this.findByNumeroGrupo(grupo.numeroGrupo)

    if (grupoTeste){
      throw new HttpException('Grupo já cadastrada!', HttpStatus.NOT_FOUND)
    }

    return await this.grupoRepository.save(grupo);
  }

  async update(grupo: Grupo): Promise<Grupo>{
    let buscaGrupo: Grupo = await this.findByNumeroGrupo(grupo.numeroGrupo);
    if (!buscaGrupo || !grupo.numeroGrupo){
      throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
    }
    if (grupo.turma){
      let turma = await this.turmaService.findById(grupo.turma.id)

      if (!turma){
        throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
      }
      return await this.grupoRepository.save(grupo);
    }
    return await this.grupoRepository.save(grupo);
  }
  
  async delete(id: number): Promise<DeleteResult>{
    let buscaGrupo = await this.findById(id);
    if (!buscaGrupo){
      throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.grupoRepository.delete(id);
  }
}