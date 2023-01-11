import { IsNotEmpty } from "class-validator"
import { groupCollapsed } from "console";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Grupo } from "../../GrupoPi/entities/grupo.entities";
import { ApiProperty } from "@nestjs/swagger";


@Entity ({name:"tb_turma"})
export class Turma{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length:100})
    descricao:string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    isAtivo: boolean

    @ApiProperty({type: ()=> Grupo})
    @OneToMany(()=> Grupo, (grupo)=> grupo.turma) 
    grupo: Grupo[]
}
