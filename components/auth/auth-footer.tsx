import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
type authFooterProps = {
    footerLabel: string,
    footerHref: string,
}

const AuthFooter  = ({footerLabel, footerHref} : authFooterProps) => {
  return (
    <Button asChild variant={"link"} className='w-full'>
      <Link href={footerHref} className='text-right'> {footerLabel} </Link>
    </Button>
  )
}

export default AuthFooter 