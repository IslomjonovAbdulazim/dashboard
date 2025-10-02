import {
  Command,
  Building2,
  BookOpen,
  GraduationCap,
  Type,
  Users,
  BarChart3,
  CreditCard,
} from 'lucide-react'
import { type SidebarData } from '../types'
import { type Translations } from '@/i18n/translations'

export const getSidebarData = (t: Translations): SidebarData => ({
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: t.nav.teamName,
      logo: Command,
      plan: t.nav.planName,
    },
  ],
  navGroups: [
    {
      title: t.nav.general,
      items: [
        {
          title: t.nav.overview,
          url: '/overview',
          icon: BarChart3,
        },
        {
          title: t.nav.payments,
          url: '/payments',
          icon: CreditCard,
        },
        {
          title: t.nav.learningCenters,
          url: '/learning-centers',
          icon: Building2,
        },
        {
          title: t.nav.contentManagement,
          icon: BookOpen,
          items: [
            {
              title: t.nav.courses,
              url: '/content/courses',
              icon: GraduationCap,
            },
            {
              title: t.nav.lessons,
              url: '/content/lessons',
              icon: BookOpen,
            },
            {
              title: t.nav.words,
              url: '/content/words',
              icon: Type,
            },
          ],
        },
        {
          title: t.nav.userManagement,
          url: '/user-management',
          icon: Users,
        },
      ],
    },
  ],
})

// Keep the old export for backward compatibility, but it will use English by default
export const sidebarData: SidebarData = getSidebarData({
  nav: {
    teamName: 'Zehnly Admin',
    planName: 'Super Admin',
    general: 'General',
    overview: 'Overview',
    payments: 'Payments',
    learningCenters: 'Learning Centers',
    contentManagement: 'Content Management',
    courses: 'Courses',
    lessons: 'Lessons',
    words: 'Words',
    userManagement: 'User Management',
  },
} as any)
