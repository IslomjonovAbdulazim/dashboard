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
import { CalendarIcon, Edit, MoreHorizontal, Trash2, Image, ExternalLink, Eye } from 'lucide-react'
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

import { popupsApi, type Popup } from '@/lib/popups-api'
import useDialogState from '@/hooks/use-dialog-state'

interface PopupsTableProps {
  onEdit: (popup: Popup) => void
}

export function PopupsTable({ onEdit }: PopupsTableProps) {
  const queryClient = useQueryClient()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [deleteDialogOpen, setDeleteDialogOpen] = useDialogState<boolean>(false)
  const [popupToDelete, setPopupToDelete] = useState<Popup | null>(null)

  // Fetch popups
  const {
    data: popups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popups'],
    queryFn: popupsApi.list,
  })

  // Delete popup mutation
  const deleteMutation = useMutation({
    mutationFn: popupsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popups'] })
      toast.success('Popup deleted successfully!')
      setDeleteDialogOpen(false)
      setPopupToDelete(null)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete popup')
    },
  })

  const columns: ColumnDef<Popup>[] = useMemo(
    () => [
      {
        accessorKey: 'imageUrl',
        header: 'Image',
        cell: ({ row }) => {
          const imageUrl = row.getValue('imageUrl') as string
          return (
            <div className='flex items-center gap-2'>
              <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center'>
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Popup" 
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <Image className='h-6 w-6 text-muted-foreground hidden' />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
          const title = row.getValue('title') as string
          return (
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>{title}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
          const description = row.original.description
          return (
            <div className='max-w-xs'>
              <span className='text-sm text-muted-foreground truncate'>
                {description || 'No description'}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => {
          const url = row.original.url
          return (
            <div className='flex items-center gap-2'>
              {url ? (
                <>
                  <ExternalLink className='h-4 w-4 text-muted-foreground' />
                  <a 
                    href={url} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='text-sm text-blue-600 hover:underline truncate max-w-32'
                  >
                    {url}
                  </a>
                </>
              ) : (
                <span className='text-sm text-muted-foreground'>No URL</span>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: 'buttonText',
        header: 'Button Text',
        cell: ({ row }) => {
          const buttonText = row.original.buttonText
          return (
            <span className='text-sm'>
              {buttonText || 'No button text'}
            </span>
          )
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt') as string)
          return (
            <div className='flex items-center gap-2'>
              <CalendarIcon className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
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
          const popup = row.original
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
                {popup.imageUrl && (
                  <DropdownMenuItem
                    onClick={() => window.open(popup.imageUrl, '_blank')}
                  >
                    <Eye className='mr-2 h-4 w-4' />
                    View Image
                  </DropdownMenuItem>
                )}
                {popup.url && (
                  <DropdownMenuItem
                    onClick={() => window.open(popup.url, '_blank')}
                  >
                    <ExternalLink className='mr-2 h-4 w-4' />
                    Open URL
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(popup)}>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setPopupToDelete(popup)
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
    data: popups,
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
    if (popupToDelete) {
      deleteMutation.mutate(popupToDelete._id)
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Image className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Failed to load popups</h3>
          <p className='text-muted-foreground text-center'>
            There was an error loading the popups data.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Popups</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading}
            searchKey='title'
            searchPlaceholder='Search by popup title...'
          />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteDialogOpen}
        onOpenChange={(open) => setDeleteDialogOpen(open ? true : false)}
        handleConfirm={handleDeleteConfirm}
        title='Delete Popup'
        desc={`Are you sure you want to delete the popup "${popupToDelete?.title}"? This action cannot be undone.`}
        confirmText='Delete'
        cancelBtnText='Cancel'
        isLoading={deleteMutation.isPending}
        destructive
      />
    </>
  )
}