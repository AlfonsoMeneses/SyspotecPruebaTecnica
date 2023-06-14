export const environment = {
  production: false,
  services: {
    base: 'https://localhost:7208/api/',
    user: {
      get: 'user',
      create: 'user',
      edit: 'user/',
      delete: 'user/'
    },
    tickets: {
      get: 'ticket',
      create: 'ticket',
      edit: 'ticket/',
      delete: 'ticket/',
      assingUser: 'ticket/',
      getStatus: 'ticket/status',
      changeStatus: 'ticket/{ticketId}/status/{statusId}',
      paths:{
        ticketId: '{ticketId}',
        statusId: '{statusId}'
      }
    }
  },
  status: {
    ON_PROCCESS: 'En proceso',
    SUSPENDED: 'Suspendido',
    FINISHED: 'Terminado',
    EXPIRED: 'Vencida',
  },
  pagination: {
    pageSize: 5,
  }
};
