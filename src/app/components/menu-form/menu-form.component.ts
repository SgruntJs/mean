import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Router, ActivatedRoute, ParamMap, } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { ApicallService } from 'src/app/services/apicall/apicall.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menuForm!: FormGroup;
  editMode = false;
  paramId!: string;
  menuItem!: Menu;

  menuList$ = new Subject<Menu[]>;
  menuList!: Menu[];

  menuItem$ = new Subject<Menu>;

  constructor(
    private menuSrv: MenuService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private dataSrv: DataService,
    private api: ApicallService
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token'))
      this.api.goToAreaRiservata(localStorage.getItem('token')).subscribe((res: any) => {
        if (res && res['status'] === 'ok') {
          console.log('we are in the manu form area riservata');

        } else {
          console.log('we are infanculo in dashboard');
        }
      }
      )
    this.retrieveDataMenu();

    this.ActivatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        // this.menuItem = this.getSingleMenu(this.paramId);
        this.menuList$
          .subscribe((data) => {
            this.menuList = data;
            const index = this.menuList.findIndex((el: any) => {
              return el._id == this.paramId;
            });
            this.menuItem = this.menuList[index];
            this.menuItem$.next(this.menuItem);
          });
      } else {
        this.editMode = false;

      }
    });
    this.menuItem$.subscribe(res => {
      //https://stackoverflow.com/questions/3568921/how-to-remove-part-of-a-string
      let newdate = this.menuItem.giorno.split("T")[0];
      console.log(newdate);
      this.menuForm = new FormGroup({
        "giorno": new FormControl(this.editMode ? newdate : '', [Validators.required]),
        "primo1": new FormControl(this.editMode ? this.menuItem.primo1 : '', [Validators.required]),
        "primo2": new FormControl(this.editMode ? this.menuItem.primo2 : '', [Validators.required]),
        "primo3": new FormControl(this.editMode ? this.menuItem.primo3 : '', [Validators.required]),
        "secondo1": new FormControl(this.editMode ? this.menuItem.secondo1 : '', [Validators.required]),
        "secondo2": new FormControl(this.editMode ? this.menuItem.secondo2 : '', [Validators.required]),
        "secondo3": new FormControl(this.editMode ? this.menuItem.secondo3 : '', [Validators.required]),

      });
    });

    this.menuForm = new FormGroup({
      "giorno": new FormControl(null, [Validators.required]),
      "primo1": new FormControl(null, [Validators.required]),
      "primo2": new FormControl(null, [Validators.required]),
      "primo3": new FormControl(null, [Validators.required]),
      "secondo1": new FormControl(null, [Validators.required]),
      "secondo2": new FormControl(null, [Validators.required]),
      "secondo3": new FormControl(null, [Validators.required]),
    });
  }

  retrieveDataMenu() {
    this.menuSrv.getMenu()
      .subscribe((data) => {
        this.menuList = data.menu;
        this.menuList$.next(this.menuList);
      });
  }

  getSingleMenu(id: string) {
    const index = this.menuList.findIndex((el: any) => {
      return el.id == id
    });

    return this.menuList[index];
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
    if (this.editMode) {
      menu._id = this.paramId;
      this.menuSrv.updateMenu(this.paramId, menu).subscribe(
        () => {
          this.retrieveDataMenu();
          this.dataSrv.onSendTrueUpdate(true);
        }
      );
    } else {
      this.menuSrv.postMenu(menu);
    }
    this.router.navigateByUrl('/lista-menu');
  }

}
