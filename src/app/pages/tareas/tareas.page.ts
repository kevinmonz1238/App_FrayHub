import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TareasPage implements OnInit {
  // 1. Evita que el navegador abra el archivo al arrastrarlo encima
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Aquí podrías añadir una clase CSS para resaltar la zona si quieres
  }

  // 2. Procesa los archivos cuando los sueltas en la zona
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.newTask.archivos.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    }
  }
  
  showForm: boolean = false;
  tareas: any[] = [];
  
  // Objeto para la nueva tarea
  newTask: any = {
    titulo: '',
    materia: '',
    fecha: '',
    descripcion: '',
    completada: false,
    archivos: []
  };

  constructor() {}

  ngOnInit() {
    // Aquí podrías cargar tareas desde un servicio o LocalStorage
  }

  // Alternar visibilidad del formulario
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  // Agregar una nueva tarea a la lista
  addTask() {
    if (this.newTask.titulo.trim() === '' || this.newTask.materia.trim() === '') {
      alert('Por favor, asocia al menos un título y una materia.');
      return;
    }

    // Añadimos una copia de la tarea actual al arreglo
    this.tareas.unshift({ ...this.newTask, id: Date.now() });
    
    // Cerramos el formulario y lo limpiamos
    this.toggleForm();
  }

  // Cambiar estado de la tarea (Pendiente/Completada)
  toggleComplete(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
  }

  // Eliminar una tarea (Con el estilo rojo de peligro)
  deleteTask(index: number) {
    this.tareas.splice(index, 1);
  }

  // --- LÓGICA DE ARCHIVOS ---

  onFilesSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.newTask.archivos.push({
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
  }

  removeFile(index: number, event: Event) {
    event.stopPropagation();
    this.newTask.archivos.splice(index, 1);
  }

  // Iconos dinámicos según el tipo de archivo
  getFileIcon(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'document-text-outline';
      case 'doc':
      case 'docx': return 'reader-outline';
      case 'jpg':
      case 'png': return 'image-outline';
      case 'zip':
      case 'rar': return 'archive-outline';
      default: return 'document-outline';
    }
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // --- CONTADORES PARA LOS STAT-PILLS ---

  getPendientes() {
    return this.tareas.filter(t => !t.completada).length;
  }

  getCompletadas() {
    return this.tareas.filter(t => t.completada).length;
  }

  private resetForm() {
    this.newTask = {
      titulo: '',
      materia: '',
      fecha: '',
      descripcion: '',
      completada: false,
      archivos: []
    };
  }
}