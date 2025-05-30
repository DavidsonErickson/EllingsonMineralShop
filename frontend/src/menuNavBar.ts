import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiVuejs,
} from '@mdi/js';
import { MenuNavBarItem } from './interfaces';

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true,
  },
];

export const webPagesNavBar = [
  {
    href: '/home',
    label: 'home',
  },
  {
    href: '/products',
    label: 'products',
  },
  {
    href: '/contact',
    label: 'contact',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/pricing',
    label: 'pricing',
  },
];

export default menuNavBar;
