import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Projeto } from './entities/projeto.entities'
import { ProdutoController } from './projeto.controller'
import { ProjetoService } from './projeto.service'
import { GrupoModule } from '../GrupoPi/grupo.module'
import { GrupoService } from '../GrupoPi/grupo.service'
import { TurmaModule } from '../Turma/turma.module'
import { TurmaService } from '../Turma/turma.service'

@Module({
    imports: [TypeOrmModule.forFeature([Projeto]), GrupoModule, TurmaModule],
    providers: [ProjetoService, GrupoService, TurmaService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProjetoModule {}