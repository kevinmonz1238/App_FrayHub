import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  standalone: false,
  selector: 'app-aula',
  templateUrl: './aula.page.html',
  styleUrls: ['./aula.page.scss'],
})
export class AulaPage implements OnInit {
  private supabase: SupabaseClient;
  public grupos: any[] = [];

  constructor() {
    // Esto conecta directamente con tu proyecto de Supabase
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    // Consultamos la tabla academic_grupo
    const { data, error } = await this.supabase
      .from('academic_grupo')
      .select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error.message);
    } else {
      this.grupos = data || [];
      console.log('Datos recibidos de la BD:', this.grupos);
    }
  }
}