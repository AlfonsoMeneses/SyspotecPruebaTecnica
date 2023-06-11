export const environment = {
  production: false,
  services: {
    base: 'http://ec2-54-165-78-243.compute-1.amazonaws.com/ticket_service/api/',
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
    pageSize: 10,
  }
};
