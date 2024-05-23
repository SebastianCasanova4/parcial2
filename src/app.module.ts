import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity';

@Module({
  imports: [ProyectoModule, EstudianteModule, PropuestaModule, ProfesorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [ProyectoEntity, ProfesorEntity, EstudianteEntity, PropuestaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
