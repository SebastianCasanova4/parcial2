import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ProyectoDto {
    @IsString()
    @IsNotEmpty()
    fechaInicio: string;

    @IsString()
    @IsNotEmpty()
    fechaFin: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;
}
