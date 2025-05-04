import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IntroducaoComponent } from './introducao/introducao.component';
import { FuncionamentoComponent } from './funcionamento/funcionamento.component';
import { FormsComponent } from './forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: '', component: FuncionamentoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroducaoComponent,
    FuncionamentoComponent,
    FormsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
