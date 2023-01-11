import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grupo } from "./entities/grupo.entities";
import { GrupoController } from "./grupo.controller";
import { GrupoService } from "./grupo.service";
import { TurmaService } from "../Turma/turma.service";
import { TurmaModule } from "../Turma/turma.module";

@Module({
    imports: [TypeOrmModule.forFeature([Grupo]), TurmaModule],
    providers: [GrupoService, TurmaService],
    controllers: [GrupoController],
    exports: [TypeOrmModule]
})
export class GrupoModule{}