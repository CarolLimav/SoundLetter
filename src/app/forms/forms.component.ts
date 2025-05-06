import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmailService } from '../email.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  nomeRemetente: string = '';
  emailRemetente: string = '';
  emailDestinatario: string = '';
  mensagemPessoal: string = '';
  nomeMusica: string = '';
  artista: string = '';
  linkSpotify: string = '';
  busca: string = '';
  sugestoes: any[] = [];
  
  enviadoComSucesso: boolean = false;
  carregando: boolean = false;
  erroEnvio: string | null = null;
  campoErros: { [key: string]: string } = {};

  constructor(private emailService: EmailService, private http: HttpClient) { }

  onSubmit(form: NgForm) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });

    if (form.invalid) {
      this.erroEnvio = 'Por favor, preencha todos os campos obrigatórios corretamente';
      return;
    }
    
    if (!this.nomeMusica || !this.artista || !this.linkSpotify) {
      this.erroEnvio = 'Por favor, selecione uma música da lista de sugestões';
      return;
    }

    this.carregando = true;
    this.enviadoComSucesso = false;
    this.erroEnvio = null;
    this.campoErros = {};

    const musicData = {
      nomeRemetente: this.nomeRemetente,
      emailRemetente: this.emailRemetente,
      emailDestinatario: this.emailDestinatario,
      mensagemPessoal: this.mensagemPessoal,
      nomeMusica: this.nomeMusica,
      artista: this.artista,
      linkSpotify: this.linkSpotify
    };

    this.emailService.enviarMusica(musicData).subscribe({
      next: (response) => {
        this.enviadoComSucesso = true;
        this.carregando = false;
        this.resetarFormulario();
        form.resetForm();
      },
      error: (error) => {
        this.carregando = false;
        if (error.error?.errors) {
          this.campoErros = error.error.errors;
        } else {
          this.erroEnvio = error.message || 'Erro ao enviar. Tente novamente.';
        }
      }
    });
  }

  buscarSugestoes() {
    if (this.busca.length < 2) {
      this.sugestoes = [];
      return;
    }

    this.http.get<any[]>(`https://soundletter-81b37df4949f.herokuapp.com/api/search?query=${this.busca}`)
      .pipe(catchError(() => of([])))
      .subscribe({
        next: (res) => this.sugestoes = res,
        error: (err) => console.error('Erro na busca:', err)
      });
  }

  selecionarMusica(musica: any) {
    this.nomeMusica = musica.nome;
    this.artista = musica.artista;
    this.linkSpotify = musica.link;
    this.busca = `${musica.nome} - ${musica.artista}`;
    this.sugestoes = [];
  }

  resetarFormulario() {
    this.nomeRemetente = '';
    this.emailRemetente = '';
    this.emailDestinatario = '';
    this.mensagemPessoal = '';
    this.nomeMusica = '';
    this.artista = '';
    this.linkSpotify = '';
    this.busca = '';
    this.sugestoes = [];
  }
}