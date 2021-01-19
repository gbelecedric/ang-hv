export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  baseUrl: 'http://localhost:4200',
  API_HOST: 'http://192.168.9.57:8080',
  ROUTES: {
    HOME: '/home-results',
    ADD_COMMUNITY_EVENT: '/pcn/admin-association/evenement/ajout-evenement/',
    SHOW_COMMUNITY_EVENT: '/pcn/admin-association/evenement/evenement-membre/',
    ADD_COMMUNITY_MEMBER: '/pcn/admin-association/membre/ajout-membre/',
    SHOW_COMMUNITY_MEMBER: '/pcn/admin-association/membre/liste-membre/',
  },
  VALUES: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    PCN_ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
    COMMUNITY_ADMIN: 'COMMUNITY_ADMIN',
    ACTIVE_STATUS: 'ACTIVE',
    ENABLED_STATUS: 'ENABLE',
    AUTH_TOKEN: 'id_token',
    getMontantPrestationAssoAPI: '/pcnapi/v1/montantPrestationAssociation/',
    getNombreTotalAssociation: '/communities/count',
    nombreTotalEvenementPcn: '/events/count',
    totalMembrepcn: '/members/count',
    getNbreAssist: '/assisteurs/count',
    getlisteAssociationActiveParcoutMembre: '/communities?status=ENABLE',
    getlisteAssoActive: '/communities?status=ENABLE',
    getListeAssoDesactive: '/communities?status=DISABLE',
    desactiverAsso: '/communities/disable/',
    activerAsso: '/communities/enable/',
    getidAsso: '',
    DEFAULT_MEMBER: 'JOHN DOE',
    saveAssist: '/assisteurs',
    updateAssist: '/assisteurs',
    getAllAssist: '/assisteurs/search',
    getOneAssist: '/assisteurs/get_by_email?email=',
    getAllInstitution: '/fundManagers/search',
    saveInstitution: '/fundManagers',
    updateInstitution: '/fundManagers',
    getOneInstitut: '/fundManagers/get_by_account_manager?account_manager=',
    getOneEvenement: '/events/findById?eventId=',
    COMMUNITY_STATUTS: {
      ENABLE: 'ENABLE',
      DISABLE: 'DISABLE',
      PENDING: 'PENDING',
      NOTIFIED: 'NOTIFIED',
    },
    EVENTS: '/events',
    editSaveEvenement: '/events/',
  },
  OTHER_VALUES: {
    PASSWORD_LENGHT: 20,
    CHARS: 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890',
    ramdomPass: ''
  },
  PROPERTY: {
    COMMUNITIES_SERVICES: '/communities',
    ROUTES: {
      SUPER_ADMIN: '/admin',
      PCN_ADMIN: '/pcn/admin-pcn',
      MEMBER: '/member',
      COMMUNITY_ADMIN: '/pcn/admin-association',
      ADD_COMMUNITY_EVENT: '/pcn/admin-association/evenement/ajout-evenement/',
      SHOW_COMMUNITY_EVENT: '/pcn/admin-association/evenement/evenement-membre/',
      ADD_COMMUNITY_MEMBER: '/pcn/admin-association/membre/ajout-membre/',
      SHOW_COMMUNITY_MEMBER: '/pcn/admin-association/membre/liste-membre/'
    },
    OTHER_VALUES: {
      PASSWORD_LENGHT: 20,
      CHARS: 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890',
      ramdomPass: ''
    },
    PROPERTY: {

      DEFAULT_MEMBER: 'JOHN DOE',
    },
    API_ROUTES: {
      COUNTRIES_LIST: '/locations/countries',
      OCCUPATION_LIST: '/metadatas/occupations',
      COMMUNITY_LIST: '/communities',
      LOGIN: '/login',
      UPDATEMEMBER: '/members',
      GETONEMEMBER: '/members/get_by_user_id/',
      SAVEPAYMENT: '/members/payfees',
      GETONEMEMBERBYMEMBERID: '/members/',
      GETALLPAYS: '/locations/countries',
      GETUNPAYS: '/locations/countries/',
      NOUVEAUPAIEMENTDEVISE: '',
      GETALLPAYMENT: '/members/accounthistory/',
      VALIDATE_EVENT: '/events/adminPCNValidation',
			T_EVENT_PCN: '/events/transferToPCN?eventId=',
			T_EVENT_ASSISTANT: '/events/transferFundToAssisteur?eventId=',
			T_EVENT_MEMBER: '/events/transferFundToBeneficiary?eventId=',
			CLOSE_EVENT: '/events/closeEvent?eventId=',

    },
    MEMBER_STATUT: {
      ENABLE: 'ENABLE',
      DISABLE: 'DISABLE',
      PENDING: 'PENDING',
      DEAD: 'DEAD',
      NOTIFIED: 'NOTIFIED',
      UNSUBSCRIBE: 'UNSUBSCRIBE',
    },
    GENDER: {
      MALE: 'MALE',
      FEMALE: 'FEMALE',
    },
    PAYMENT_DETAIL: {
      OPERATION_TYPE: {
        DEBIT: 'DEBIT',
        CREDIT: 'CREDIT'
      },
      API_ROUTES: {
        COUNTRIES_LIST: '/locations/countries',
        OCCUPATION_LIST: '/metadatas/occupations',
        COMMUNITY_LIST: '/communities',
        LOGIN: '/login',
        UPDATEMEMBER: '/members',
        GETONEMEMBER: '/members/get_by_user_id/',
      },
      MEMBER_STATUT: {
        ENABLE: 'ENABLE',
        DISABLE: 'DISABLE',
        PENDING: 'PENDING',
        DEAD: 'DEAD',
        NOTIFIED: 'NOTIFIED',
        UNSUBSCRIBE: 'UNSUBSCRIBE',
      },
      GENDER: {
        MALE: 'MALE',
        FEMALE: 'FEMALE',
      },
      PAYMENT_DETAIL: {
        OPERATION_TYPE: {
          DEBIT: 'DEBIT',
          CREDIT: 'CREDIT'
        },

      },
      ATTACHMENT_ENTITY_IDENTIFIER: {
        ADD_MEMBER: 'ADD_MEMBER',
        ADD_ASSOCIATION: 'ADD_ASSOCIATION',
        EVENT_PROOF: 'EVENT_PROOF',
        AMOUNT_RETURNED: 'AMOUNT_RETURNED',
        MEMBER_AMOUNT_DEPOSIT: 'AMOUNT_RETURNED',
        ASSOCIATION_AMOUNT_DEPOSIT: 'ASSOCIATION_AMOUNT_DEPOSIT'
      }
    }
  }
};
