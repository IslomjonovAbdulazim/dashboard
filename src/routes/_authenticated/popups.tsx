import { createFileRoute } from '@tanstack/react-router'
import { Popups } from '@/features/popups'

export const Route = createFileRoute('/_authenticated/popups')({
  component: () => <Popups />,
})