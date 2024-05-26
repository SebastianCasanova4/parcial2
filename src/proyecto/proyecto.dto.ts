import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ProyectoDto {
    @IsString()
    @IsNotEmpty()
    fechaInicio: Date;

    @IsString()
    @IsNotEmpty()
    fechaFin: Date;

    @IsUrl()
    @IsNotEmpty()
    url: string;
}
