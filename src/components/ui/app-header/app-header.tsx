import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation().pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive
                  ? clsx(styles.link_active, styles.link)
                  : clsx(styles.link)
              }
            >
              <BurgerIcon type={location === '/' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink
              to={'/feed'}
              className={({ isActive }) =>
                isActive
                  ? clsx(styles.link_active, styles.link)
                  : clsx(styles.link)
              }
            >
              <ListIcon type={location === '/feed' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <NavLink to={'/'}>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              isActive
                ? clsx(styles.link_active, styles.link)
                : clsx(styles.link)
            }
          >
            <ProfileIcon
              type={
                location === '/profile' ||
                location === '/profile/orders' ||
                location.startsWith('/profile/orders/')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
