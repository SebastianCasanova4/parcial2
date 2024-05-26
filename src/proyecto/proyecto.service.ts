import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fechaInicio > proyecto.fechaFin)
            throw new BusinessLogicException("The start date must be less than the end date", BusinessError.BAD_REQUEST);
        return await this.proyectoRepository.save(proyecto);
    }

}
