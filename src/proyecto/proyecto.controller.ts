import { Controller } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}
}
