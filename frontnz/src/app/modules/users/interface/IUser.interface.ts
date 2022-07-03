export interface IUsersTb {
  id?: string;
  Name?: string;
  LastName?: string;
  documentUser?: IUserDocumentTb;
  infoUser?: IContactInfoTb;
  isMilitar?: boolean;
  TimeCreate?: Date;
  isTemporal?: boolean;
}

export interface IAppUserTb extends IUsersTb {
  username?: string;
  password?: string;
  email?: string;
  emailVerified?: boolean;
  verificationToken?: string;
}

export interface IUserDocumentTb {
  id?: string;
  Document?: string;
  TypeDocumentID?: ITypeDocumentTb;
  PlaceExpedition?: string;
  DateExpedition?: Date;
}

export interface ITypeDocumentTb {
  id?: string;
  NameTypeDocument?: string;
}

export interface IContactInfoTb {
  id?: string;
  Address?: string;
  Country?: ICountryTb;
  City?: string;
  Phone?: string;
  CelPhone?: string;
  EmergencyName?: string;
  EmergencyPhone?: string;
}

export interface ICountryTb {
  id?: string;
  CountryCode?: string;
  CountryName?: string;
}
