import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Ejemplo: Función para obtener datos de una tabla (ej. 'tareas')
  async getTareas() {
    const { data, error } = await this.supabase
      .from('tareas') // Asegúrate de que la tabla exista en Supabase
      .select('*');
    
    if (error) throw error;
    return data;
  }
}