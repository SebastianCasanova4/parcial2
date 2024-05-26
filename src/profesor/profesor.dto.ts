import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProfesorDto {
    @IsNumber()
    @IsNotEmpty()
    cedula: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    numExtension: number;

}
