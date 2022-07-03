import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public index!: number;
  public changeName: string = 'Crear Usuario';
  public loading: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.data$.subscribe((resp) => {
      this.onChangeView(resp);
    });
  }

  onChangeView(obj: any) {
    this.index = obj.index;
    !obj.isEdit
      ? (this.changeName = 'Crear Usuario')
      : (this.changeName = 'Actualizar Usuario');
  }
}
