import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase'; // Asegúrate de que la ruta sea correcta

@Component({
  standalone: false,
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  // Variable para guardar los datos que traigamos de la DB
  tareas: any[] = [];

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const data = await this.supabaseService.getTareas();
      if (data) {
        this.tareas = data;
        console.log('Datos recibidos de Supabase:', this.tareas);
      }
    } catch (error) {
      console.error('Error al cargar datos de Fray_Hub:', error);
    }
  }

}