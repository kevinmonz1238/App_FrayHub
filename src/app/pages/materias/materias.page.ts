// Importación de módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false, // Indica que no es un componente independiente
  selector: 'app-materias', // Nombre del selector del componente
  templateUrl: './materias.page.html', // Archivo HTML asociado
  styleUrls: ['./materias.page.scss'], // Archivo de estilos
})
export class MateriasPage implements OnInit {

  // Variable que controla el segmento activo en la vista
  // Debe coincidir con el valor definido en el HTML
  segmento: string = 'materias';

  // Inyección del router para navegación entre páginas
  constructor(private router: Router) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
  }

  // Método que se ejecuta cuando cambia el segmento
  cambiarSegmento(event: any) {

    // Obtiene el valor seleccionado del segmento
    const valor = event.detail.value;
    
    // Actualiza la variable para que el HTML reaccione (ngIf)
    this.segmento = valor;

    // Si el usuario selecciona "biblioteca"
    if (valor === 'biblioteca') {

      // Se usa un pequeño retraso antes de navegar
      setTimeout(() => {

        // Navega a la página de biblioteca
        this.router.navigate(['/biblioteca']);
        
        // Regresa el valor del segmento a "materias"
        // para evitar que se quede seleccionado al volver
        this.segmento = 'materias'; 

      }, 150);
    }
  }
}