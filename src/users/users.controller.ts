import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface User {
    id: String;
    name: string;
    email: string;

}

@Controller('users')
export class UsersController {

    private users: User[] = [
        {
            id: '1',
            name: 'Juan',
            email: 'juan@correo.com'
        },
        {
            id: '2',
            name: 'María',
            email: 'maria@correo.com'
        },
        {
            id: '3',
            name: 'Carlos',
            email: 'carlos@correo.com'
        },
        {
            id: '4',
            name: 'Ana',
            email: 'ana@correo.com'
        },
        {
            id: '5',
            name: 'Luis',
            email: 'luis@correo.com'
        },
        {
            id: '6',
            name: 'Sofía',
            email: 'sofia@correo.com'
        },
        {
            id: '7',
            name: 'Diego',
            email: 'diego@correo.com'
        },
        {
            id: '8',
            name: 'Laura',
            email: 'laura@correo.com'
        },
        {
            id: '9',
            name: 'Andrés',
            email: 'andres@correo.com'
        },
        {
            id: '10',
            name: 'Valentina',
            email: 'valentina@correo.com'
        }
    ];

    @Get('')
    getUsers() {
        return this.users
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: User ID: ', id)
        const user = this.users.find((user) => user.id === id);
        console.log('.:: usuario buscado:', user)
        if (user) {
            return user;
        }
        return { result: 'usuario no encontrado' };
    }

    @Get('search/:name')
    getUserByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        if (data) {
            return { result: data?.email };
        }
        return { result: 'usuario no encontrado' };
    }

    @Post()
    createUser(@Body() userPayload: User) {
        console.log('.:: user: ', userPayload)
        //user.id = no debe existir 
        //user.correo = no debe existir
        //si el usuario existe -> retornar "el usuario ya se encuentra registrado"
        const data = this.users.find((user) => user.name === userPayload.id || user.name === userPayload.email);
        if (data) {
            return {
                msg: 'el usuario ya se encuentra registrado'
            }
        }
        this.users.push(userPayload);
        return {
            msg: "usuario creado",
            data: userPayload
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {

        console.log('.:: userID: ', id);
        const position = this.users.findIndex((user) => user.id === id);
        console.log('.:: position: ', position);
        if (position === -1) {
            return {
                msg: "No existe el ID"
            }
        }
        this.users.splice(position, 1);
        return {
            msg: 'usuario eliminado'
        };
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userChanges: User) {
        console.log(',:: UserID Update', id)
        console.log(',:: Changes', userChanges)

        const position = this.users.findIndex((user) => user.id === id);
        if (position === -1) {
            return {
                msg: "No existe el ID"
            }
        }

        const existingUser = this.users[position];
        console.log(',:: usuario existente', existingUser)

        const updateUser = { ...existingUser, ...userChanges };
        this.users[position] = updateUser;

        return {
            msg: "Usuario actualizado con exito",
            data: updateUser
        }
    }
}