import { SvgColor } from '../components/svg-color';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: icon('ic-cart'),
  },
  {
    title: 'Estimations',
    path: '/estimations',
    icon: icon('ic-blog'),
  }
];
