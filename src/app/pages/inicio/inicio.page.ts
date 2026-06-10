// Importación de los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';

// Importación del servicio que se conecta con Supabase (base de datos)
import { SupabaseService } from '../../services/supabase';

@Component({
  standalone: false, // Indica que este componente no es independiente
  selector: 'app-inicio', // Nombre del selector del componente
  templateUrl: './inicio.page.html', // Archivo HTML asociado
  styleUrls: ['./inicio.page.scss'], // Archivo de estilos asociado
})
export class InicioPage implements OnInit {
  
  // Arreglo donde se almacenarán las tareas obtenidas de la base de datos
  tareas: any[] = [];

  // Inyección del servicio Supabase en el constructor
  constructor(private supabaseService: SupabaseService) { }

  // Método que se ejecuta automáticamente al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos(); // Llama a la función para obtener los datos
  }

  // Método para obtener las tareas desde la base de datos
  async cargarDatos() {
    try {
      // Llama al servicio para obtener las tareas
      const data = await this.supabaseService.getTareas();

      // Si hay datos, se guardan en el arreglo tareas
      if (data) {
        this.tareas = data;

        // Muestra los datos en consola (para depuración)
        console.log('Datos recibidos de Supabase:', this.tareas);
      }

    } catch (error) {
      // Manejo de errores en caso de falla en la consulta
      console.error('Error al cargar datos de Fray_Hub:', error);
    }
  }

}