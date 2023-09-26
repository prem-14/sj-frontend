import { SIDE_PANEL } from '@/utils/UI'

const permissions = []

SIDE_PANEL.forEach((data) => {
  if (!data.exemptedRoute) {
    if (data.type === 'single') {
      permissions.push({
        id: data.path,
        description: data.label,
      })
    } else if (data.type === 'multiple') {
      data.subLinks.forEach((dt) => {
        permissions.push({
          id: dt.path,
          description: `${dt.label} ${data.label}`,
        })
      })
    }
  }
})

export { permissions }
