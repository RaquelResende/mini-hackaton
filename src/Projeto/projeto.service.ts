import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entities';
import { Repository, ILike, DeleteResult } from 'typeorm'
import { GrupoService } from '../GrupoPi/grupo.service';
import { identity } from 'rxjs';

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

  async findByNomeProjeto(nomeProjeto: string): Promise<Projeto>{
    return await this.projetoRepository.findOne({
        where:{
          nomeProjeto
    },
      relations:{
        grupo:true
      }
    })
  }

  async create(projeto: Projeto): Promise<Projeto>{
    if (projeto.grupo){
      let grupo = await this.grupoService.findById(projeto.grupo.id)

      if (!grupo)
    throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND)
    }

    let projetoTest= await this.findByNomeProjeto(projeto.nomeProjeto)
   if(!projetoTest){
   return await this.projetoRepository.save(projeto)
   }
throw new HttpException("projeto já cadastrado", HttpStatus.NOT_FOUND )
 
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