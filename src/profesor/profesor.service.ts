import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
   
        return profesor;
    }

    async eliminarProfesor(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.profesorRepository.remove(profesor);
    }

    async eliminarProfesorCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.profesorRepository.remove(profesor);
    }
 
}
