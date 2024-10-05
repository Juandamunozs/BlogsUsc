import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class HomeService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para traer los post
    public post() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Posts`);
    }

        // Método para traer los post
        public comentarios() {
            // Enviar la solicitud POST
            return this.http.get<any>(`${this.API}Comments`);
        }

    // Comentario para crear un comentario
    public comentarPost(userId: string, postId: string, comentario: string){

        const pubDate = this.getDate();

        const objLogin = { UserId: userId, PostId: postId, Content: comentario, PubDate: pubDate};

        console.log('Objeto de usuario a comentar: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Comments`, objLogin);

    }
    

    // Método para dar like
    public like(userId: string, postId: string){

        const objLogin = { userId: userId, postId: postId};

        console.log('Objeto de usuario a likear: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}LikedPosts`, objLogin);


    }

    public deletePost(userId:string, postId: string){

        const objLogin = { userId: userId, postId: postId};

        console.log('Objeto de usuario a eliminar: ', objLogin);

        // Enviar la solicitud POST
        return this.http.delete<any>(`${this.API}Posts/${postId}`);

    }

    public getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
        const day = String(currentDate.getDate()).padStart(2, '0'); // Días del mes
    
        return `${year}-${month}-${day}`;
    }

}