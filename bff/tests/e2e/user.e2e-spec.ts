import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { UserController } from '@infrastructure/http/controllers/user.controller'
import { UserService } from '@domain/services/user.service'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UpdateUserDto } from '@application/dto/user/update-user.dto'

describe('UserController (e2e)', () => {
  let app: INestApplication

  const mockUserService = {
    create: jest.fn((dto: CreateUserDto) => ({ id: '1', ...dto })),
    findAll: jest.fn((page?: number, limit?: number) => [
      { id: '1', name: 'John Doe' },
    ]),
    findOne: jest.fn((id: string) => ({ id, name: 'John Doe' })),
    update: jest.fn((id: string, dto: UpdateUserDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, id })),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }, Logger],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/POST user', async () => {
    const createDto: CreateUserDto = {
      name: 'John Doe',
      salary: 2000.0,
      enterprise: 190000.0,
    }

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createDto)
      .expect(201)

    expect(response.body).toEqual({ id: '1', ...createDto })
    expect(mockUserService.create).toHaveBeenCalledWith(createDto)
  })

  it('/GET user', async () => {
    const response = await request(app.getHttpServer())
      .get('/user?page=1&limit=10')
      .expect(200)

    expect(response.body).toEqual([{ id: '1', name: 'John Doe' }])
    expect(mockUserService.findAll).toHaveBeenCalledWith(1, 10)
  })

  it('/GET user/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/1')
      .expect(200)

    expect(response.body).toEqual({ id: '1', name: 'John Doe' })
    expect(mockUserService.findOne).toHaveBeenCalledWith('1')
  })

  it('/PUT user/:id', async () => {
    const updateDto: UpdateUserDto = {
      name: 'Updated Name',
      salary: 1200,
      enterprise: 190000,
    }

    const response = await request(app.getHttpServer())
      .put('/user/1')
      .send(updateDto)
      .expect(200)

    expect(response.body).toEqual({ id: '1', ...updateDto })
    expect(mockUserService.update).toHaveBeenCalledWith('1', updateDto)
  })

  it('/DELETE user/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/user/1')
      .expect(200)

    expect(response.body).toEqual({ deleted: true, id: '1' })
    expect(mockUserService.remove).toHaveBeenCalledWith('1')
  })

  afterAll(async () => {
    await app.close()
  })
})
