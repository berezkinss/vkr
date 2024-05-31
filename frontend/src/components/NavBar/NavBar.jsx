import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconFileTypeDoc
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavBar.module.css';

const mainLinksMockdata = [
  { icon: IconCalendarStats, label: 'Соревнования' },
  { icon: IconDeviceDesktopAnalytics, label: 'Матчи' },
  { icon: IconFileTypeDoc, label: 'Документы' },
  { icon: IconUser, label: 'Профиль' },
];

const linksMockdata = [
  'Соревнования',
  'Матчи',
  'Документы',
  'Профиль'
];

export default function NavBar() {
  const [active, setActive] = useState('Соревнования');
  const [activeLink, setActiveLink] = useState('Соревнования');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div>
      </div>
    </nav>
  );
}

