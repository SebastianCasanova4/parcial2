import { ProfesorEntity } from "../profesor/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraClave: string;

    @OneToOne( () => ProyectoEntity, proyecto => proyecto.propuesta)
    proyecto: ProyectoEntity;

    @ManyToOne( () => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;
}
