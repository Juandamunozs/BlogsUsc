import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class viewLikeService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    public obtenerViewLike(postId: string){
        return this.http.get(`${this.API}LikePosts/post/${postId}`);
    }

}