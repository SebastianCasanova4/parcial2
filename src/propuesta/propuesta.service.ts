import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
   
        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["artworks", "exhibitions"] });
    }

    async deletePropuesta(id: string) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.propuestaRepository.remove(propuesta);
    }

}
