import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';
import { EstudianteDto } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async create(@Body() estudianteDto: EstudianteDto) {
    const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
    return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':estudianteId')
    async findOne(@Param('estudianteId') estudianteId: string) {
    return await this.estudianteService.findEstudianteById(estudianteId);
    }

}
