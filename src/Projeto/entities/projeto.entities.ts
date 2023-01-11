import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Grupo } from "../../GrupoPi/entities/grupo.entities"; 
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_projeto'})
export class Projeto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    nomeProjeto: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    logoProjeto: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    linkProjeto: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    pitProjeto: string


    @ApiProperty({type: ()=> Grupo})
    @ManyToOne(() => Grupo, (grupo) => grupo.projeto, {
        onDelete: "CASCADE"
    })
    grupo: Grupo

}