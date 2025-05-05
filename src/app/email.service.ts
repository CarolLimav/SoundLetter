import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface EnvioMusicaDto {
  nomeRemetente: string;
  emailRemetente: string;
  emailDestinatario: string;
  mensagemPessoal: string;
  nomeMusica: string;
  artista: string;
  linkSpotify: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://soundletter-81b37df4949f.herokuapp.com/api/musica/enviar'; 

  constructor(private http: HttpClient) { }

  enviarMusica(dto: EnvioMusicaDto): Observable<any> {
    return this.http.post(this.apiUrl, dto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}