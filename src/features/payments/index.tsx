import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { analyticsApi, type Order } from '@/lib/analytics-api'
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

export function Payments() {
  const [dateRange, setDateRange] = useState<DateRange>(() => ({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  }))
  const [orderStatus, setOrderStatus] = useState<string>('all')
  const [revenueCat, setRevenueCat] = useState<boolean>(false)
  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false)
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false)
  const [ordersPage, setOrdersPage] = useState(0)
  const [ordersLimit] = useState(10)

  const formattedStartDate = format(dateRange.from, 'yyyy-MM-dd')
  const formattedEndDate = format(dateRange.to, 'yyyy-MM-dd')


  // Fetch orders data
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders', orderStatus, revenueCat, formattedStartDate, formattedEndDate, ordersPage, ordersLimit],
    queryFn: () => analyticsApi.getOrders({
      status: orderStatus === 'all' ? undefined : orderStatus,
      revenueCat: revenueCat,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      limit: ordersLimit,
      skip: ordersPage * ordersLimit,
    }),
  })


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'CANCELED':
      case 'EXPIRED':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'TIMEOUT':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'default'
      case 'PENDING':
        return 'secondary'
      case 'CANCELED':
      case 'EXPIRED':
        return 'destructive'
      case 'TIMEOUT':
        return 'outline'
      default:
        return 'outline'
    }
  }


  const handleRefresh = () => {
    refetchOrders()
  }

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    setOrdersPage(0) // Reset orders pagination
  }


  const handleOrdersPreviousPage = () => {
    setOrdersPage(prev => Math.max(0, prev - 1))
  }

  const handleOrdersNextPage = () => {
    if (ordersData?.data.pagination?.hasMore) {
      setOrdersPage(prev => prev + 1)
    }
  }

  const getOrderDisplayName = (order: Order) => {
    if (order.fullName) return order.fullName
    if (order.firstName) return order.firstName
    if (order.displayName) return order.displayName
    if (order.email) return order.email.split('@')[0]
    if (order.phone) return order.phone
    return `Order ${order.orderId?.slice(-6) || 'Unknown'}`
  }

  const handleOrderStatusChange = (status: string) => {
    setOrderStatus(status)
    setOrdersPage(0) // Reset pagination when status changes
  }

  const handleRevenueCatChange = (checked: boolean) => {
    setRevenueCat(checked)
    setOrdersPage(0) // Reset pagination when RevenueCat filter changes
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
              Payments & Subscriptions
            </h1>
            <p className='text-muted-foreground text-lg'>
              Monitor premium subscriptions and payment transactions
            </p>
          </div>
          
          <div className='flex items-center space-x-3'>
            <Popover open={startDatePickerOpen} onOpenChange={setStartDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[140px] justify-start text-left font-normal',
                    !dateRange.from && 'text-muted-foreground'
                  )}
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {dateRange.from ? (
                    format(dateRange.from, 'MMM dd, y')
                  ) : (
                    'Start date'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  initialFocus
                  mode='single'
                  defaultMonth={dateRange?.from}
                  selected={dateRange.from}
                  onSelect={(date) => {
                    if (date) {
                      handleDateRangeChange({ from: date, to: dateRange.to })
                      setStartDatePickerOpen(false)
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            
            <Popover open={endDatePickerOpen} onOpenChange={setEndDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[140px] justify-start text-left font-normal',
                    !dateRange.to && 'text-muted-foreground'
                  )}
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {dateRange.to ? (
                    format(dateRange.to, 'MMM dd, y')
                  ) : (
                    'End date'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  initialFocus
                  mode='single'
                  defaultMonth={dateRange?.to}
                  selected={dateRange.to}
                  onSelect={(date) => {
                    if (date) {
                      handleDateRangeChange({ from: dateRange.from, to: date })
                      setEndDatePickerOpen(false)
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            
            <Button
              onClick={handleRefresh}
              variant='outline'
              disabled={isOrdersLoading}
            >
              {isOrdersLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Revenue Summary */}
        {ordersData?.data.summary && (
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-5 mb-6'>
            <div className='text-center p-4 bg-muted/50 rounded-lg'>
              <DollarSign className='h-5 w-5 mx-auto mb-2 text-green-500' />
              <div className='font-medium text-sm'>Total Revenue</div>
              <div className='text-xl font-bold text-green-600'>
                {formatCurrency(ordersData.data.summary.totalRevenue)}
              </div>
            </div>
            <div className='text-center p-4 bg-muted/50 rounded-lg'>
              <TrendingUp className='h-5 w-5 mx-auto mb-2 text-blue-500' />
              <div className='font-medium text-sm'>Avg Order</div>
              <div className='text-xl font-bold text-blue-600'>
                {formatCurrency(ordersData.data.summary.averageOrderValue)}
              </div>
            </div>
            <div className='text-center p-4 bg-muted/50 rounded-lg'>
              <CheckCircle className='h-5 w-5 mx-auto mb-2 text-green-500' />
              <div className='font-medium text-sm'>Paid</div>
              <div className='text-xl font-bold'>
                {ordersData.data.summary.statusBreakdown.PAID || 0}
              </div>
            </div>
            <div className='text-center p-4 bg-muted/50 rounded-lg'>
              <Clock className='h-5 w-5 mx-auto mb-2 text-yellow-500' />
              <div className='font-medium text-sm'>Pending</div>
              <div className='text-xl font-bold'>
                {ordersData.data.summary.statusBreakdown.PENDING || 0}
              </div>
            </div>
            <div className='text-center p-4 bg-muted/50 rounded-lg'>
              <XCircle className='h-5 w-5 mx-auto mb-2 text-red-500' />
              <div className='font-medium text-sm'>Failed</div>
              <div className='text-xl font-bold'>
                {(ordersData.data.summary.statusBreakdown.CANCELED || 0) + 
                 (ordersData.data.summary.statusBreakdown.EXPIRED || 0) + 
                 (ordersData.data.summary.statusBreakdown.TIMEOUT || 0)}
              </div>
            </div>
          </div>
        )}


        {/* Orders Section */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-4'>
              <CardTitle className='flex items-center gap-2'>
                <CreditCard className='h-5 w-5' />
                Payment Orders
              </CardTitle>
              {ordersData?.data.total && (
                <div className='text-sm text-muted-foreground'>
                  {ordersData.data.total} total orders
                </div>
              )}
            </div>
            <div className='flex items-center gap-3'>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='revenue-cat'
                  checked={revenueCat}
                  onCheckedChange={handleRevenueCatChange}
                />
                <Label htmlFor='revenue-cat' className='text-sm'>
                  RevenueCat
                </Label>
              </div>
              <Select value={orderStatus} onValueChange={handleOrderStatusChange}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Orders</SelectItem>
                  <SelectItem value='PENDING'>Pending</SelectItem>
                  <SelectItem value='PAID'>Paid</SelectItem>
                  <SelectItem value='CANCELED'>Canceled</SelectItem>
                  <SelectItem value='TIMEOUT'>Timeout</SelectItem>
                  <SelectItem value='EXPIRED'>Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isOrdersLoading ? (
              <div className='space-y-3'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='flex items-center space-x-4 p-3'>
                    <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-32 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-20 bg-muted animate-pulse rounded' />
                    <div className='h-4 w-16 bg-muted animate-pulse rounded' />
                  </div>
                ))}
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordersData?.data.orders?.map((order) => (
                      <TableRow key={order.orderId || order._id || Math.random()}>
                        <TableCell className='font-mono text-xs'>
                          {order.orderId?.slice(-8) || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                              {getOrderDisplayName(order)[0].toUpperCase()}
                            </div>
                            <div>
                              <p className='font-medium text-sm'>{getOrderDisplayName(order)}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.email ? (
                            <div className='flex items-center gap-1'>
                              <Mail className='h-3 w-3' />
                              <span className='text-sm'>{order.email}</span>
                            </div>
                          ) : order.phone ? (
                            <div className='flex items-center gap-1'>
                              <Phone className='h-3 w-3' />
                              <span className='text-sm'>{order.phone}</span>
                            </div>
                          ) : (
                            <span className='text-muted-foreground text-sm'>No contact</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className='space-y-1'>
                            <div className='font-medium'>{formatCurrency(order.amount)}</div>
                            {order.discountAmount > 0 && (
                              <div className='text-xs text-green-600'>
                                -{formatCurrency(order.discountAmount)} discount
                              </div>
                            )}
                            {order.paidAmount !== order.amount && (
                              <div className='text-xs text-blue-600'>
                                Paid: {formatCurrency(order.paidAmount)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={getStatusBadgeVariant(order.status)}
                            className='flex items-center gap-1 w-fit'
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{order.provider}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className='text-sm'>{order.subscription}</span>
                        </TableCell>
                        <TableCell className='text-sm'>
                          {format(new Date(order.date), 'MMM dd, HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {ordersData?.data.orders?.length === 0 && (
                  <div className='text-center py-8 text-muted-foreground'>
                    <CreditCard className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>No orders found for the selected criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Orders Pagination Controls */}
            {ordersData?.data.pagination && ordersData.data.total > ordersLimit && (
              <div className='flex items-center justify-between pt-4 border-t'>
                <div className='text-sm text-muted-foreground'>
                  Showing {ordersPage * ordersLimit + 1}-{Math.min((ordersPage + 1) * ordersLimit, ordersData.data.total)} of {ordersData.data.total} orders
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleOrdersPreviousPage}
                    disabled={ordersPage === 0 || isOrdersLoading}
                  >
                    <ChevronLeft className='h-4 w-4 mr-1' />
                    Previous
                  </Button>
                  <span className='text-sm text-muted-foreground'>
                    Page {ordersPage + 1} of {Math.ceil(ordersData.data.total / ordersLimit)}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleOrdersNextPage}
                    disabled={!ordersData.data.pagination.hasMore || isOrdersLoading}
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
    title: 'Payments',
    href: '/payments',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Revenue Analytics',
    href: '/payments/revenue',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Subscription Plans',
    href: '/payments/plans',
    isActive: false,
    disabled: true,
  },
]