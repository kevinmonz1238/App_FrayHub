// Importación de los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false, // Indica que este componente no es independiente
  selector: 'app-comunidad', // Nombre del selector del componente
  templateUrl: './comunidad.page.html', // Archivo HTML asociado a la vista
  styleUrls: ['./comunidad.page.scss'], // Archivo de estilos del componente
})
export class ComunidadPage implements OnInit {

  // Constructor del componente (por ahora no se inyectan servicios)
  constructor() { }

  // Método que se ejecuta automáticamente al iniciar el componente
  ngOnInit() {
    // Aquí se pueden agregar funciones que se ejecuten al cargar la página
  }

}
