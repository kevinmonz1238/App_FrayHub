// Importaciones necesarias de Angular e Ionic
import { Component } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interfaz que define la estructura de una actividad
interface Activity {
  id: number; // Identificador único
  title: string; // Título de la actividad
  description: string; // Descripción
  subject: string; // Materia
  status: 'todo' | 'pending' | 'done'; // Estado de la actividad
  priority: 'low' | 'medium' | 'high'; // Prioridad
  dueDate: string; // Fecha de entrega
  color: string; // Color asociado a la materia
  attachments: number; // Número de archivos adjuntos
}

// Decorador del componente
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,   // Permite usar [(ngModel)] en formularios
    IonicModule,   // Permite usar componentes de Ionic
  ]
})

// Clase principal del componente
export class ActividadPage {

  // Filtro activo (all, todo, pending, done)
  activeFilter = 'all';

  // Controla si el modal está visible
  showModal = false;

  // Lista de actividades iniciales
  activities: Activity[] = [
    {
      id: 1,
      title: 'Ensayo sobre la Revolución',
      description: 'Mínimo 3 cuartillas con bibliografía',
      subject: 'Historia',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-04-10',
      color: '#ff6b6b33',
      attachments: 2
    },
    {
      id: 2,
      title: 'Ejercicios de álgebra',
      description: 'Página 45 a 50 del libro',
      subject: 'Matemáticas',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-04-12',
      color: '#4dabf733',
      attachments: 0
    },
    {
      id: 3,
      title: 'Presentación de Biología',
      description: 'Tema: ecosistemas acuáticos',
      subject: 'Ciencias',
      status: 'done',
      priority: 'low',
      dueDate: '2025-04-08',
      color: '#51cf6633',
      attachments: 1
    },
    {
      id: 4,
      title: 'Vocabulario Unit 5',
      description: 'Memorizar 30 palabras nuevas',
      subject: 'Inglés',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-04-15',
      color: '#ffd43b33',
      attachments: 0
    },
  ];

  // Objeto temporal para crear una nueva actividad
  newActivity: Partial<Activity> = { status: 'todo', priority: 'medium' };

  // Contador para generar IDs únicos
  private nextId = 5;

  // Colores asociados a cada materia
  private subjectColors: Record<string, string> = {
    'Matemáticas': '#4dabf733',
    'Español': '#e599f733',
    'Historia': '#ff6b6b33',
    'Ciencias': '#51cf6633',
    'Inglés': '#ffd43b33',
    'Arte': '#cc5de833',
  };

  // Devuelve las actividades filtradas según el estado seleccionado
  get filteredActivities(): Activity[] {
    if (this.activeFilter === 'all') return this.activities;
    return this.activities.filter(a => a.status === this.activeFilter);
  }

  // Contadores por estado
  get pendingCount() {
    return this.activities.filter(a => a.status === 'pending').length;
  }

  get todoCount() {
    return this.activities.filter(a => a.status === 'todo').length;
  }

  get doneCount() {
    return this.activities.filter(a => a.status === 'done').length;
  }

  // Calcula el porcentaje de actividades completadas
  get completionPercent(): number {
    if (this.activities.length === 0) return 0;
    return Math.round((this.doneCount / this.activities.length) * 100);
  }

  // Calcula el progreso para una gráfica circular (SVG)
  get progressOffset(): number {
    const circumference = 2 * Math.PI * 50;
    return circumference - (this.completionPercent / 100) * circumference;
  }

  // Cambia el filtro activo
  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  // Cambia el estado de una actividad (hecho o pendiente)
  toggleStatus(act: Activity) {
    act.status = act.status === 'done' ? 'pending' : 'done';
  }

  // Elimina una actividad de la lista
  deleteActivity(act: Activity) {
    this.activities = this.activities.filter(a => a.id !== act.id);
  }

  // Abre el modal para crear una nueva actividad
  openNewActivity() {
    this.newActivity = { status: 'todo', priority: 'medium' };
    this.showModal = true;
  }

  // Cierra el modal
  closeModal() {
    this.showModal = false;
  }

  // Guarda una nueva actividad
  saveActivity() {
    // Valida que tenga título
    if (!this.newActivity.title) return;

    // Agrega la nueva actividad al inicio de la lista
    this.activities.unshift({
      id: this.nextId++,
      title: this.newActivity.title || '',
      description: this.newActivity.description || '',
      subject: this.newActivity.subject || 'General',
      status: (this.newActivity.status as Activity['status']) || 'todo',
      priority: (this.newActivity.priority as Activity['priority']) || 'medium',
      dueDate: this.newActivity.dueDate || new Date().toISOString().split('T')[0],
      color: this.subjectColors[this.newActivity.subject || ''] || '#94a3b833',
      attachments: 0,
    });

    // Cierra el modal después de guardar
    this.closeModal();
  }
}