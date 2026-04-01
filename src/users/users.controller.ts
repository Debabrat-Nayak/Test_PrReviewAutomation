import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { log } from 'console';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    getAllUser() {
        return this.usersService.getAllUser();
    }

    

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        const updatedUser = await this.usersService.updateUserById(id, body);

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }

    @Delete(":id")
    deleteById(@Param('id') id:string){
        return this.usersService.deleteById(id)
    }

    @Get("hello")
    getTask(){
        return {message:"Hello world"}
    }

    @Get(":id")
    async getById(@Param('id') id: string) {
        const user = await this.usersService.getUserById(id);
        console.log(user);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get("searchForMaleUser")
    async searchForMale(){
        const male=await this.usersService.getMUser();
    }
}
