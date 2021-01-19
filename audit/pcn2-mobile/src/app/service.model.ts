
export class Assisteur {
  id: string;
  name: string;
  email: string;
  street: string;
  phoneNumber: string;
}


export class FundManagerDTO {
  accountNumber: string;
  id: string;
  name: string;
}


export class AssisteurDTO {
  email: string;
  id: string;
  name: string;
  phoneNumber: string;
  street: string;
}

export class EventDTO {
  amount: number;
  assisteurId: string;
  communityId: string;
  description: string;
  eventStatus: string;
  id: string;
  isServed: boolean;
  isValidatedByAdmin: boolean;
  isValidatedByAssisteur: boolean;
  memberId: string;
  passedAwayDate: Date;
  pcnOrganizationId: string;
}

export class MemberDTO {
  birthDate: string;
  cityId: string;
  commissioningDate: Date;
  communityId: string;
  email: string;
  familyLink: string;
  firstName: string;
  gender: string;
  lastName: string;
  memberStatus: string;
  occupationId: string;
  pcnOrganizationId: string;
  phoneNumber: string;
  repatriationCountryId: string;
  street: string;
  userId: string;
  zipCode: string;
}

export class evenement {
  assisteurDTO: AssisteurDTO;
  eventDTO: EventDTO;
  memberDTO: MemberDTO;
}

export class Pays{
  id: number;
  name: string;
  isoCode: string;
  currency: string;
  currencySymbol: string;
}