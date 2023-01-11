import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './GrupoPi/entities/grupo.entities';
import { Turma } from './Turma/entities/turma.entities';
import { Projeto } from './Projeto/entities/projeto.entities';
import { TurmaModule } from './Turma/turma.module';
import { GrupoModule } from './GrupoPi/grupo.module';
import { ProjetoModule } from './Projeto/projeto.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /* type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hackathon',
      entities: [Grupo, Turma, Projeto],
      synchronize: true, */
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true
    }),
    TurmaModule, 
    GrupoModule, 
    ProjetoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
