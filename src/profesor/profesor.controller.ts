import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { plainToInstance } from 'class-transformer';
import { ProfesorDto } from './profesor.dto';
import { ProfesorEntity } from './profesor.entity';
import { BusinessErrorsInterceptor } from 'src/shared/business-errors.interceptor';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
    const museum: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
    return await this.profesorService.crearProfesor(museum);
    }

    @Get(':profesorId')
    async findProfesorById(@Param('profesorId') profesorId: string) {
    return await this.profesorService.findProfesorById(profesorId);
    }

    @Delete(':profesorId')
    @HttpCode(204)
    async eliminarProfesor(@Param('profesorId') profesorId: string) {
    return await this.profesorService.eliminarProfesor(profesorId);
    }
    
    @Delete(':profesorCed')
    @HttpCode(204)
    async eliminarProfesorCedula(@Param('profesorCed') cedula: number) {
    return await this.profesorService.eliminarProfesorCedula(cedula);
    }
}
