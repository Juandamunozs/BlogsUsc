import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class UsuarioService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }


    public actualizarPerfil(userId: string, usuario: any, other: any) {
        console.log('Objeto a actualizar:', usuario);

        const objLogin = { UserId: userId, Name: usuario.name, Email: usuario.email, Password: other.password, Role:other.role};

        console.log('Objeto de usuario a actualizar: ', objLogin);

        // Enviar la solicitud PUT
        return this.http.put<any>(`${this.API}Users/${userId}`, objLogin);
    }

    // Método para traer los post
    public post() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Posts`);
    }

    public obtenerPerfil(username: string) {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Users/${username}`);
    }

}