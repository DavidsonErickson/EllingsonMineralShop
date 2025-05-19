import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/cart_items/cart_items-list',
    label: 'Cart items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCartPlus' in icon
        ? icon['mdiCartPlus' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CART_ITEMS',
  },
  {
    href: '/carts/carts-list',
    label: 'Carts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCartOutline' in icon
        ? icon['mdiCartOutline' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CARTS',
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiTag' in icon
        ? icon['mdiTag' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CATEGORIES',
  },
  {
    href: '/order_items/order_items-list',
    label: 'Order items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiPackageVariantClosed' in icon
        ? icon['mdiPackageVariantClosed' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORDER_ITEMS',
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiReceipt' in icon
        ? icon['mdiReceipt' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORDERS',
  },
  {
    href: '/products/products-list',
    label: 'Products',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCart' in icon
        ? icon['mdiCart' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PRODUCTS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
