import { IsNotEmpty, IsString } from "class-validator";

export class PropuestaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    palabraClave: string;

}
