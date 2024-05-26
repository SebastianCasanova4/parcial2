import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.fullName(),
        codigo: faker.number.int({ min: 1000000000, max: 9999999999}).toString(),
        creditosAprobados: faker.number.int({ min: 0, max: 100})})
      estudiantesList.push(estudiante);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante debe retornar un nuevo museo', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.person.fullName(),
      codigo: faker.number.int({ min: 1000000000, max: 9999999999}).toString(),
      creditosAprobados: faker.number.int({ min: 0, max: 100}),
      proyecto: null
    };

    const newEstudiante: EstudianteEntity = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante: EstudianteEntity = await repository.findOne({where: {id: newEstudiante.id}});
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.nombre).toEqual(newEstudiante.nombre);
    expect(storedEstudiante.codigo).toEqual(newEstudiante.codigo);
    expect(storedEstudiante.creditosAprobados).toEqual(newEstudiante.creditosAprobados);
  });

  it('crearEstudiante debe fallar cuando el codigo no tiene 10 digitos', async () => {
    const estudiante: EstudianteEntity = {
        id: "",
        nombre: "",
        codigo: faker.number.int({ min: 100, max: 99999 }).toString(),
        creditosAprobados: faker.number.int({ min: 0, max: 100 }),
        proyecto: null
    };

    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", "El codigo debe tener 10 digitos");
  });

  it('findEstudianteById debe retornar un estudiante', async () => {
    const storedEstudiante: EstudianteEntity = estudiantesList[0];
    const estudiante: EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
    expect(estudiante.codigo).toEqual(storedEstudiante.codigo);
    expect(estudiante.creditosAprobados).toEqual(storedEstudiante.creditosAprobados);
  });

  it('findEstudianteById debe fallar para un estudiante invalido', async () => {
    await expect(() => service.findEstudianteById("0")).rejects.toHaveProperty("message", "El estudiante con el id dado no existe");
  });

});
