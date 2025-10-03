import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Upload, X, Image as ImageIcon } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

import { popupsApi, type CreatePopupRequest } from '@/lib/popups-api'
import { popupSchema, type PopupFormData } from '../data/schema'

interface CreatePopupDialogProps {
  children?: React.ReactNode
}

export function CreatePopupDialog({ children }: CreatePopupDialogProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<PopupFormData>({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      url: '',
      description: '',
      buttonText: '',
      isActive: true,
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreatePopupRequest) => popupsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popups'] })
      toast.success('Popup created successfully!')
      setIsOpen(false)
      form.reset()
      setSelectedFile(null)
      setPreviewUrl('')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Failed to create popup'
      toast.error(errorMessage)
    },
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        toast.error('Please select a valid image file (JPG, PNG, WEBP)')
        return
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }

      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) {
      throw new Error('No file selected')
    }

    setIsUploading(true)
    try {
      const imageUrl = await popupsApi.uploadImage(selectedFile)
      return imageUrl
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: PopupFormData) => {
    try {
      let imageUrl = data.imageUrl

      // Upload image if a file is selected
      if (selectedFile) {
        imageUrl = await uploadImage()
      }

      if (!imageUrl) {
        toast.error('Please select an image')
        return
      }

      const requestData: CreatePopupRequest = {
        title: data.title,
        imageUrl,
        url: data.url || undefined,
        description: data.description || undefined,
        buttonText: data.buttonText || undefined,
        isActive: data.isActive,
      }

      createMutation.mutate(requestData)
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image')
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    form.setValue('imageUrl', '')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Create Popup
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create New Popup</DialogTitle>
          <DialogDescription>
            Create a new popup with image and content settings.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Summer Sale 2025' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className='space-y-4'>
                      {/* File Upload */}
                      <div className='flex items-center gap-4'>
                        <Input
                          type='file'
                          accept='image/jpeg,image/jpg,image/png,image/webp'
                          onChange={handleFileSelect}
                          className='flex-1'
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                        >
                          <Upload className='h-4 w-4' />
                        </Button>
                      </div>

                      {/* Direct URL Input */}
                      <div className='text-sm text-muted-foreground text-center'>or</div>
                      <Input
                        placeholder='https://example.com/image.jpg'
                        {...field}
                        disabled={!!selectedFile}
                      />

                      {/* Image Preview */}
                      {(previewUrl || field.value) && (
                        <div className='relative'>
                          <div className='w-full h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center'>
                            <img
                              src={previewUrl || field.value}
                              alt='Preview'
                              className='w-full h-full object-cover'
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                            <ImageIcon className='h-8 w-8 text-muted-foreground hidden' />
                          </div>
                          <Button
                            type='button'
                            variant='destructive'
                            size='icon'
                            className='absolute top-2 right-2 h-6 w-6'
                            onClick={removeImage}
                          >
                            <X className='h-3 w-3' />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Get 50% off on all premium plans!'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com/sale' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='buttonText'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder='Shop Now' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Active Status</FormLabel>
                    <div className='text-sm text-muted-foreground'>
                      Enable this popup to show it to users
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
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
              <Button 
                type='submit' 
                disabled={createMutation.isPending || isUploading}
              >
                {createMutation.isPending || isUploading ? 'Creating...' : 'Create Popup'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}