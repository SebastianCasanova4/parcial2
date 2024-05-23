import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        return await this.proyectoRepository.save(proyecto);
    }

}
