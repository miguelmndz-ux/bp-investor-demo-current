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

export default function PrimaryButton({ children, className = '', icon, fullWidth, ...rest }: Props) {
  const base = `${fullWidth ? 'flex w-full' : 'inline-flex'} items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-extrabold font-jakarta text-white shadow-xl hover:opacity-90 active:scale-95 transition-all ${className}`
  const style = { background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)' }

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps
    return <a href={href} className={base} style={style} {...anchorRest}>{content}</a>
  }

  return <button className={base} style={style} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>
}
