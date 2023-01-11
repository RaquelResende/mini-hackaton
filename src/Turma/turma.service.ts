import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Turma } from './entities/turma.entities';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>){}

  async findAll(): Promise<Turma[]> {
    return await this.turmaRepository.find({
      relations:{
        grupo:true
      }
    });
  }

  async findById (id: number): Promise<Turma> {
    let turma = await this.turmaRepository.findOne({
      where:{
        id
      },
      relations:{
        grupo: true
      }
    });
    if (!turma) {
      throw new HttpException('Turma não encontrado!', HttpStatus.NOT_FOUND);
    }
      return turma;
  }



  async create(turma: Turma): Promise<Turma>{
    return await this.turmaRepository.save(turma);
  }

  async update(turma: Turma): Promise<Turma>{
    let buscaTurma: Turma = await this.findById(turma.id);
    if (!buscaTurma || !turma.id){
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.turmaRepository.save(turma);
  }
  async delete(id: number): Promise<DeleteResult>{
    let buscaTurma = await this.findById(id);
    if (!buscaTurma){
      throw new HttpException('Turma não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.turmaRepository.delete(id);
  }
}