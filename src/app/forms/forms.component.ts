import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  searchResults: any[] = []; 

  private clientId = ''; 
  private clientSecret = ''; 
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  
  private getAccessToken() {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
      }
    }).pipe(
      catchError(err => {
        console.error('Erro ao obter o token:', err);
        return of(null);
      })
    );
  }

 
  searchMusic() {
    const searchQuery = (document.getElementById('searchQuery') as HTMLInputElement).value;

    if (!searchQuery) {
      alert("Digite o nome da música ou artista!");
      return;
    }

    this.getAccessToken().subscribe((tokenResponse: { access_token: string } | null) => {
      if (tokenResponse && tokenResponse.access_token) {
        this.accessToken = tokenResponse.access_token;

        this.http.get<any>(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }).subscribe((response: any) => {
          this.searchResults = response.tracks.items; 
        }, error => {
          console.error('Erro ao buscar músicas:', error);
        });
      } else {
        alert("Erro ao obter token de acesso!");
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    console.log("Formulário enviado");
  }
}
