import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  scrollToForms() {
    const element = document.getElementById('enviar-musica');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFuncionalidade() {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
