import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  // Esta variable debe coincidir con la que usas en el [value] de tu HTML
  segmento: string = 'materias';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cambiarSegmento(event: any) {
    const valor = event.detail.value;
    
    // Actualizamos la variable para que el *ngIf del HTML reaccione
    this.segmento = valor;

    // Lógica para navegar si eligen 'biblioteca'
    if (valor === 'biblioteca') {
      setTimeout(() => {
        this.router.navigate(['/biblioteca']);
        
        // Tip: regresamos el segmento a 'materias' para que cuando el usuario 
        // vuelva atrás, no se quede trabado en el segmento de biblioteca.
        this.segmento = 'materias'; 
      }, 150);
    }
  }
}