import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar, Users, Crown, TrendingUp, Eye, UserPlus, UserCheck } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { analyticsApi } from '@/lib/analytics-api'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'

export function Overview() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)

  const formattedDate = format(selectedDate, 'yyyy-MM-dd')

  // Fetch analytics data
  const {
    data: analytics,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['analytics-overview', formattedDate],
    queryFn: () => analyticsApi.getOverview(formattedDate),
  })

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setCalendarOpen(false)
    }
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
              Analytics Overview
            </h1>
            <p className='text-muted-foreground text-lg'>
              Monitor user engagement and premium subscription metrics
            </p>
          </div>
          
          <div className='flex items-center space-x-3'>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button
              onClick={() => refetch()}
              variant='outline'
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className='space-y-6'>
            {/* Main Metrics Row */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {/* Daily Active Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Daily Active Users</CardTitle>
                  <Eye className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{formatNumber(analytics.data.dau)}</div>
                  <p className='text-xs text-muted-foreground'>
                    Active users on {format(selectedDate, 'MMM dd, yyyy')}
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Active Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Weekly Active Users</CardTitle>
                  <TrendingUp className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{formatNumber(analytics.data.wau)}</div>
                  <p className='text-xs text-muted-foreground'>
                    Active users in the past 7 days
                  </p>
                </CardContent>
              </Card>

              {/* Monthly Active Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Monthly Active Users</CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{formatNumber(analytics.data.mau)}</div>
                  <p className='text-xs text-muted-foreground'>
                    Active users in the past 30 days
                  </p>
                </CardContent>
              </Card>

              {/* Premium Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Premium Users</CardTitle>
                  <Crown className='h-4 w-4 text-yellow-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
                    {formatNumber(analytics.data.premiumUsers)}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Premium subscribers as of {format(selectedDate, 'MMM dd, yyyy')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* New Users Row */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {/* Daily New Premium Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>New Premium Users</CardTitle>
                  <UserPlus className='h-4 w-4 text-green-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                    {formatNumber(analytics.data.dailyNewPremiumUsers)}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    New premium subscriptions on {format(selectedDate, 'MMM dd, yyyy')}
                  </p>
                </CardContent>
              </Card>

              {/* Daily New Users */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Daily New Users</CardTitle>
                  <UserCheck className='h-4 w-4 text-blue-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    {formatNumber(analytics.data.dailyNewUsers)}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    New user registrations on {format(selectedDate, 'MMM dd, yyyy')}
                  </p>
                </CardContent>
              </Card>

              {/* Date Info Card */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Data Date</CardTitle>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{format(selectedDate, 'MMM dd')}</div>
                  <p className='text-xs text-muted-foreground'>
                    {format(selectedDate, 'yyyy')} • {format(selectedDate, 'EEEE')}
                  </p>
                  <div className='mt-2'>
                    <Badge variant='outline' className='text-xs'>
                      {analytics.data.date}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className='space-y-6'>
            {/* Main Metrics Loading */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-4 bg-muted animate-pulse rounded' />
                  </CardHeader>
                  <CardContent>
                    <div className='h-8 w-16 bg-muted animate-pulse rounded mb-2' />
                    <div className='h-3 w-32 bg-muted animate-pulse rounded' />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* New Users Loading */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-4 bg-muted animate-pulse rounded' />
                  </CardHeader>
                  <CardContent>
                    <div className='h-8 w-16 bg-muted animate-pulse rounded mb-2' />
                    <div className='h-3 w-32 bg-muted animate-pulse rounded' />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!analytics && !isLoading && (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <TrendingUp className='h-12 w-12 text-muted-foreground mb-4' />
              <h3 className='text-lg font-semibold mb-2'>No Data Available</h3>
              <p className='text-muted-foreground text-center mb-4'>
                Unable to load analytics data for {format(selectedDate, 'PPP')}
              </p>
              <Button onClick={() => refetch()} variant='outline'>
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Detailed Analytics',
    href: '/analytics/detailed',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Reports',
    href: '/analytics/reports',
    isActive: false,
    disabled: true,
  },
]