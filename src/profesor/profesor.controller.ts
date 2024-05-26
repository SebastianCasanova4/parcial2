import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { plainToInstance } from 'class-transformer';
import { ProfesorDto } from './profesor.dto';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesor')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
    const museum: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
    return await this.profesorService.crearProfesor(museum);
    }

    @Get(':museumId')
    async findProfesorById(@Param('museumId') museumId: string) {
    return await this.profesorService.findProfesorById(museumId);
    }

    @Delete(':museumId')
    @HttpCode(204)
    async eliminarProfesor(@Param('museumId') museumId: string) {
    return await this.profesorService.eliminarProfesor(museumId);
    }
    
    @Delete(':museumId')
    @HttpCode(204)
    async eliminarProfesorCedula(@Param('museumId') cedula: number) {
    return await this.profesorService.eliminarProfesorCedula(cedula);
    }
}
