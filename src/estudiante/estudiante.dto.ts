import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class EstudianteDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;
     //Hay que hacer lo mismo para todos los dto y todas las variables
}
