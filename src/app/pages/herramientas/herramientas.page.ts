// Importación de módulos necesarios
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    
import { IonicModule } from '@ionic/angular';

// Interfaces para tipar los datos

// Representa un material educativo
interface Material {
  name: string;
  subject: string;
  type: string;
  file: File | null;
}

// Representa una tarea reciente
interface Task {
  title: string;
  date: string;
  status: 'pending' | 'todo' | 'done';
}

// Representa contenido educativo
interface ContentItem {
  icon: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  gradient: string;
  url?: string;
}

@Component({
  selector: 'app-herramientas', // Nombre del componente
  templateUrl: './herramientas.page.html',
  styleUrls: ['./herramientas.page.scss'],
  standalone: true, // Componente independiente
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HerramientasPage {

  // Controla visibilidad del formulario
  showAddMaterial = false;

  // Indica si se está arrastrando un archivo
  isDragging = false;

  // Objeto para nuevo material
  newMaterial: Material = { name: '', subject: 'Matemáticas', type: 'PDF', file: null };

  // Lista de materiales existentes
  materials: Material[] = [
    { name: 'Guía de Álgebra Lineal', subject: 'Matemáticas', type: 'PDF', file: null },
    { name: 'Resumen de la Revolución', subject: 'Historia', type: 'Documento', file: null },
    { name: 'Vocabulario Inglés B2', subject: 'Inglés', type: 'PDF', file: null },
  ];

  // Lista de tareas recientes
  recentTasks: Task[] = [
    { title: 'Ensayo de Literatura', date: '10 Abr 2025', status: 'pending' },
    { title: 'Ejercicios Cap. 5', date: '12 Abr 2025', status: 'todo' },
    { title: 'Proyecto de Ciencias', date: '8 Abr 2025', status: 'done' },
  ];

  // Contenido educativo mostrado en la interfaz
  educationalContent: ContentItem[] = [
    {
      icon: '🧮',
      title: 'Ecuaciones Cuadráticas',
      description: 'Aprende a resolver ecuaciones paso a paso.',
      category: 'Matemáticas',
      duration: '15 min',
      level: 'intermedio',
      gradient: 'linear-gradient(135deg, #0a1f44, #1a3a6e)'
    },
    {
      icon: '🔬',
      title: 'El Método Científico',
      description: 'Fundamentos de la investigación científica.',
      category: 'Ciencias',
      duration: '10 min',
      level: 'básico',
      gradient: 'linear-gradient(135deg, #ff6b00, #ff9a44)'
    },
    {
      icon: '📖',
      title: 'Análisis Literario',
      description: 'Técnicas para analizar textos narrativos.',
      category: 'Español',
      duration: '20 min',
      level: 'avanzado',
      gradient: 'linear-gradient(135deg, #0a1f44, #ff6b00)'
    },
    {
      icon: '🌍',
      title: 'La Segunda Guerra Mundial',
      description: 'Causas, desarrollo y consecuencias.',
      category: 'Historia',
      duration: '25 min',
      level: 'intermedio',
      gradient: 'linear-gradient(135deg, #1a3a6e, #4a7ab5)'
    },
  ];

  // Constructor con navegación
  constructor(private router: Router) {}

  // Desplaza la pantalla a una sección específica
  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Navega a la página de tareas
  goToTareas() {
    this.router.navigate(['/tareas']);
  }

  // Muestra u oculta el formulario de material
  toggleAddMaterial() {
    this.showAddMaterial = !this.showAddMaterial;
    this.newMaterial = { name: '', subject: 'Matemáticas', type: 'PDF', file: null };
  }

  // Guarda un nuevo material
  saveMaterial() {
    if (!this.newMaterial.name.trim()) return;
    this.materials.unshift({ ...this.newMaterial });
    this.showAddMaterial = false;
  }

  // Elimina un material
  deleteMaterial(index: number) {
    this.materials.splice(index, 1);
  }

  // Descarga un archivo si existe
  downloadMaterial(mat: Material) {
    if (mat.file) {
      const url = URL.createObjectURL(mat.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = mat.file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // Eventos de arrastrar archivos
  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  onDragLeave(e: DragEvent) { e.preventDefault(); this.isDragging = false; }

  // Maneja cuando se suelta un archivo
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files.length) this.newMaterial.file = e.dataTransfer.files[0];
  }

  // Maneja selección de archivo
  onFileSelected(e: any) {
    if (e.target.files.length) this.newMaterial.file = e.target.files[0];
  }

  // Formatea tamaño de archivo
  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  // Devuelve icono según tipo de archivo
  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      PDF: '📄',
      Video: '🎬',
      Enlace: '🔗',
      Documento: '📋'
    };
    return icons[type] || '📁';
  }

  // Devuelve color según materia
  getSubjectColor(subject: string): string {
    const colors: Record<string, string> = {
      Matemáticas: '#ff6b00',
      Español: '#0a1f44',
      Ciencias: '#10b981',
      Historia: '#8b5cf6',
      Inglés: '#3b82f6',
    };
    return colors[subject] || '#64748b';
  }

  // Traduce estado de tarea
  getStatusLabel(status: string): string {
    return {
      pending: 'Pendiente',
      todo: 'Por hacer',
      done: 'Hecha'
    }[status] || status;
  }

  // Abre contenido externo
  openContent(item: ContentItem) {
    if (item.url) window.open(item.url, '_blank');
  }
}