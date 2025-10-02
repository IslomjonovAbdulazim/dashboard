import { useLayout } from '@/context/layout-provider'
import { useTranslation } from '@/context/translation-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { getSidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { t } = useTranslation()
  const sidebarData = getSidebarData(t)
  
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        {/* Team switcher widget removed as requested */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {/* User widget removed as requested */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
