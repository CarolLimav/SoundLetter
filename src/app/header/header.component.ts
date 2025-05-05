import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false; 
  constructor(private router: Router) {}

  scrollToForms() {
    const element = document.getElementById('enviar-musica');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMenuOpen = false; 
    }
  }

  scrollToFuncionalidade() {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMenuOpen = false; 
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
