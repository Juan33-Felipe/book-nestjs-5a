import { Controller, Get, Param } from '@nestjs/common';

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
}