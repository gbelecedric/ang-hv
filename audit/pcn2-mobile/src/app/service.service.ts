import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';



const httpOptions = {
  headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem(environment.VALUES.AUTH_TOKEN)))
};


const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
  })
};



export enum SearchType {
  all = '',
  Actif = 'ENABLE',
  Désactivé = 'DISABLE',
  'En attente' = 'PENDING',
  Mort = 'DEAD',
  'A notifier ' = 'NOTIFIED',
  Désabonné = 'UNSUBSCRIBE',
}


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  user = JSON.parse(localStorage.getItem('user'));
  host = environment.API_HOST;

  get isConnected(): any {
    const token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(token);
  }

  // desactiver un membre vivant soit pour solde insuffisant ou autre chose
  desactiverMembre(id) {
    console.log('dans desactivation : ' + id);
    console.log('dans desactivation token : ' + 'Bearer ' + JSON.parse(sessionStorage.getItem(environment.VALUES.AUTH_TOKEN)));

    return this.http.put(this.host + '/members/disactivate/' + id, {}, httpOptions);
  }

  // le membre existe deja
  activerMembreDesactiver(id) {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.host + '/members/activate/' + id, {}, httpOptions);
  }

  // recupéré une seul association
  getOneAssociation(id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get<any>(this.host + '/communities/' + id, { headers });
  }

  getCommunityList() {
    return this.http.get<any>(this.host + environment.PROPERTY.COMMUNITIES_SERVICES, httpOptions);
  }

  // modification d'un membre
  updateMember(id, nomMembre, prenomMembre, adresseMembre, telMembre,
    codePostalMembre, ville, assoid, pcnorganizationid, dateNaiss,
    commissioningDate, email, gender, occupationId, repatriationCountryId) {

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
      })
    };
    return this.http.put<any>(this.host + environment.PROPERTY.API_ROUTES.UPDATEMEMBER,
      {
        memberDTO: {
          cityId: ville,
          communityId: assoid,
          firstName: prenomMembre,
          lastName: nomMembre,
          pcnOrganizationId: pcnorganizationid,
          phoneNumber: telMembre,
          street: adresseMembre,
          userId: id,
          zipCode: codePostalMembre,
          birthDate: dateNaiss,
          commissioningDate: commissioningDate,
          email: email,
          gender: gender,
          occupationId: occupationId,
          repatriationCountryId: repatriationCountryId,
        },
        userId: id
      },
      headers);
  }

  getCommunityDetails(id) {
    return this.http.get<any>(this.host + '/communities/' + id, httpOptions);
  }

  getAllCommunityMember(community) {
    return this.http.get(this.host + '/members?community_id=' + community, httpOptions);
  }

  getMemberDetails(memberId) {
    return this.http.get(this.host + '/members/' + memberId, httpOptions);
  }
// get one member as details
getOneMember(id) {
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
  return this.http.get<any>(this.host + environment.PROPERTY.API_ROUTES.GETONEMEMBER + id, { headers });
}

  getMembre() {
    return this.http.get<any>(this.host + '/membre');
  }
  getEvent() {
    return this.http.get<any>(this.host + '/evenement');
  }
  getOneEvent(idEvent) {
    return this.http.get<any>(this.host + '/evenement/' + idEvent);
  }
  getTotalMembre() {
    return this.http.get<any>(this.host + '/totalMembrepcn');
  }
  getTotalEvent() {
    return this.http.get<any>(this.host + '/nombreTotalEvenementPcn');
  }
  getTotalAssociation() {
    return this.http.get<any>(this.host + '/nombreTotalAssociation');
  }

  getTotalMembreAsso(idAssociation) {
    return this.http.get<any>(this.host + '/membreOfAsso/' + idAssociation);
  }
  getTotalEvenementAsso(id) {
    return this.http.get<any>(this.host + '/evenementOfAsso/' + id);
  }
  getTotalMembreDesactiveAsso(idAsso) {
    return this.http.get<any>(this.host + '/listeMembreActInaParAsso/' + idAsso + '/4');
  }
  getMontantTotalPcn() {
    return this.http.get<any>(this.host + '/montantTotalCotisationPcn');
  }
  getDetailsPcn() {
    return this.http.get<any>(this.host + '/detailCotisationPCN');
  }
  getMontantTotalAssociation(idMtAsso) {
    return this.http.get<any>(this.host + '/montantTotalCotisationAsso/' + idMtAsso);
  }
  getMontantTotalMembre(idMtMembre) {
    return this.http.get<any>(this.host + '/montantTotalCotisationMembre/' + idMtMembre);
  }
  getDetailsAssociation() {
    return this.http.get<any>(this.host + '/transfertAsso');
  }
  getDetailsMembre(idDetailsMembre) {
    return this.http.get<any>(this.host + '/detailCotisationMembre/' + idDetailsMembre);
  }
  getNombreNotification() {
    return this.http.get<any>(this.host + '/notifications');
  }
  getNotificationLus() {
    return this.http.get<any>(this.host + '/notificationLus');
  }
  getActiverNotification(idnotif, idM) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(this.host + '/activerNotifLu/' + idnotif + '/' + idM, {
      notifId: idnotif, membreId: idM
    },
      { headers }
    );
  }
  getSoldeCompteMembre(idCompte) {
    return this.http.get<any>(this.host + '/soldeCompteMembre/' + idCompte);
  }

  verification(emails: string, passwords: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.host + '/users/login',
      {
        emailMembre: emails, motPassMembre: passwords
      }
      , { headers }
    );
  }

  saveAssist(nomAssis, telAssis, adressAssis, email) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.post(this.getTheHost() + environment.VALUES.saveAssist,
      {
        assisteurDTO: {
          email: email,
          name: nomAssis,
          phoneNumber: telAssis,
          street: adressAssis
        }
      },
      { headers });

  }

  //enregistrement d'une institution
  saveInstitut(name, accountNumber) {

    return this.http.post(this.getTheHost() + environment.VALUES.saveInstitution, {

      fundManagerDTO: {
        name: name,
        accountNumber: accountNumber,
      }
    },
      httpOptions);

  }

  getOneAssist(id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get(this.getTheHost() + environment.VALUES.getOneAssist + id, { headers });
  }

  getAllAssist() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get(this.getTheHost() + environment.VALUES.getAllAssist, { headers });
  }

  // suppresion d'une association
  deleteAssist(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.getTheHost() + '/pcnapi/v1/assisteurs/' + id + '/delete', { headers }).subscribe(() => {
      this.getAllAssist();
    });
  }

  /* getAllInstitution() {
     return this.http.get<any>(this.getTheHost() + environment.VALUES.getAllInstitution, httpOptions);
   }*/

  getOneInstitut(id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get(this.getTheHost() + environment.VALUES.getOneInstitut + id, { headers });
  }


  getAllInstitution() {
    return this.http.get<any>(this.getTheHost() + environment.VALUES.getAllInstitution, httpOptions);
  }

  //enregistrement d'une institution
  saveInstitution(name, accountNumber) {

    return this.http.post(this.getTheHost() + environment.VALUES.saveInstitution, {

      fundManagerDTO: {
        name: name,
        accountNumber: accountNumber,
      }
    },
      httpOptions);
  }

  getAllEvenement(id?) {
    let endPoint = environment.VALUES.EVENTS;
    if (id !== null) {
      endPoint += '?community_id=' + id;
    }
    return this.http.get<any>(this.getTheHost() + endPoint, httpOptions);
  }

  getOneEvenement(id) {
    return this.http.get<any>(this.getTheHost() + environment.VALUES.getOneEvenement + id, httpOptions);
  }

    // enregistrement d'un évènement
    saveEvenement(motif, assisteur, member, date) {
      return this.http.post(this.getTheHost() + environment.VALUES.editSaveEvenement, {
        attachmentDTO: {
          attachmentType: 'EVENT_PROOF',
          name: 'Décès d\'un membre'
        },
        eventDTO: {
          description: motif,
          assisteurId: assisteur,
          memberId: member,
          passedAwayDate: date
        }
      }, httpOptions2);
    }
  





  pcnlogin(emailMembre, motPassMembre) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = {
      username: emailMembre,
      password: motPassMembre,
    };
    return this.http.post<any>(this.getTheHost() + environment.PROPERTY.API_ROUTES.LOGIN, data, {
      headers,
    });
  }
  // tslint:disable-next-line: max-line-length
  modify(idmodify, emails: string, tels: string, adr: string, codep: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(this.host + '/membre/' + idmodify + '/update  ',
      {
        // tslint:disable-next-line: max-line-length
        id: idmodify,
        emailMembre: emails,
        telMembre: tels,
        adresseMembre: adr,
        codePostalMembre: codep
      }, { headers });
  }
  modifyPassword(idmodify, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(this.host + '/modifierMotPass/' + idmodify + '/' + password,
      {
        memId: idmodify,
        nouveauPass: password
      }, { headers });
  }
  notification(idNotif, idmembre) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.host + '/notificationLu/create',
      {
        notification: { id: idNotif },
        membre: { id: idmembre }
      }, { headers });
  }


  // tslint:disable-next-line: member-ordering
  itemperpage = 5;
  // tslint:disable-next-line: member-ordering
  pagesizeoptions = [5, 10, 15];
  getTheHost() {
    return this.host;
  }
  getItemPerPage() {
    return this.itemperpage;
  }
  getPageSizeOptions() {
    return this.getPageSizeOptions;
  }



  //////////////////////////////////////// ASSOCIATION SERVICES ////////////////////

  // enregistrement d'un menbre
  saveAsso(nomAsso, dateCreateionAsso, objetAsso, ouvertureAsso,
    descCondiOuvert, telAsso, emailAsso, adresseAsso,
    codePostalAsso, ville, montantAde, datePayAde,
    justificatifPayAde, modePay, deviseComplete, coutPrestation, pcnOrganization, password) {

    console.log('la date creation ' + dateCreateionAsso);

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
      })
    };
    return this.http.post(this.host + '/communities',
      {
        communityDTO: {
          name: nomAsso,
          creationDate: dateCreateionAsso,
          communityAim: objetAsso,
          open: ouvertureAsso,
          openDescription: descCondiOuvert,
          phoneNumber: telAsso,
          email: emailAsso,
          street: adresseAsso,
          zipCode: codePostalAsso,
          cityId: ville,
          eventFees: coutPrestation,
          pcnOrganizationId: pcnOrganization,

        },

        paymentDetail: {
          amount: montantAde,
          currency: deviseComplete,
          operationDate: datePayAde,
          description: justificatifPayAde,
          paymentMode: modePay,
        },

        userDTO: {
          password: password,
          username: emailAsso,
        }
        // pays: {id: pays},
        // region: {id: region},
        // soldeMinAsso : soldeMinAsso,
        // soldeMinMembre :soldeMinMembre,
      },
      headers);
  }


  // Désactivation d'une association
  desactiverAsso(idAsso) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
    });

    return this.http.put(this.host + environment.VALUES.desactiverAsso + idAsso, {}, { headers });
  }

  // save frais d'adhésion membre
  saveFraisAdhesion(date, montant, details, membreid, justificatif) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(this.host + '/miseajourPaiement', {
      membreId: membreid,
      datePaiement: date,
      montantPaiement: montant,
      detailPaiement: details,
      justificatif: justificatif
    }, { headers });
  }

  // liste des professions
  getProfession() {
    return this.http.get<any>(this.host + environment.PROPERTY.API_ROUTES.OCCUPATION_LIST, httpOptions);
  }


  // activer d'une association
  activerAsso(idAsso) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
      })
    }; return this.http.put(this.host + environment.VALUES.activerAsso + idAsso, {}, headers);
  }

  // modification de l'association
  editAssociation(id: string, nomAsso: string, objetAsso: any, ouvertureAsso: any,
    descCondiOuvert: any, telAsso: any, emailAsso: any, adresseAsso: any,
    codePostalAsso: any, ville: any,
    // soldeMinAsso: any,soldeMinMembre: any
    pcnOrganizationId
  ) {

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token'))
      })
    };
    return this.http.put(this.host + '/communities',
      {
        communityDTO: {
          name: nomAsso,
          communityAim: objetAsso,
          open: ouvertureAsso,
          openDescription: descCondiOuvert,
          phoneNumber: telAsso,
          email: emailAsso,
          street: adresseAsso,
          zipCode: codePostalAsso,
          cityId: ville,
          pcnOrganizationId: pcnOrganizationId,

        },
        communityId: id



      }, headers);
  }


  getAllPay() {
    return this.http.get(this.host + environment.PROPERTY.API_ROUTES.GETALLPAYS, httpOptions);
  }

  getUnPay(id) {
    return this.http.get(this.getTheHost() + environment.PROPERTY.API_ROUTES.GETUNPAYS + id , httpOptions);
  }

  getAllRegionById(idPays: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get(this.host + '/locations/districts/country/' + idPays, { headers }); // A modifier
  }

  getAllVilleById(idPays: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem('id_token')));
    return this.http.get(this.host + '/locations/cities/district/' + idPays, { headers }); // A modifier
  }

  getListModePaiement() {
    return this.http.get<any>(this.host + '/metadatas/payment_mode', httpOptions);
  }

  //enregistrer une cotisation d'un membre sur un evenement
  saveCotisation(eventId, membreId, dateCotis, montantCotis, montantDepot, detailPayement, justificatifPayement, modePaiement) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.host + '/pcnapi/v1/cotisation/create', {
      evenement: { id: eventId },
      membre: { id: membreId },
      dateCotis: dateCotis,
      montantCotis: montantCotis,
      montantDepot: montantDepot,
      detailPayement: detailPayement,
      justificatifPayement: justificatifPayement,
      modePaiement: modePaiement

    }, { headers });
  }


  ///////////////////////////// DASHBOARD SERVICES ////////////////////////////////

  eventCount(id) {
    return this.http.get<any>(this.host + '/events/count?member_id=' + id, httpOptions);
  }

  activeCommunity() {

    return this.http.get<any>(this.host + '/communities/count?status=ENABLE', httpOptions);
  }

  membershipFees(id) {

    return this.http.get<any>(this.host + '/members/accounthistory/' + id, httpOptions);
  }
  communityCount(status) {

    return this.http.get<any>(this.host + '/communities/count?status=' + status, httpOptions);
  }

  allCommunityCotisation(id) {

    return this.http.get<any>(this.host + '/communities/cotisations?pcn_organization_id=' + id, httpOptions);
  }

  getAccountHistory(id) {

    return this.http.get<any>(this.host + '/members/accounthistory/' + id, httpOptions);
  }

  getAllCommunity(id) {

    return this.http.get<any>(this.host + '/reporting/communties/search?pcn_organization_id=' + id, httpOptions);
  }

  getAllCommunityPending(id) {

    return this.http.get<any>(this.host + '/reporting/communties/search?pcn_organization_id=' + id  +'&status=PENDING', httpOptions);
  }

  getCommunityReport(id) {

    return this.http.get<any>(this.host + '/reporting/communties/' + id, httpOptions);
  }

  familyLink(id) {
    return this.http.get<any>(this.host + '/members/get_linked_family/' + id, httpOptions);
  }

  getEventInfo(id) {
    return this.http.get<any>(this.host + '/reporting?community_id=' + id, httpOptions);
  }

  getCommuntyMembers(id, statut) {
    return this.http.get<any>(this.host + '/members?community_id=' + id + '&status=' + statut, httpOptions);

  }

  // ## WORKFLOW EVENT 
  
  // Validate / generate prestation
  validate(amount: any, id: string) {
    return this.http.put(this.getTheHost()
      + environment.PROPERTY.API_ROUTES.VALIDATE_EVENT
      + '?eventAmount=' + amount + '&eventId=' + id, {},
      httpOptions);
  }
  // transfert admin
  transfertCotisationPCN(id) {
    return this.http.put(this.getTheHost()
      + environment.PROPERTY.API_ROUTES.T_EVENT_PCN + id, {},
    httpOptions);
  }

  // transfert assistant
  transfertAssistant(id) {
    return this.http.put(this.getTheHost()
      + environment.PROPERTY.API_ROUTES.T_EVENT_ASSISTANT + id, {},
      httpOptions);
  }

  // transfert Member
  transfertToMember(id) {
    return this.http.put(this.getTheHost()
      + environment.PROPERTY.API_ROUTES.T_EVENT_MEMBER + id, {},
      httpOptions);
  }

  // clôturer un évènement
  cloturerPrestation(idEvent) {
    return this.http.put(this.getTheHost()
      + environment.PROPERTY.API_ROUTES.CLOSE_EVENT + idEvent, {},
      httpOptions
    );
  }


}
