import { UsersService } from './users.service';
import { Controller, Delete, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') param: string) {
    return this.userService.getUserById(param);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') param: string) {
    return this.userService.deleteUser(param);
  }
}
