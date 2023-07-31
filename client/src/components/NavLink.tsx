import { FC } from 'react'
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom'
import c from 'clsx'

interface NavLinkComponentProps extends NavLinkProps {
  activeClassName?: string
}

const NavLink: FC<NavLinkComponentProps> = ({ className, activeClassName, ...props }) => {
  return <RouterNavLink {...props} className={({ isActive }) => c(className, isActive && activeClassName)} />
}

export default NavLink
