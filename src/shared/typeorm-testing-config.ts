import { TypeOrmModule } from "@nestjs/typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [EstudianteEntity, ProfesorEntity, PropuestaEntity, ProyectoEntity],
      synchronize: true,
      keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([EstudianteEntity, ProfesorEntity, PropuestaEntity, ProyectoEntity]),
   ];