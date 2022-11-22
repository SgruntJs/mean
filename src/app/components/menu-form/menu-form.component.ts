import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/models/menu.model';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menuForm!: FormGroup;

  constructor(private menuSrv: MenuService) { }

  ngOnInit(): void {
    this.menuForm = new FormGroup({
      "giorno": new FormControl(null, [Validators.required]),
      "primo1": new FormControl(null, [Validators.required]),
      "primo2": new FormControl(null, [Validators.required]),
      "primo3": new FormControl(null, [Validators.required]),
      "secondo1": new FormControl(null, [Validators.required]),
      "secondo2": new FormControl(null, [Validators.required]),
      "secondo3": new FormControl(null, [Validators.required]),
    });

    this.menuSrv.getMenu().subscribe( res => {
      console.log(res);
    });
  }

  onSubmit() {
    console.log(this.menuForm);
    const menu = new Menu(
      '', 
      this.menuForm.value.giorno, 
      this.menuForm.value.primo1,
      this.menuForm.value.primo2,
      this.menuForm.value.primo3,
      this.menuForm.value.secondo1,
      this.menuForm.value.secondo2,
      this.menuForm.value.secondo3,
      );
    this.menuSrv.postMenu(menu);
  }

}
