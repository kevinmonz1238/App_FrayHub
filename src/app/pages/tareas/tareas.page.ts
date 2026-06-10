// Importación de módulos necesarios de Angular y Ionic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';

// Importación de Supabase
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tareas', // Nombre del componente
  templateUrl: './tareas.page.html', // Vista HTML
  styleUrls: ['./tareas.page.scss'], // Estilos
  standalone: true, // Componente independiente
  imports: [IonicModule, CommonModule, FormsModule] // Módulos que usa
})
export class TareasPage implements OnInit {

  // Cliente de Supabase para conexión con la base de datos
  private supabase: SupabaseClient;

  // Controla si se muestra el formulario
  showForm: boolean = false;

  // Arreglo de tareas
  tareas: any[] = [];

  // Archivos seleccionados para subir
  filesToUpload: File[] = [];

  // Objeto para nueva tarea
  newTask: any = {
    titulo: '',
    materia: '',
    fecha: '',
    descripcion: '',
    archivos: []
  };

  // Inyección de controladores de carga y notificaciones
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    // Inicializa la conexión con Supabase
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.getTareas();
  }

  // Obtiene las tareas desde la base de datos
  async getTareas() {
    const { data, error } = await this.supabase
      .from('tarea_alumnos_app')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) this.tareas = data;
    if (error) console.error('Error al obtener tareas:', error.message);
  }

  // Agrega una nueva tarea
  async addTask() {

    // Validación básica
    if (!this.newTask.titulo || !this.newTask.materia) {
      this.presentToast('Título y materia son requeridos', 'warning');
      return;
    }

    // Muestra loading
    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    try {
      // Sube archivos y obtiene URLs
      const uploadedUrls = await this.uploadFiles();

      // Inserta datos en la base de datos
      const { error } = await this.supabase
        .from('tarea_alumnos_app')
        .insert([{
          titulo: this.newTask.titulo,
          asignatura: this.newTask.materia,
          descripcion: this.newTask.descripcion,
          fecha: this.newTask.fecha || null,
          archivo: uploadedUrls.length > 0 ? uploadedUrls[0] : null
        }]);

      if (error) throw error;

      // Mensaje de éxito
      await this.presentToast('Tarea creada');

      // Oculta formulario y recarga tareas
      this.toggleForm();
      await this.getTareas();

    } catch (err: any) {
      // Manejo de errores
      this.presentToast('Error: ' + err.message, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  // Muestra u oculta el formulario
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  // Devuelve número de tareas pendientes
  getPendientes() { return this.tareas.length; }

  // Devuelve número de tareas completadas (no implementado aún)
  getCompletadas() { return 0; }

  // Marca tarea como completada (en desarrollo)
  async toggleComplete(index: number) {
    this.presentToast('Función en desarrollo', 'medium');
  }

  // Evita comportamiento por defecto al arrastrar archivos
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Maneja cuando se sueltan archivos
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  // Maneja selección de archivos desde input
  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files) this.handleFiles(files);
  }

  // Procesa archivos seleccionados
  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.filesToUpload.push(files[i]);
      this.newTask.archivos.push({
        name: files[i].name,
        size: files[i].size
      });
    }
  }

  // Devuelve icono según tipo de archivo
  getFileIcon(filename: string): string {
    if (!filename) return 'document-outline';
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf': return 'document-text-outline';
      case 'doc':
      case 'docx': return 'reader-outline';
      case 'jpg':
      case 'jpeg':
      case 'png': return 'image-outline';
      default: return 'document-outline';
    }
  }

  // Convierte tamaño de archivo a formato legible
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Sube archivos a Supabase Storage
  async uploadFiles(): Promise<string[]> {
    const urls: string[] = [];

    for (const file of this.filesToUpload) {
      const fileName = `${Date.now()}_${file.name}`;

      const { data, error } = await this.supabase.storage
        .from('tareas')
        .upload(fileName, file);

      if (data) {
        const { data: urlData } = this.supabase.storage
          .from('tareas')
          .getPublicUrl(fileName);

        urls.push(urlData.publicUrl);
      }
    }

    return urls;
  }

  // Elimina tarea
  async deleteTask(index: number) {
    const tarea = this.tareas[index];

    const { error } = await this.supabase
      .from('tarea_alumnos_app')
      .delete()
      .eq('id', tarea.id);

    if (!error) {
      this.tareas.splice(index, 1);
      this.presentToast('Eliminada');
    }
  }

  // Limpia el formulario
  private resetForm() {
    this.filesToUpload = [];
    this.newTask = { titulo: '', materia: '', fecha: '', descripcion: '', archivos: [] };
  }

  // Muestra notificaciones tipo toast
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  // Elimina archivo antes de subirlo
  removeFile(index: number, event: Event) {
    event.stopPropagation();
    this.filesToUpload.splice(index, 1);
    this.newTask.archivos.splice(index, 1);
  }
}