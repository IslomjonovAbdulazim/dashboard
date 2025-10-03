import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { couponsApi, type CreateCouponRequest } from '@/lib/coupons-api'
import { couponSchema, type CouponFormData } from '../data/schema'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CreateCouponDialogProps {
  children?: React.ReactNode
}

export function CreateCouponDialog({ children }: CreateCouponDialogProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: '',
      userCommissionValue: 0,
      userCommissionType: 'percentage',
      userDiscountValue: 0,
      userDiscountType: 'percentage',
      applicableSubscriptions: [],
      expirationDate: '',
      isActive: true,
      maxUsage: 100,
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateCouponRequest) => couponsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
      toast.success('Coupon created successfully!')
      setIsOpen(false)
      form.reset()
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Failed to create coupon'
      toast.error(errorMessage)
    },
  })

  const onSubmit = (data: CouponFormData) => {
    const requestData: CreateCouponRequest = {
      code: data.code,
      userCommissionValue: data.userCommissionValue,
      userCommissionType: data.userCommissionType,
      userDiscountValue: data.userDiscountValue,
      userDiscountType: data.userDiscountType,
      applicableSubscriptions: data.applicableSubscriptions,
      expirationDate: data.expirationDate,
      isActive: data.isActive,
      maxUsage: data.maxUsage,
    }
    createMutation.mutate(requestData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Create Coupon
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
          <DialogDescription>
            Create a new coupon with discount and commission settings.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder='SUMMER2025' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='maxUsage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Usage</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='100'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <h4 className='text-sm font-medium'>User Discount</h4>
                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='userDiscountValue'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='25'
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='userDiscountType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='percentage'>Percentage</SelectItem>
                            <SelectItem value='fixed'>Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <h4 className='text-sm font-medium'>User Commission</h4>
                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='userCommissionValue'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='10'
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='userCommissionType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='percentage'>Percentage</SelectItem>
                            <SelectItem value='fixed'>Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name='expirationDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString())
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Active Status</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating...' : 'Create Coupon'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}