// Importación de módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';

// Importación de Supabase para conexión con la base de datos
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  standalone: false, // Indica que no es un componente independiente
  selector: 'app-horarios', // Nombre del selector del componente
  templateUrl: './horarios.page.html', // Archivo HTML asociado
  styleUrls: ['./horarios.page.scss'], // Archivo de estilos
})
export class HorariosPage implements OnInit {

  // Cliente de Supabase
  private supabase: SupabaseClient;

  // Arreglo donde se almacenan los horarios obtenidos de la base de datos
  public horarios: any[] = [];

  // Variable para controlar el estado de carga (spinner)
  public cargando: boolean = true;

  constructor() {
    // Inicializa la conexión con Supabase usando variables de entorno
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    this.cargarHorarios();
  }

  // Método para obtener los horarios desde la base de datos
  async cargarHorarios() {

    // Activa el indicador de carga
    this.cargando = true;

    try {
      // Consulta a la tabla 'academic_horarioclase'
      const { data, error } = await this.supabase
        .from('academic_horarioclase')
        .select('*')

        // Filtra solo los registros activos
        .eq('activo', true)

        // Ordena los resultados por día
        .order('dia', { ascending: true });

      // Si ocurre un error, se lanza
      if (error) throw error;

      // Guarda los datos en el arreglo
      this.horarios = data || [];

    } catch (error: any) {

      // Manejo de errores
      console.error('Error:', error.message);

    } finally {

      // Desactiva el indicador de carga
      this.cargando = false;
    }
  }
}