import { PropuestaEntity } from "../propuesta/propuesta.entity";
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numExtension: number;

    @OneToMany( () => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas: ProfesorEntity[]

}
