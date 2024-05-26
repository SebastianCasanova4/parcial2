import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo.length !== 10)
            throw new BusinessLogicException("El codigo debe tener 10 digitos", BusinessError.BAD_REQUEST);
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["proyecto"] } );
        if (!estudiante)
          throw new BusinessLogicException("El estudiante con el id dado no existe", BusinessError.NOT_FOUND);
   
        return estudiante;
    }
 
}
