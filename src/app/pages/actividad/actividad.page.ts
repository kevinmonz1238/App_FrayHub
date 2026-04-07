import { Component } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Activity {
  id: number;
  title: string;
  description: string;
  subject: string;
  status: 'todo' | 'pending' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  color: string;
  attachments: number;
}

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,   // <--- Esto arregla los errores de [(ngModel)]
    IonicModule,   // <--- Esto arregla los errores de 'ion-header', 'ion-content', etc.
  ]
})

export class ActividadPage {
  activeFilter = 'all';
  showModal = false;
  activities: Activity[] = [
    {
      id: 1, title: 'Ensayo sobre la Revolución', description: 'Mínimo 3 cuartillas con bibliografía',
      subject: 'Historia', status: 'pending', priority: 'high', dueDate: '2025-04-10',
      color: '#ff6b6b33', attachments: 2
    },
    {
      id: 2, title: 'Ejercicios de álgebra', description: 'Página 45 a 50 del libro',
      subject: 'Matemáticas', status: 'todo', priority: 'medium', dueDate: '2025-04-12',
      color: '#4dabf733', attachments: 0
    },
    {
      id: 3, title: 'Presentación de Biología', description: 'Tema: ecosistemas acuáticos',
      subject: 'Ciencias', status: 'done', priority: 'low', dueDate: '2025-04-08',
      color: '#51cf6633', attachments: 1
    },
    {
      id: 4, title: 'Vocabulario Unit 5', description: 'Memorizar 30 palabras nuevas',
      subject: 'Inglés', status: 'todo', priority: 'medium', dueDate: '2025-04-15',
      color: '#ffd43b33', attachments: 0
    },
  ];

  newActivity: Partial<Activity> = { status: 'todo', priority: 'medium' };
  private nextId = 5;

  private subjectColors: Record<string, string> = {
    'Matemáticas': '#4dabf733', 'Español': '#e599f733', 'Historia': '#ff6b6b33',
    'Ciencias': '#51cf6633', 'Inglés': '#ffd43b33', 'Arte': '#cc5de833',
  };

  get filteredActivities(): Activity[] {
    if (this.activeFilter === 'all') return this.activities;
    return this.activities.filter(a => a.status === this.activeFilter);
  }

  get pendingCount() { return this.activities.filter(a => a.status === 'pending').length; }
  get todoCount() { return this.activities.filter(a => a.status === 'todo').length; }
  get doneCount() { return this.activities.filter(a => a.status === 'done').length; }

  get completionPercent(): number {
    if (this.activities.length === 0) return 0;
    return Math.round((this.doneCount / this.activities.length) * 100);
  }

  get progressOffset(): number {
    const circumference = 2 * Math.PI * 50;
    return circumference - (this.completionPercent / 100) * circumference;
  }

  setFilter(filter: string) { this.activeFilter = filter; }

  toggleStatus(act: Activity) {
    act.status = act.status === 'done' ? 'pending' : 'done';
  }

  deleteActivity(act: Activity) {
    this.activities = this.activities.filter(a => a.id !== act.id);
  }

  openNewActivity() {
    this.newActivity = { status: 'todo', priority: 'medium' };
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  saveActivity() {
    if (!this.newActivity.title) return;
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
    this.closeModal();
  }
}
