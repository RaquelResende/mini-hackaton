import { Module } from "@nestjs/common/decorators";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Turma } from "./entities/turma.entities";
import { TurmaController } from "./turma.controller";
import { TurmaService } from "./turma.service";


@Module({
    imports: [TypeOrmModule.forFeature([Turma])],
    providers:[TurmaService],
    controllers:[TurmaController],
    exports: [TypeOrmModule]
})
export class TurmaModule{}