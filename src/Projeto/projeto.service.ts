import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entities';
import { Repository, ILike, DeleteResult } from 'typeorm'
import { GrupoService } from '../GrupoPi/grupo.service';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
    private grupoService: GrupoService
  ){}

  async findAll(): Promise<Projeto[]> {
    return await this.projetoRepository.find();
  }

  async findById (id: number): Promise<Projeto> {
    let projeto = await this.projetoRepository.findOne({
      where:{
        id
      }
    });
    if (!projeto) {
      throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
    }
      return projeto;
  }

  async findByNome(nome: string): Promise<Projeto[]>{
    return await this.projetoRepository.find({
        where:{
          nomeProjeto: ILike(`%${nome}%`)
        }
    })
  }

  async create(projeto: Projeto): Promise<Projeto>{
    if (projeto.grupo){
      let grupo = await this.grupoService.findByNumeroGrupo(projeto.grupo.id)

      if (!grupo)
      throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND)
    }

    return await this.projetoRepository.save(projeto);
  }

  async update(projeto: Projeto): Promise<Projeto>{
    let buscaProjeto: Projeto = await this.findById(projeto.id);
    if (!buscaProjeto || !projeto.id){
      throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.projetoRepository.save(projeto);
  }
  async delete(id_projeto: number): Promise<DeleteResult>{
    let buscaProjeto = await this.findById(id_projeto);
    if (!buscaProjeto){
      throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.projetoRepository.delete(id_projeto);
  }
}