import { UserProps } from '@domain/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto implements UserProps {
  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID do usuario',
  })
  id?: string

  @ApiProperty({ example: 'Jose da Silva', description: 'Nome do usuario' })
  name: string

  @ApiProperty({
    example: '1290.00',
    description: 'Salario',
  })
  salary: number

  @ApiProperty({
    example: '190000.2',
    description: 'Empresa',
  })
  enterprise: number

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação do usuario',
  })
  createdAt?: Date
}

export class UserDeleteResponseDto {
  @ApiProperty({
    example: 'Usuario deletado com sucesso',
  })
  message: string
}

export class UserCreateDto {
  @ApiProperty({ example: 'Jose da Silva', description: 'Nome do usuario' })
  name: string

  @ApiProperty({
    example: '1900.1',
    description: 'Salario',
  })
  salary: number

  @ApiProperty({
    example: '120900.1',
    description: 'Empresa',
  })
  enterprise: number
}
