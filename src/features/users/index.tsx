import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { 
  Calendar, 
  Users as UsersIcon, 
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { analyticsApi, type User } from '@/lib/analytics-api'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'

interface DateRange {
  from: Date
  to: Date
}

export function Users() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  })
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [usersPage, setUsersPage] = useState(0)
  const [usersLimit] = useState(50)

  const formattedStartDate = format(dateRange.from, 'yyyy-MM-dd')
  const formattedEndDate = format(dateRange.to, 'yyyy-MM-dd')

  // Fetch users data
  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['new-users-in-range', formattedStartDate, formattedEndDate, usersPage, usersLimit],
    queryFn: () => analyticsApi.getNewUsersInRange({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      limit: usersLimit,
      skip: usersPage * usersLimit,
    }),
  })

  const handleRefresh = () => {
    refetchUsers()
  }

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    setUsersPage(0) // Reset pagination
  }

  const handlePreviousPage = () => {
    setUsersPage(prev => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    if (usersData?.data.pagination?.hasMore) {
      setUsersPage(prev => prev + 1)
    }
  }

  const getUserDisplayName = (user: User) => {
    if (user.fullName) return user.fullName
    if (user.firstName) return user.firstName
    if (user.email) return user.email.split('@')[0]
    if (user.phone) return user.phone
    return `User ${user.userId.slice(-6)}`
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
              Users
            </h1>
            <p className='text-muted-foreground text-lg'>
              View all new user registrations in the selected date range
            </p>
          </div>
          
          <div className='flex items-center space-x-3'>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !dateRange && 'text-muted-foreground'
                  )}
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {dateRange ? (
                    `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`
                  ) : (
                    'Pick a date range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  initialFocus
                  mode='range'
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      handleDateRangeChange({ from: range.from, to: range.to })
                      setDatePickerOpen(false)
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Button
              onClick={handleRefresh}
              variant='outline'
              disabled={isUsersLoading}
            >
              {isUsersLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        {usersData?.data && (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Users Found</CardTitle>
                <UsersIcon className='h-4 w-4 text-blue-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {usersData.data.total}
                </div>
                <p className='text-xs text-muted-foreground'>
                  In selected date range
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Showing</CardTitle>
                <UsersIcon className='h-4 w-4 text-green-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                  {usersData.data.count}
                </div>
                <p className='text-xs text-muted-foreground'>
                  Users on this page
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Date Range</CardTitle>
                <Calendar className='h-4 w-4 text-purple-500' />
              </CardHeader>
              <CardContent>
                <div className='text-lg font-bold text-purple-600 dark:text-purple-400'>
                  {format(new Date(usersData.data.startDate), 'MMM dd')} - {format(new Date(usersData.data.endDate), 'MMM dd')}
                </div>
                <p className='text-xs text-muted-foreground'>
                  Selected range
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-4'>
              <CardTitle className='flex items-center gap-2'>
                <UsersIcon className='h-5 w-5' />
                New Users
              </CardTitle>
              {usersData?.data.total && (
                <div className='text-sm text-muted-foreground'>
                  {usersData.data.total} total users
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isUsersLoading ? (
              <div className='space-y-3'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className='flex items-center space-x-4 p-3'>
                    <div className='h-4 w-32 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-48 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-32 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                  </div>
                ))}
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>User ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData?.data.users?.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                              {getUserDisplayName(user)[0].toUpperCase()}
                            </div>
                            <div>
                              <p className='font-medium text-sm'>{getUserDisplayName(user)}</p>
                              {user.fullName && user.firstName && (
                                <p className='text-xs text-muted-foreground'>
                                  {user.firstName} {user.lastName}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='space-y-1'>
                            {user.email && (
                              <div className='flex items-center gap-1'>
                                <Mail className='h-3 w-3' />
                                <span className='text-sm'>{user.email}</span>
                              </div>
                            )}
                            {user.phone && (
                              <div className='flex items-center gap-1'>
                                <Phone className='h-3 w-3' />
                                <span className='text-sm'>{user.phone}</span>
                              </div>
                            )}
                            {!user.email && !user.phone && (
                              <span className='text-muted-foreground text-sm'>No contact info</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className='text-sm'>
                          <div>
                            <div>{format(new Date(user.registrationDate), 'MMM dd, yyyy')}</div>
                            <div className='text-xs text-muted-foreground'>
                              {format(new Date(user.registrationDate), 'HH:mm')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='font-mono text-xs'>
                          {user.userId.slice(-8)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {usersData?.data.users?.length === 0 && (
                  <div className='text-center py-8 text-muted-foreground'>
                    <UsersIcon className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>No users found for the selected date range</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {usersData?.data.pagination && usersData.data.total > usersLimit && (
              <div className='flex items-center justify-between pt-4 border-t'>
                <div className='text-sm text-muted-foreground'>
                  Showing {usersPage * usersLimit + 1}-{Math.min((usersPage + 1) * usersLimit, usersData.data.total)} of {usersData.data.total} users
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handlePreviousPage}
                    disabled={usersPage === 0 || isUsersLoading}
                  >
                    <ChevronLeft className='h-4 w-4 mr-1' />
                    Previous
                  </Button>
                  <span className='text-sm text-muted-foreground'>
                    Page {usersPage + 1} of {Math.ceil(usersData.data.total / usersLimit)}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleNextPage}
                    disabled={!usersData.data.pagination.hasMore || isUsersLoading}
                  >
                    Next
                    <ChevronRight className='h-4 w-4 ml-1' />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Users',
    href: '/users',
    isActive: true,
    disabled: false,
  },
]