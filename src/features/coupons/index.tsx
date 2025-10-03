import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Tag, TrendingUp, Users, Percent, DollarSign } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { couponsApi, type Coupon } from '@/lib/coupons-api'
import { CouponsTable } from './components/coupons-table'
import { CreateCouponDialog } from './components/create-coupon-dialog'
import { EditCouponDialog } from './components/edit-coupon-dialog'

export function Coupons() {
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)

  // Fetch coupons for stats
  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: couponsApi.list,
  })

  // Calculate statistics
  const stats = {
    total: coupons.length,
    active: coupons.filter(c => c.isActive).length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usageCount, 0),
    averageDiscount: coupons.length > 0 
      ? coupons.reduce((sum, c) => sum + c.userDiscount.value, 0) / coupons.length 
      : 0,
  }

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
  }

  const handleCloseEdit = () => {
    setEditingCoupon(null)
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Coupon Management
            </h1>
            <p className='text-muted-foreground text-lg'>
              Create and manage discount coupons and commission settings
            </p>
          </div>
          
          <CreateCouponDialog />
        </div>

        {/* Statistics Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Coupons</CardTitle>
              <Tag className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.total}</div>
              <p className='text-xs text-muted-foreground'>
                {stats.active} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Coupons</CardTitle>
              <TrendingUp className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-600'>{stats.active}</div>
              <p className='text-xs text-muted-foreground'>
                {stats.total - stats.active} inactive
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Usage</CardTitle>
              <Users className='h-4 w-4 text-blue-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-blue-600'>{stats.totalUsage}</div>
              <p className='text-xs text-muted-foreground'>
                Times coupons were used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Avg. Discount</CardTitle>
              <Percent className='h-4 w-4 text-purple-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-purple-600'>
                {stats.averageDiscount.toFixed(1)}%
              </div>
              <p className='text-xs text-muted-foreground'>
                Average discount value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coupons Table */}
        <CouponsTable onEdit={handleEdit} />

        {/* Edit Dialog */}
        <EditCouponDialog 
          coupon={editingCoupon}
          isOpen={!!editingCoupon}
          onClose={handleCloseEdit}
        />
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Coupons',
    href: '/coupons',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Analytics',
    href: '/coupons/analytics',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: '/coupons/settings',
    isActive: false,
    disabled: true,
  },
]