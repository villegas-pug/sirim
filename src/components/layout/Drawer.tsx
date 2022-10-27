import { FC, ReactElement, Suspense, useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
   Button,
   Grid,
   Menu,
   MenuItem,
   Tab,
   Tabs,
   Box,
   Drawer as MuiDrawer,
   CssBaseline,
   Toolbar,
   List,
   Typography,
   Divider,
   IconButton,
   ListItem,
   ListItemIcon,
   ListItemText,
   Avatar
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
   Business,
   ExitToApp,
   LocationCity,
   Work
} from '@mui/icons-material'
import Fade from 'react-reveal/Fade'
import { styled, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import { DrawerTitle, ModalLoader } from 'components'

import { useAuth, useBreakpoints } from 'hooks'

import { elementIcons, layout } from 'constants/'
import { Modulo } from 'types'

const drawerWidth = 150

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
   flexGrow: 1,
   padding: theme.spacing(3),
   transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   marginLeft: `-${drawerWidth}px`,
   ...(open && {
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
   })
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(({ theme, open }) => ({
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen
      })
   })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end'
}))

const TabsHeader = styled(Tabs)({
   width: 400
})

type Props = {
   children: ReactElement
}

export const Drawer: FC<Props> = ({ children }) => {
   const theme = useTheme()
   const [open, setOpen] = useState(true)

   const [selectedItemDrawer, setSelectedItemDrawer] = useState(0)
   const [anchorEl, setAnchorEl] = useState(null)
   const [selectedTab, setSelectedTab] = useState<Modulo>('HOME')
   const navigate = useNavigate()

   /* » CUSTOM HOOK'S ...  */
   const {
      isAuthenticated,
      modAuthenticated,
      userCredentials,
      logout
   } = useAuth()
   const { currentScreen } = useBreakpoints()

   /* » EFFECT'S ... */
   useEffect(() => { setSelectedTab('HOME') }, [isAuthenticated])
   useEffect(() => { selectedTab.length > 0 && setSelectedItemDrawer(-1) }, [selectedTab])
   useEffect(() => { selectedItemDrawer > 0 && setSelectedTab('') }, [selectedItemDrawer])

   /* » HANDLER'S ... */
   const handleDrawerOpen = () => { setOpen(true) }
   const handleDrawerClose = () => { setOpen(false) }

   const handleOnClickOptSidebar = (path: string, iItemDrawer: number) => (navigate(path), setSelectedItemDrawer(iItemDrawer))
   const handleTabs = (rutaPrincipal: string, value: Modulo) => (setSelectedTab(value), navigate(rutaPrincipal))

   const handleOpenMenu = (e: any) => { setAnchorEl(e.currentTarget) }
   const handleCloseMenu = () => { setAnchorEl(null) }
   const handleRootLogout = () => (handleCloseMenu(), logout())

   return (
      <Fade duration={ 1500 } delay={ 250 } top>
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
               <Toolbar>

                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     onClick={handleDrawerOpen}
                     edge="start"
                     sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                     <MenuIcon />
                  </IconButton>

                  <TabsHeader value={ selectedTab } variant='scrollable'>
                     {
                        modAuthenticated
                           .filter(({ disposicion }) => disposicion === layout.APP_BAR)
                           .map(({ idProcedimiento, nombre, icono, rutaPrincipal }) => (
                              <Tab
                                 key={ idProcedimiento }
                                 value={ nombre }
                                 icon={ elementIcons[icono] }
                                 onClick={ () => handleTabs(rutaPrincipal, nombre as Modulo) }
                              />
                           ))
                     }
                  </TabsHeader>

                  <Box display='flex' width='65%' marginLeft='auto' justifyContent='space-between' alignItems='center'>

                     <Grid container style={{ width: '12rem' }}>
                        <Grid item xs={ 2 } alignItems='stretch'>
                           <Business fontSize='small' style={{ marginTop: 5 }} />
                        </Grid>
                        <Grid item xs={ 10 } display={ currentScreen === 'mobileLandscape' ? 'none' : '' }>
                           <Typography variant='h4'>
                           UNIDAD ORGÁNICA <Typography variant='h5'>{ userCredentials?.area || '' }</Typography>
                           </Typography>
                        </Grid>
                     </Grid>

                     <Grid container style={{ width: '12rem' }}>
                        <Grid item xs={2} alignItems='stretch'>
                           <Work fontSize='small' style={{ marginTop: 5 }} />
                        </Grid>
                        <Grid item xs={10} display={ currentScreen === 'mobileLandscape' ? 'none' : '' }>
                           <Typography variant='h4'>
                           CARGO <Typography variant='h5'>{userCredentials?.cargo || ''}</Typography>
                           </Typography>
                        </Grid>
                     </Grid>

                     <Grid container style={{ width: '12rem' }}>
                        <Grid item xs={ 2 } alignItems='stretch'>
                           <LocationCity fontSize='small' style={{ marginTop: 5 }} />
                        </Grid>
                        <Grid item xs={ 10 } display={ currentScreen === 'mobileLandscape' ? 'none' : '' }>
                           <Typography variant='h4'>
                           DEPENDENCIA <Typography variant='h5' >{ userCredentials?.dependencia }</Typography>
                           </Typography>
                        </Grid>
                     </Grid>

                     <Box>
                        <Button
                           id='user-account'
                           sx={{ color: '#fff' }}
                           aria-controls='menu-account'
                           aria-haspopup={ true }
                           onClick={ handleOpenMenu }
                           startIcon={
                              <Avatar
                                 alt={ userCredentials.nombres }
                                 src={ userCredentials.foto }
                                 sx={{ width: 50, height: 50 }}
                              />
                           }
                        >
                           <Typography
                              variant='h4'
                              display={ currentScreen === 'mobileLandscape' ? 'none' : '' }
                           >
                              { userCredentials?.nombres || ''}
                           </Typography>
                        </Button>

                        <Menu
                           keepMounted
                           id='menu-account'
                           anchorEl={anchorEl}
                           open={!!anchorEl}
                           onClose={handleCloseMenu}
                        >
                           <MenuItem onClick={handleRootLogout}>
                              <ExitToApp />
                              <Typography variant='h4'>Cerrar sesión</Typography>
                           </MenuItem>
                        </Menu>
                     </Box>
                  </Box>

               </Toolbar>

            </AppBar>

            <MuiDrawer
               sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                     width: drawerWidth,
                     boxSizing: 'border-box'
                  },
                  height: '100vh'
               }}
               variant="persistent"
               anchor="left"
               open={ open }
            >
               <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                     {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
               </DrawerHeader>
               <Divider />
               <List>
                  {
                     modAuthenticated
                        .filter(({ disposicion }) => disposicion === layout.SIDE_BAR)
                        .map(({ idProcedimiento, nombre, informacion, icono, rutaPrincipal }) => (
                           <>
                              <Divider />
                              <ListItem
                                 button
                                 selected={ selectedItemDrawer === idProcedimiento }
                                 key={ idProcedimiento }
                                 onClick={ () => { handleOnClickOptSidebar(rutaPrincipal, idProcedimiento) } }
                              >
                                 <ListItemIcon sx={{ minWidth: 0 }}>{ elementIcons[icono] }</ListItemIcon>
                                 <ListItemText>
                                    <DrawerTitle title={ nombre } size={0.75} />
                                 </ListItemText>
                              </ListItem>
                           </>
                        ))
                  }
               </List>
            </MuiDrawer>
            <Main open={open}>
               {/* <Scrollbars autoHide> */}
               <DrawerHeader />
               <Suspense fallback={<ModalLoader />}>
                  { children }
               </Suspense>
               {/* </Scrollbars> */}
            </Main>
         </Box>
      </Fade>
   )
}
