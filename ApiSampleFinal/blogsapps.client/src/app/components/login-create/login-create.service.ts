import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class LoginCreateService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para agregar un nuevo punto de venta
    public LoginCreate(email: string, password: string, role: string, name: string) {
        // Crear el objeto con todos los datos del formulario
        const objLogin = { Email: email, Password: password, Role: role, Name: name};

        console.log('Objeto de usuario a crear: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Users`, objLogin);
    }

}