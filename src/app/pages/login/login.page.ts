// Importación de módulos necesarios
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Importación del componente principal (donde está la lógica de autenticación)
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login', // Nombre del componente
  templateUrl: './login.page.html', // Archivo HTML asociado
  styleUrls: ['./login.page.scss'], // Archivo de estilos
  standalone: false,
})
export class LoginPage {

  // Variables para almacenar los datos del formulario
  username = '';
  password = '';

  // Variable para mostrar mensajes de error
  error = '';

  // Variable para controlar el estado de carga
  cargando = false;

  // Variable para mostrar u ocultar la contraseña
  mostrarPassword = false;

  // Inyección del componente principal y router
  constructor(
    private appComponent: AppComponent,
    private router: Router
  ) {}

  // Método para iniciar sesión
  async login() {

    // Validación: campos vacíos
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Por favor ingresa usuario y contraseña';
      return;
    }

    // Activa indicador de carga
    this.cargando = true;

    // Limpia errores previos
    this.error = '';

    // Llama al método de autenticación definido en AppComponent
    const ok = await this.appComponent.iniciarSesion(
      this.username.trim(),
      this.password.trim()
    );

    // Desactiva indicador de carga
    this.cargando = false;

    // Si el login es correcto, redirige a inicio
    if (ok) {
      this.router.navigate(['/inicio'], { replaceUrl: true });
    } else {
      // Si falla, muestra error
      this.error = 'Usuario o contraseña incorrectos';
    }
  }

  // Método para mostrar u ocultar la contraseña
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}