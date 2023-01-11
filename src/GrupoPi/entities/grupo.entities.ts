import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Turma } from "../../Turma/entities/turma.entities";
import { Projeto } from "../../Projeto/entities/projeto.entities";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "tb_grupo"})
export class Grupo{
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    numeroGrupo: number

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    maisInfos: string

    @ApiProperty({type: ()=> Projeto})
    @OneToMany(() => Projeto, (projeto) => projeto.grupo)
    projeto: Projeto[]

    @ApiProperty({type: ()=> Turma})
    @ManyToOne(() => Turma, (turma) => turma.grupo, {
        onDelete: "CASCADE"
    })
    turma: Turma

}