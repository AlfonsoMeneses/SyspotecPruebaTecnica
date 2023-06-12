import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'Tickets',
    url: '/tickets',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Usuarios',
    url: '/users',
    iconComponent: { name: 'cil-user' }
  }
];
