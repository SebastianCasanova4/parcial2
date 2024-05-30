import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fechaInicio: string;

    @Column()
    fechaFin: string;

    @Column()
    url: string;

    @OneToOne( () => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante: EstudianteEntity;

    @OneToOne( () => PropuestaEntity, propuesta => propuesta.proyecto)
    @JoinColumn()
    propuesta: PropuestaEntity;
}
