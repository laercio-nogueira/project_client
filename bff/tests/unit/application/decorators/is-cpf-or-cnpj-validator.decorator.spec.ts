import { validate } from 'class-validator'
import { IsCpfOrCnpj } from '@application/decorators/is-cpf-or-cnpj-validator.decorator'

class TestDto {
  documentType = 'cpf'

  @IsCpfOrCnpj('documentType', {
    message: 'Invalid document format',
  })
  document: string
}

describe('IsCpfOrCnpj decorator', () => {
  it('should validate a valid CPF', async () => {
    const dto = new TestDto()
    dto.documentType = 'cpf'
    dto.document = '52998224725'
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should validate a valid CNPJ', async () => {
    const dto = new TestDto()
    dto.documentType = 'cnpj'
    dto.document = '11444777000161'
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should fail for an invalid CPF', async () => {
    const dto = new TestDto()
    dto.document = '12345678900'
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints).toHaveProperty('isCpfOrCnpj')
    expect(errors[0].constraints.isCpfOrCnpj).toBe('Invalid document format')
  })

  it('should fail for an invalid CNPJ', async () => {
    const dto = new TestDto()
    dto.document = '11444777000100'
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints).toHaveProperty('isCpfOrCnpj')
    expect(errors[0].constraints.isCpfOrCnpj).toBe('Invalid document format')
  })

  it('should fail for a document with incorrect length', async () => {
    const dto = new TestDto()
    dto.document = '123456789'
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints.isCpfOrCnpj).toBe('Invalid document format')
  })

  it('should validate a valid CPF', async () => {
    const dto = new TestDto()
    dto.documentType = 'cpf'
    dto.document = '52998224725'
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should return an error message for invalid CPF', async () => {
    const dto = new TestDto()
    dto.documentType = 'cpf'
    dto.document = '12345678900'
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints).toHaveProperty('isCpfOrCnpj')
    expect(errors[0].constraints.isCpfOrCnpj).toBe('Invalid document format')
  })

  it('should return custom message', async () => {
    class TestDtoNoField {
      @IsCpfOrCnpj('nonExistentField')
      document: string = '12345678900'
    }
    const dto = new TestDtoNoField()
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints.isCpfOrCnpj).toBe('nonExistentField')
  })

  it('should return default message default when no message', async () => {
    class TestDtoNoField {
      @IsCpfOrCnpj(null)
      document: string = '12345678900'
    }

    const dto = new TestDtoNoField()
    const errors = await validate(dto)

    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints).toHaveProperty('isCpfOrCnpj')
    expect(errors[0].constraints.isCpfOrCnpj).toBe(
      'Formato de Documento Inválido',
    )
  })
})
