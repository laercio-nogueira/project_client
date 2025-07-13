import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
  id?: string

  @MaxLength(100, {
    message: 'Nome do Usuario, deve ter no maximo 100 caracteres',
  })
  @IsString({ message: 'Nome do Usuario, deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do Usuario, é necessario' })
  name: string

  @Type(() => Number)
  @Min(1, { message: 'Salário deve ser no mínimo 1' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Salário deve ser um número' },
  )
  @IsNotEmpty({ message: 'Salário do Usuario é necessário' })
  salary: number

  @Type(() => Number)
  @Min(1, { message: 'Empresa deve ser no mínimo 1' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Enterprise deve ser um número' },
  )
  @IsNotEmpty({ message: 'Enterprise é necessario' })
  enterprise: number
}
