import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { plainToInstance } from 'class-transformer';
import { ProyectoDto } from './proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { BusinessErrorsInterceptor } from 'src/shared/business-errors.interceptor';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async create(@Body() proyectoDto: ProyectoDto) {
    const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.crearProyecto(proyecto);
    }
}
