import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  segmento: string = 'materias';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // cambiarSegmento(event: any) {
  //   const valor = event.detail.value;

  //   if (valor === 'biblioteca') {
  //     this.router.navigate(['/biblioteca']);
  //   }
  // }


  cambiarSegmento(event: any) {
  const valor = event.detail.value;
  this.segmento = valor;

  if (valor === 'biblioteca') {
    setTimeout(() => {
      this.router.navigate(['/biblioteca']);
    }, 150);
  }
}

}