import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class EstudianteDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly codigo: string;

    @IsNumber()
    @IsNotEmpty()
    readonly creditosAprobados: number;
    
}