import { Controller, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}
}
