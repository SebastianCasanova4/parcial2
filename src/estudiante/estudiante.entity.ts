import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    creditosAprobados: number;

    @OneToOne( () => ProyectoEntity, proyecto => proyecto.estudiante)
    @JoinColumn()
    proyecto: ProyectoEntity;

}
