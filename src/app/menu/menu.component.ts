import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
  ){}

  ngOnInit() {
    window.scroll(0, 0)

    this.closeMenu();
  }

  closeMenu() {

      let menu = <HTMLInputElement>document.querySelector('.menu');
      let menuBtn1 = <HTMLInputElement>document.querySelector('.menuBtn1');
      let menuBtn2 = <HTMLInputElement>document.querySelector('.menuBtn2');
      let menuBtn3 = <HTMLInputElement>document.querySelector('.menuBtn3');
      let menuBtn4 = <HTMLInputElement>document.querySelector('.menuBtn4');
      let menuBtn5 = <HTMLInputElement>document.querySelector('.menuBtn5');
      let menuBtn6 = <HTMLInputElement>document.querySelector('.menuBtn6');
      let iconBurger = <HTMLInputElement>document.getElementById('burgerIcon');
      let iconClose = <HTMLInputElement>document.getElementById('closeIcon');
      let  largura = window.innerWidth;

      if (largura < 920 ) {

        iconBurger.addEventListener('click', function(){

          document.getElementById('menu')!.style.display = 'inline-block';
          iconClose!.style.display = 'inline-block';
          iconBurger!.style.display = 'none';
        });

        iconClose.addEventListener('click', function(){

          document.getElementById('menu')!.style.display = 'none';
          iconClose!.style.display = 'none';
          iconBurger!.style.display = 'inline-block';
        });

        menuBtn1.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn2.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn3.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn4.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn4.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn5.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });

        menuBtn6.addEventListener('click', function(){
          document.getElementById('menu')!.style.display = 'none';
          document.location.reload();
        });
      }

  }


}
