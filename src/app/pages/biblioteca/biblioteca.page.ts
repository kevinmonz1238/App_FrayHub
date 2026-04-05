import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({

  standalone: false,
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage {

  segmento: string = 'biblioteca'; 

  constructor(private router: Router) {}

  cambiarSegmento(event: any) {
  const valor = event.detail.value;
  this.segmento = valor;

  if (valor === 'materias') {
    setTimeout(() => {
      this.router.navigate(['/materias']);
    }, 150);
  }
}

}