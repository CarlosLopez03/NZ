import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { AES } from 'crypto-js';
import { firstValueFrom } from 'rxjs';
import {
  IAppUserTb,
  ICountryTb,
  ITypeDocumentTb,
} from '../../interface/IUser.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formUser!: FormGroup;
  step: number = 0;
  isUpdate: boolean = false;
  hidePassword: boolean = true;

  listTypeDocument: Array<ITypeDocumentTb> = [];
  listCountry: Array<ICountryTb> = [];
  isEmailVerified: boolean = false;

  idUser: string = '';
  selectTypeDocument: any;
  selectDocument: any;
  selectPlaceExpedition: any;
  selectDateExpedition: any;
  selectIsMilitar: any;
  selectIsTemporal: any;
  selectCountry: any;
  selectCity: any;
  selectAddress: any;
  selectPhone: any;
  selectCelPhone: any;
  selectEmergencyName: any;
  selectEmergencyPhone: any;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initLists();
    this.userService.data$.subscribe((resp) => {
      this.buildForm();
      this.isUpdate = resp.isEdit;
      this.validateAction(resp);
      if (!this.isUpdate) {
        this.defaultForm();
      }
    });
  }

  validateAction(obj: any) {
    if (obj.isEdit) {
      this.idUser = obj.users.id;
      this.formUser.patchValue(obj.users);
      this.selectTypeDocument = obj.users.documentUser.TypeDocumentID.id;
      this.selectDocument = obj.users.documentUser.Document;
      this.selectPlaceExpedition = obj.users.documentUser.PlaceExpedition;
      this.selectDateExpedition = obj.users.documentUser.DateExpedition;
      this.selectIsMilitar = obj.users.isMilitar;
      this.selectIsTemporal = obj.users.isTemporal;
      this.selectCountry = obj.users.infoUser.Country.CountryCode;
      this.selectCity = obj.users.infoUser.City;
      this.selectAddress = obj.users.infoUser.Address;
      this.selectPhone = obj.users.infoUser.Phone;
      this.selectCelPhone = obj.users.infoUser.CelPhone;
      this.selectEmergencyName = obj.users.infoUser.EmergencyName;
      this.selectEmergencyPhone = obj.users.infoUser.EmergencyPhone;
    }
  }

  buildForm() {
    this.formUser = this.formBuilder.group(
      {
        TypeDocument: [''],
        Document: ['', Validators.compose([Validators.maxLength(30)])],
        PlaceExpedition: ['', Validators.compose([Validators.maxLength(60)])],
        DateExpedition: [null],
        Name: ['', Validators.compose([Validators.maxLength(20)])],
        LastName: ['', Validators.compose([Validators.maxLength(20)])],
        isMilitar: [false],
        isTemporal: [true],
        username: [''],
        password: [''],
        email: ['', Validators.compose([Validators.email])],
        confEmail: [, Validators.compose([Validators.email])],
        emailVerified: [false],
        Country: [''],
        City: ['', Validators.compose([Validators.maxLength(50)])],
        Address: ['', Validators.compose([Validators.maxLength(60)])],
        Phone: [null, Validators.compose([Validators.maxLength(20)])],
        CelPhone: [null, Validators.compose([Validators.maxLength(20)])],
        EmergencyName: [null, Validators.compose([Validators.maxLength(100)])],
        EmergencyPhone: [null, Validators.compose([Validators.maxLength(20)])],
      },
      {
        validator: this.validateEmail('email', 'confEmail'),
      }
    );
  }

  async saveUser() {
    const newUser: IAppUserTb = {
      documentUser: {
        TypeDocumentID: this.findValueInList(
          this.listTypeDocument,
          this.formUser.controls['TypeDocument'].value,
          'id'
        ),
        Document: this.formUser.controls['Document'].value,
        PlaceExpedition: this.formUser.controls['PlaceExpedition'].value,
        DateExpedition: this.formUser.controls['DateExpedition'].value,
      },
      Name: this.formUser.controls['Name'].value,
      LastName: this.formUser.controls['LastName'].value,
      isMilitar: this.formUser.controls['isMilitar'].value,
      isTemporal: this.formUser.controls['isTemporal'].value,
      username: this.formUser.controls['username'].value,
      password: this.encryptPassword(this.formUser.controls['password'].value),
      email: this.formUser.controls['email'].value,
      emailVerified: this.formUser.controls['emailVerified'].value,
      infoUser: {
        Country: this.findValueInList(
          this.listCountry,
          this.formUser.controls['Country'].value,
          'CountryCode'
        ),
        City: this.formUser.controls['City'].value,
        Address: this.formUser.controls['Address'].value,
        Phone: this.formUser.controls['Phone'].value,
        CelPhone: this.formUser.controls['CelPhone'].value,
        EmergencyName: this.formUser.controls['EmergencyName'].value,
        EmergencyPhone: this.formUser.controls['EmergencyName'].value,
      },
      TimeCreate: new Date(),
    };

    const emailExists = await this.searchEmailUser(newUser);

    if (emailExists.length !== 0) {
      Swal.fire({
        icon: 'error',
        title: 'El correo electronico, ya se encuentra en uso',
      });
      return;
    }

    this.userService.createUser(newUser).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Creado Exitosamente!',
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
          });
          this.refreshAfterChange();
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: `Ha ocurrido un error: ${err}`,
        });
      },
    });
  }

  async updateUser() {
    const idUser = this.idUser;

    if (!idUser) {
      return;
    }

    const newUser: IAppUserTb = {
      documentUser: {
        TypeDocumentID: this.findValueInList(
          this.listTypeDocument,
          this.formUser.controls['TypeDocument'].value,
          'id'
        ),
        Document: this.formUser.controls['Document'].value,
        PlaceExpedition: this.formUser.controls['PlaceExpedition'].value,
        DateExpedition: this.formUser.controls['DateExpedition'].value,
      },
      Name: this.formUser.controls['Name'].value,
      LastName: this.formUser.controls['LastName'].value,
      isMilitar: this.formUser.controls['isMilitar'].value,
      isTemporal: this.formUser.controls['isTemporal'].value,
      username: this.formUser.controls['username'].value,
      password: this.encryptPassword(this.formUser.controls['password'].value),
      email: this.formUser.controls['email'].value,
      emailVerified: this.formUser.controls['emailVerified'].value,
      infoUser: {
        Country: this.findValueInList(
          this.listCountry,
          this.formUser.controls['Country'].value,
          'CountryCode'
        ),
        City: this.formUser.controls['City'].value,
        Address: this.formUser.controls['Address'].value,
        Phone: this.formUser.controls['Phone'].value,
        CelPhone: this.formUser.controls['CelPhone'].value,
        EmergencyName: this.formUser.controls['EmergencyName'].value,
        EmergencyPhone: this.formUser.controls['EmergencyName'].value,
      },
      TimeCreate: new Date(),
    };

    this.userService.updateUser(idUser, newUser).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado Correctamente!',
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
        });
        this.refreshAfterChange();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: `Ha ocurrido un error: ${err}`,
        });
      },
    });

    console.log(newUser);
  }

  initLists(): [any] {
    this.listTypeDocument = [
      { id: 'CC', NameTypeDocument: 'Cedula de Ciudadanía' },
      { id: 'CE', NameTypeDocument: 'Cedula de Extranjería' },
      { id: 'DNI', NameTypeDocument: 'Documento Nacional de Identidad' },
      { id: 'TI', NameTypeDocument: 'Tarjeta de Identidad' },
    ];

    this.listCountry = [
      { id: '1', CountryCode: 'AGG', CountryName: 'Argentina' },
      { id: '2', CountryCode: 'BRA', CountryName: 'Brasil' },
      { id: '3', CountryCode: 'CO', CountryName: 'Colombia' },
    ];

    const obj = {
      TypeDocument_TB: {
        TypeDocument: this.listTypeDocument,
      },
    };

    this.userService.listenListChange(obj);
    return [obj];
  }

  defaultForm() {
    const typeDocumentDefault = this.listTypeDocument.find(
      (cod) => cod.NameTypeDocument === 'Cedula de Ciudadanía'
    );

    const countryDefault = this.listCountry.find(
      (cod) => cod.CountryCode == 'CO'
    );

    this.formUser.get('TypeDocument')?.setValue(typeDocumentDefault?.id);
    this.formUser.get('Country')?.setValue(countryDefault?.CountryCode);
  }

  findValueInList(array: any, parameter: string, word: string) {
    return array.find((item: any) => item[word] == parameter);
  }

  async searchEmailUser(obj: any) {
    const findEmail = this.userService.getUserByEmail(obj.email);
    return await firstValueFrom(findEmail);
  }

  encryptPassword(password: string): string {
    try {
      return AES.encrypt(password.trim(), 'pruebaNz').toString();
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  validateEmail(email: string, confEmail: string) {
    return (group: FormGroup) => {
      const emailInput = group.controls['email'];
      const emailConfirmationInput = group.controls['confEmail'];
      if (emailInput.value !== emailConfirmationInput.value) {
        this.isEmailVerified = false;
        return emailConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        this.isEmailVerified = true;
        return emailConfirmationInput.setErrors(null);
      }
    };
  }

  validateActionMethod() {
    if (this.isUpdate) {
      this.updateUser();
      return;
    }
    this.saveUser();
  }

  refreshAfterChange() {
    this.userService.listUsers.next(true);
    this.userService.listenChange({
      users: null,
      isEdit: false,
      index: 0,
    });
    this.formUser.reset();
  }

  cancelAction() {
    this.userService.listenChange({ index: 0 });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
