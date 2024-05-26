import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { PropuestaService } from 'src/propuesta/propuesta.service';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesoresList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await repository.save({
      cedula: faker.number.int({ min: 1000000000, max: 9999999999}),
      nombre: faker.person.fullName(),
      grupoInvestigacion: "COMIT",
      numExtension: faker.number.int({ min: 1000, max: 9999})})
      profesoresList.push(profesor);
    }
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProfesor debería crear un profesor', async () => {
    const profesor: ProfesorEntity ={
      id: "",
      cedula: faker.number.int({ min: 1000000000, max: 9999999999}),
      nombre: faker.person.fullName(),
      grupoInvestigacion: "COMIT",
      numExtension: faker.number.int({ min: 1000, max: 9999}),
      propuestas: []
    }

    const newProfesor: ProfesorEntity = await service.crearProfesor(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await repository.findOne({where: {id: newProfesor.id}});
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.cedula).toEqual(profesor.cedula);
    expect(storedProfesor.nombre).toEqual(profesor.nombre);
    expect(storedProfesor.grupoInvestigacion).toEqual(profesor.grupoInvestigacion);
    expect(storedProfesor.numExtension).toEqual(profesor.numExtension);
  });

  it('crearProfesor debe fallar cuando el nombre está vacío', async () => {
    const profesor: ProfesorEntity = {
        id: "",
        cedula: faker.number.int({ min: 100, max: 99999 }),
        nombre: "",
        grupoInvestigacion: "",
        numExtension: faker.number.int({ min: 1000, max: 9999}),
        propuestas: []
    };

    await expect(service.crearProfesor(profesor)).rejects.toHaveProperty("message", "El grupo de investigacion no está en los esperados");
  });

  it('findProfesorById debe retornar un estudiante', async () => {
    const storedProfesor: ProfesorEntity = profesoresList[0];
    const estudiante: ProfesorEntity = await service.crearProfesor(storedProfesor);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedProfesor.nombre);
    expect(estudiante.cedula).toEqual(storedProfesor.cedula);
    expect(estudiante.grupoInvestigacion).toEqual(storedProfesor.grupoInvestigacion);
    expect(estudiante.numExtension).toEqual(storedProfesor.numExtension);

  });

  it('findProfesorById debe fallar para un estudiante invalido', async () => {
    await expect(() => service.findProfesorById("0")).rejects.toHaveProperty("message", "El profesor con el id dado no existe");
  });

  it('eliminarProfesor debe eliminar un profesor', async () => {
    const profesor: ProfesorEntity = profesoresList[0];
    await service.eliminarProfesor(profesor.id);
    const deletedMuseo: ProfesorEntity = await repository.findOne({where: {id: profesor.id}});
    expect(deletedMuseo).toBeNull();
  });

  it('eliminarProfesor debe fallar para un profesor con propuestas', async () => {
    const profesor: ProfesorEntity = profesoresList[0];
    let repositorypropuesta: Repository<PropuestaEntity>;
    let servicepropuesta: PropuestaService;
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      palabraClave: faker.lorem.word(),
      proyecto: null,
      profesor: null
    }
    const newPropuesta: PropuestaEntity = await servicepropuesta.crearPropuesta(propuesta);

    profesor.propuestas = [newPropuesta];
    await expect(service.eliminarProfesor(profesor.id)).rejects.toHaveProperty("message", "El profesor tiene propuestas con proyectos asociados");
  });
});
