import { Controller, Param, Get, Post, Body, Delete, Put } from '@nestjs/common';

export interface Producto {
    id: string;
    name: string;
    category: string;
    vencimiento: boolean;
    cantidad: number;
}

@Controller('productos')
export class ProductosController {
    private productos: Producto[] = [
        // Lácteos
        { id: "1", name: "Leche", category: "Lácteos", vencimiento: true, cantidad: 10 },
        { id: "2", name: "Queso Mozzarella", category: "Lácteos", vencimiento: true, cantidad: 8 },
        { id: "3", name: "Yogurt Natural", category: "Lácteos", vencimiento: true, cantidad: 0 },

        // Panadería
        { id: "4", name: "Pan de Molde", category: "Panadería", vencimiento: true, cantidad: 5 },
        { id: "5", name: "Croissant", category: "Panadería", vencimiento: true, cantidad: 12 },
        { id: "6", name: "Galletas Integrales", category: "Panadería", vencimiento: false, cantidad: 0 },

        // Frutas
        { id: "7", name: "Manzanas Rojas", category: "Frutas", vencimiento: true, cantidad: 20 },
        { id: "8", name: "Bananos", category: "Frutas", vencimiento: true, cantidad: 15 },
        { id: "9", name: "Naranjas", category: "Frutas", vencimiento: true, cantidad: 0 },

        // Granos
        { id: "10", name: "Arroz Blanco", category: "Granos", vencimiento: false, cantidad: 50 },
        { id: "11", name: "Lentejas", category: "Granos", vencimiento: false, cantidad: 40 },
        { id: "12", name: "Frijoles Negros", category: "Granos", vencimiento: false, cantidad: 0 },

        // Aceites
        { id: "13", name: "Aceite de Oliva", category: "Aceites", vencimiento: false, cantidad: 0 },
        { id: "14", name: "Aceite de Girasol", category: "Aceites", vencimiento: false, cantidad: 18 },
        { id: "15", name: "Aceite de Coco", category: "Aceites", vencimiento: false, cantidad: 6 },

        // Carnes
        { id: "16", name: "Pechuga de Pollo", category: "Carnes", vencimiento: true, cantidad: 15 },
        { id: "17", name: "Carne Molida de Res", category: "Carnes", vencimiento: true, cantidad: 10 },
        { id: "18", name: "Lomo de Cerdo", category: "Carnes", vencimiento: true, cantidad: 0 },

        // Enlatados
        { id: "19", name: "Atún en Lata", category: "Enlatados", vencimiento: false, cantidad: 30 },
        { id: "20", name: "Maíz Dulce en Lata", category: "Enlatados", vencimiento: false, cantidad: 22 },
        { id: "21", name: "Sardinas en Tomate", category: "Enlatados", vencimiento: false, cantidad: 0 },

        // Bebidas
        { id: "22", name: "Café Molido", category: "Bebidas", vencimiento: false, cantidad: 0 },
        { id: "23", name: "Jugo de Naranja", category: "Bebidas", vencimiento: true, cantidad: 14 },
        { id: "24", name: "Agua Mineral", category: "Bebidas", vencimiento: false, cantidad: 60 }
    ];

    // --- Primera entrega --- //

    @Get()
    getProductos() {
        return this.productos;
    }

    @Get("sin-stock")
    getProductoSinStock() {
        const data = this.productos.filter((producto) => producto.cantidad === 0);
        return data;
    }

    @Get("vencimiento")
    getProductoByVencimiento() {
        const data = this.productos.filter((producto) => producto.vencimiento === false);
        return data;
    }

    @Get("categoria/:category")
    getProductosByCategory(@Param("category") category: string) {
        const data = this.productos.filter((producto) => producto.category.toLowerCase() === category.toLowerCase());
        return data;
    }

    @Get(":id")
    getProductoById(@Param('id') id: string) {
        console.log('.:: Producto ID: ', id);
        const data = this.productos.find((producto) => producto.id === id);
        console.log('.:: Producto buscado: ', data);
        return data;
    }

    // --- Segunda entrega --- //

    @Post()
    createProducto(@Body() nuevoProducto: Producto) {
        const productoExistente = this.productos.find(
            (producto) => producto.id === nuevoProducto.id || producto.name === nuevoProducto.name
        );

        if (productoExistente) {
            return {
                message: "El producto con ese ID o nombre ya existe."
            };
        }

        this.productos.push(nuevoProducto);
        return {
            message: "Producto creado exitosamente.",
            data: nuevoProducto
        };
    }

    @Delete(":id")
    deleteProducto(@Param("id") id: string) {
        const position = this.productos.findIndex((producto) => producto.id === id);

        if (position === -1) {
            return {
                message: "No se encontró el producto con ese ID."
            };
        }

        this.productos.splice(position, 1);
        return {
            message: "Producto eliminado exitosamente."
        };
    }

    @Put(":id")
    updateProducto(@Param("id") id: string, @Body() productoActualizado: Producto) {
        const position = this.productos.findIndex((producto) => producto.id === id);

        if (position === -1) {
            return {
                message: "No se encontró el producto con ese ID."
            };
        }

        this.productos[position] = { ...this.productos[position], ...productoActualizado };
        return {
            message: "Producto actualizado exitosamente.",
            data: this.productos[position]
        };
    }
}