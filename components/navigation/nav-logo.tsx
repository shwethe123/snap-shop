import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
  return (
    <Link href={'/'} className='text-3xl font-bold text-green-500'><ShoppingBag size={46}/></Link>
  )
}

export default NavLogo