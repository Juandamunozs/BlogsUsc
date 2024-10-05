import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class postService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para agregar un nuevo punto de venta
    public crearPost(userId: string, title: string, content: string){
        const pubDate = this.getDate();

        const objLogin = { UserId: userId, Title: title, Content: content, PubDate: pubDate, status: 'Publicado'};

        console.log('Objeto de usuario a comentar: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Posts`, objLogin);
        
    }

    public getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0'); 
    
        return `${year}-${month}-${day}`;
    }

    public obtenerPost(postId: string){
        return this.http.get(`${this.API}Posts/${postId}`);
    }

    public actualizarPost(postId: string, title: string, content: string){

       const userId = localStorage.getItem('userId') || '';
        const pubDate = this.getDate();

        const objLogin = {UserId:userId ,Title: title, Content: content, PubDate: pubDate, status: 'Publicado', PostId: postId};

        console.log('Objeto de usuario a comentar: ', objLogin);

        return this.http.put(`${this.API}Posts/${postId}`, objLogin);
    }

}