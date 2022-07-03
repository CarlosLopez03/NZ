import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  displayedColums: string[] = [];

  constructor(private userService: UsersService, public dialog: MatDialog) {
    this.initializeColumns();
  }

  ngOnInit(): void {
    this.userService.listUsers.subscribe((resp) => {
      if (resp) {
        this.getUsersForTable();
      }
    });
  }

  getUsersForTable() {
    this.userService.getAllUserForTable().subscribe({
      next: (res) => {
        if (res) {
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          Swal.fire({
            position: 'top-end',
            title: 'Error!',
            text: 'Error al obtener los usuario',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeUser(element: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se eliminara el Usuario permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Usuario',
    }).then((res) => {
      if (res.isConfirmed) {
        this.userService.deleteUser(element.id).subscribe({
          next: (res) => {
            this.dataSource._updateChangeSubscription();
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  initializeColumns(): void {
    this.displayedColums = [
      'documentUser',
      'Name',
      'LastName',
      'username',
      'email',
      'TimeCreate',
      'opciones',
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeView(isEdit: boolean, users: any = null): void {
    this.userService.listenChange({ users, isEdit, index: 1 });
  }
}
