import { useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { CalendarIcon, Copy, Edit, MoreHorizontal, Trash2, Tag, Users, Percent, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { ConfirmDialog } from '@/components/confirm-dialog'

import { couponsApi, type Coupon } from '@/lib/coupons-api'
import useDialogState from '@/hooks/use-dialog-state'

interface CouponsTableProps {
  onEdit: (coupon: Coupon) => void
}

export function CouponsTable({ onEdit }: CouponsTableProps) {
  const queryClient = useQueryClient()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [deleteDialogOpen, setDeleteDialogOpen] = useDialogState<boolean>(false)
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null)

  // Fetch coupons
  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: couponsApi.list,
  })

  // Delete coupon mutation
  const deleteMutation = useMutation({
    mutationFn: couponsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
      toast.success('Coupon deleted successfully!')
      setDeleteDialogOpen(false)
      setCouponToDelete(null)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete coupon')
    },
  })

  const columns: ColumnDef<Coupon>[] = useMemo(
    () => [
      {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => {
          const code = row.getValue('code') as string
          return (
            <div className='flex items-center gap-2'>
              <Tag className='h-4 w-4 text-muted-foreground' />
              <span className='font-mono font-medium'>{code}</span>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={() => {
                  navigator.clipboard.writeText(code)
                  toast.success('Code copied to clipboard!')
                }}
              >
                <Copy className='h-3 w-3' />
              </Button>
            </div>
          )
        },
      },
      {
        accessorKey: 'user.fullName',
        header: 'User',
        cell: ({ row }) => {
          const user = row.original.user
          return (
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>{user.fullName}</span>
              <span className='text-sm text-muted-foreground'>{user.email}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'userDiscount',
        header: 'User Discount',
        cell: ({ row }) => {
          const discount = row.original.userDiscount
          const icon = discount.type === 'percentage' ? Percent : DollarSign
          const IconComponent = icon
          return (
            <div className='flex items-center gap-2'>
              <IconComponent className='h-4 w-4 text-green-600' />
              <span className='font-medium'>
                {discount.value}
                {discount.type === 'percentage' ? '%' : 'UZS'}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'userCommission',
        header: 'Commission',
        cell: ({ row }) => {
          const commission = row.original.userCommission
          const icon = commission.type === 'percentage' ? Percent : DollarSign
          const IconComponent = icon
          return (
            <div className='flex items-center gap-2'>
              <IconComponent className='h-4 w-4 text-blue-600' />
              <span className='font-medium'>
                {commission.value}
                {commission.type === 'percentage' ? '%' : 'UZS'}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'usageCount',
        header: 'Usage',
        cell: ({ row }) => {
          const coupon = row.original
          const usagePercent = (coupon.usageCount / coupon.maxUsage) * 100
          return (
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>
                {coupon.usageCount} / {coupon.maxUsage}
              </span>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full'
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'applicableSubscriptions',
        header: 'Subscriptions',
        cell: ({ row }) => {
          const subscriptions = row.original.applicableSubscriptions
          return (
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>{subscriptions.length} plans</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'expirationDate',
        header: 'Expires',
        cell: ({ row }) => {
          const date = new Date(row.getValue('expirationDate') as string)
          const isExpired = date < new Date()
          return (
            <div className='flex items-center gap-2'>
              <CalendarIcon className='h-4 w-4 text-muted-foreground' />
              <span className={isExpired ? 'text-red-600' : ''}>
                {format(date, 'MMM dd, yyyy')}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
          const isActive = row.getValue('isActive') as boolean
          return (
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const coupon = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.code)
                    toast.success('Coupon code copied!')
                  }}
                >
                  <Copy className='mr-2 h-4 w-4' />
                  Copy code
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(coupon)}>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCouponToDelete(coupon)
                    setDeleteDialogOpen(true)
                  }}
                  className='text-red-600'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [onEdit, setDeleteDialogOpen]
  )

  const table = useReactTable({
    data: coupons,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleDeleteConfirm = () => {
    if (couponToDelete) {
      deleteMutation.mutate(couponToDelete._id)
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Tag className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Failed to load coupons</h3>
          <p className='text-muted-foreground text-center'>
            There was an error loading the coupons data.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading}
            searchKey='code'
            searchPlaceholder='Search by coupon code...'
          />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteDialogOpen}
        onOpenChange={(open) => setDeleteDialogOpen(open ? true : false)}
        handleConfirm={handleDeleteConfirm}
        title='Delete Coupon'
        desc={`Are you sure you want to delete the coupon "${couponToDelete?.code}"? This action cannot be undone.`}
        confirmText='Delete'
        cancelBtnText='Cancel'
        isLoading={deleteMutation.isPending}
        destructive
      />
    </>
  )
}