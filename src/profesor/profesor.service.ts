import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { PropuestaService } from '../propuesta/propuesta.service';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        const grupos = ["COMIT","IMAGINE","TICSW"]
        if(!grupos.includes(profesor.grupoInvestigacion))
          throw new BusinessLogicException("El grupo de investigacion no está en los esperados", BusinessError.BAD_REQUEST);
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuestas"] } );
        if (!profesor)
          throw new BusinessLogicException("El profesor con el id dado no existe", BusinessError.NOT_FOUND);
   
        return profesor;
    }

    async eliminarProfesor(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
            if (!profesor)
              throw new BusinessLogicException("El profesor con el id dado no existe", BusinessError.NOT_FOUND);
            
            if (profesor.propuestas === null)
              throw new BusinessLogicException("El profesor tiene propuestas con proyectos asociados", BusinessError.BAD_REQUEST);
            await this.profesorRepository.remove(profesor);
        }

        async eliminarProfesorCedula(cedula: number) {
            const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
            if (!profesor)
              throw new BusinessLogicException("El profesor con el id dado no existe", BusinessError.NOT_FOUND);
            
            if (profesor.propuestas === null)
              throw new BusinessLogicException("El profesor tiene propuestas con proyectos asociados", BusinessError.BAD_REQUEST);
            await this.profesorRepository.remove(profesor);
    }
 
}
