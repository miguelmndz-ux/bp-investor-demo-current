'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  className?: string
  icon?: ReactNode
  fullWidth?: boolean
}

type ButtonProps = BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>

type Props = ButtonProps | AnchorProps

export default function OutlineButton({ children, className = '', icon, fullWidth, ...rest }: Props) {
  const base = `${fullWidth ? 'block w-full text-center' : 'inline-flex'} items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-extrabold font-jakarta text-primary border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all ${className}`

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps
    return <a href={href} className={base} {...anchorRest}>{content}</a>
  }

  return <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>
}
