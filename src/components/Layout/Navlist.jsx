import React, { useState, memo } from 'react'
import { SIDE_PANEL } from '@/utils/UI'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import { styled } from '@mui/system'

const CustomAccordian = styled(Accordion)(({ theme }) => ({
  backgroundImage: 'none',
  boxShadow: 'none',
  backgroundColor: theme.palette.background.alt,
  '&.Mui-expanded': {
    margin: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root.MuiAccordionSummary-root:hover ': {
    backgroundColor: theme.palette.primary.hover,
    color: theme.palette.primary.main,
  },
}))

const CustomList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  cursor: 'pointer',
  '&.Mui-expanded': {
    margin: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiListItem-root:hover': {
    backgroundColor: theme.palette.primary.hover,
    color: theme.palette.primary.main,
  },
}))

const CustomListItem = styled(ListItem)(({ theme, active, sublink }) => ({
  ...(active === 'true' && {
    color: theme.palette.primary.main,
  }),
  ...(active === 'true' &&
    sublink !== 'true' && {
      backgroundColor: theme.palette.primary.hover,
    }),
}))

const CustomAccordionSummary = styled(AccordionSummary)(({ theme, active }) => ({
  ...(active === 'true' && {
    backgroundColor: theme.palette.primary.hover,
    color: theme.palette.primary.main,
  }),
}))

const CustomListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontWeight: 'unset', // fontweight added in parent component ( <Drawer/>)
  },
})

function Navlist() {
  const location = useLocation()
  const [expanded, setExpanded] = useState(false)
  let navigate = useNavigate()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <CustomList>
      {SIDE_PANEL.map((data, index) => (
        <React.Fragment key={`${index}`}>
          {data.type === 'single' ? (
            <CustomListItem
              onClick={() => navigate(data.path)}
              active={location.pathname === data.path ? 'true' : 'false'}
            >
              <CustomListItemText primary={data.label} />
            </CustomListItem>
          ) : (
            <CustomAccordian expanded={expanded === `${data.path}`} onChange={handleChange(`${data.path}`)}>
              <CustomAccordionSummary
                active={location.pathname.split('/')[1] === data.path ? 'true' : 'false'}
                expandIcon={<ExpandMoreIcon />}
              >
                {data.label}
              </CustomAccordionSummary>

              <AccordionDetails>
                <div className='subLinks'>
                  {data.subLinks.map((d, i) => (
                    <CustomListItem
                      key={d.path}
                      onClick={() => navigate(d.path)}
                      active={location.pathname === d.path ? 'true' : 'false'}
                      sublink={'true'}
                    >
                      <CustomListItemText primary={d.label} />
                    </CustomListItem>
                  ))}
                </div>
              </AccordionDetails>
            </CustomAccordian>
          )}
        </React.Fragment>
      ))}
    </CustomList>
  )
}

export default memo(Navlist)
