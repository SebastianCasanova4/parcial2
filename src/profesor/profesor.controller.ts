import { Controller } from '@nestjs/common';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private readonly profesorServide: ProfesorService) {}
}
