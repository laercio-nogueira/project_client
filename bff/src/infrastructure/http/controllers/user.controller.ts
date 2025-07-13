import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common'
import { UserService } from '@domain/services/user.service'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UpdateUserDto } from '@application/dto/user/update-user.dto'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  UserCreateDto,
  UserDeleteResponseDto,
  UserResponseDto,
} from '@application/contracts/user.contract'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserCreateDto })
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user)
  }

  @Get()
  @ApiCreatedResponse({ type: [UserResponseDto] })
  findAll(@Query('page') page?, @Query('limit') limit?) {
    return this.userService.findAll(+page, +limit)
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: UserCreateDto })
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserDeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
