import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, Long, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    creditosAprovados: number;

    @OneToOne( () => ProyectoEntity, proyecto => proyecto.estudiante)
    proyecto: ProyectoEntity

}
