import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { plainToInstance } from 'class-transformer';
import { PropuestaDto } from './propuesta.dto';
import { PropuestaEntity } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Post()
    async crearPropuesta(@Body() PropuestaDto: PropuestaDto) {
    const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, PropuestaDto);
    return await this.propuestaService.crearPropuesta(propuesta);
    }

    @Get(':propuestaId')
    async findPropuestaById(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.findPropuestaById(propuestaId);
    }

    @Get()
    async findAllPropuesta() {
    return await this.propuestaService.findAllPropuesta();
    }

    @Delete(':propuestaId')
    @HttpCode(204)
    async deletePropuesta(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.deletePropuesta(propuestaId);
    }

}
