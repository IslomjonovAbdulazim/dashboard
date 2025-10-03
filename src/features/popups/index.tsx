import { useState } from 'react'

import { CreatePopupDialog } from './components/create-popup-dialog'
import { EditPopupDialog } from './components/edit-popup-dialog'
import { PopupsTable } from './components/popups-table'
import { type Popup } from '@/lib/popups-api'

export function Popups() {
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup)
    setIsEditDialogOpen(true)
  }

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false)
    setEditingPopup(null)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Popups</h1>
          <p className='text-muted-foreground'>
            Manage promotional popups and announcements for your users.
          </p>
        </div>
        <CreatePopupDialog />
      </div>

      <PopupsTable onEdit={handleEdit} />

      <EditPopupDialog
        popup={editingPopup}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
      />
    </div>
  )
}