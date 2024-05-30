import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if(propuesta.titulo !== "" && propuesta.titulo !== null)
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["proyecto", "profesor"] } );
        if (!propuesta)
          throw new BusinessLogicException("La propuesta con el id dado no existe", BusinessError.NOT_FOUND);
   
        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["proyecto", "profesor"] });
    }

    async deletePropuesta(id: string) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});
        if (!propuesta)
            throw new BusinessLogicException("La propuesta con el id dado no existe", BusinessError.NOT_FOUND);
        if (propuesta.proyecto !== null)
            throw new BusinessLogicException("La propuesta tiene un proyecto asociado", BusinessError.BAD_REQUEST);

        await this.propuestaRepository.remove(propuesta);
    }

}
