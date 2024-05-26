import { Body, Controller, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { plainToInstance } from 'class-transformer';
import { ProyectoDto } from './proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async create(@Body() proyectoDto: ProyectoDto) {
    const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.crearProyecto(proyecto);
    }
}
