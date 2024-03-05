import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Person, Business, AccountCircle, Iso, Calculate, Description, RecordVoiceOver, PersonAdd, PersonRemove, Group, Diversity3, PeopleOutlined } from '@mui/icons-material';
import './sideBar.css'

export const SideBar = ({ roles, sessionName, setSessionName }) => {
    const navigate = useNavigate()
    const listAdmin = [
        {
            name: 'Usuarios',
            route: '/users',
            icon: <Person />
        },
        {
            name: 'Empresas',
            route: '/companies',
            icon: <Business />
        },
        {
            name: 'Clientes',
            route: '/clients',
            icon: <AccountCircle />
        },
        {
            name: 'Promotores',
            route: '/promoters',
            icon: <RecordVoiceOver />
        },
        {
            name: 'Operaciones',
            route: '/operations',
            icon: <Iso />

        },       
        {
            name: 'Facturas',
            route: '/invoices',
            icon: <Description />
        },
        {
            name: 'Proveedores Ingreso',
            route: '/incomeproviders',
            icon: <Group />
        },
        {
            name: 'Proveedores Egreso',
            route: '/outcomeproviders',
            icon: <PeopleOutlined />
        },

        {
            name: 'Calculadora de Comisiones',
            route: '/calccomision',
            icon: <Calculate />
        },
        {
            name: 'Calculadora de Retorno',
            route: '/calcreturn',
            icon: <Calculate />
        },
      

    ]
    const listLink = [
        {
            name: 'Clientes',
            route: '/clients',
            icon: <AccountCircle />
        },
        {
            name: 'Promotores',
            route: '/promoters',
            icon: <RecordVoiceOver />
        }, 
       
        {
            name: 'Mesa de Control',
            route: '/operations',
            icon: <Iso />

        },
             
        {
            name: 'Facturas',
            route: '/invoices',
            icon: <Description />
        },
        {
            name: 'Proveedores Ingreso',
            route: '/incomeproviders',
            icon: <Group />
        },
        {
            name: 'Proveedores Egreso',
            route: '/outcomeproviders',
            icon: <PeopleOutlined />
        },
        {
            name: 'Calculadora de Comisiones',
            route: '/calc',
            icon: <Calculate />
        },
        {
            name: 'Calculadora de Retorno',
            route: '/calcretorno',
            icon: <Calculate />
        },

    ]
    const [list, setList] = useState(listAdmin)

    useEffect(() => {
       
        if (roles?.includes('Admin')) {
            setList(listAdmin)
        } else {
            setList(listLink)
        }
    }, [roles])
    
    return (
        <Box
            component='nav'
            sx={{ width: { sm: 190 }, flexShrink: { sm: 500 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 190, backgroundColor: '#e6e6e6', color: 'black' },

                }}


            >
                <Toolbar
                    style={{ cursor: 'pointer' }}>
                    <div
                        
                        onClick={async() => {
                            navigate(roles === 'Admin' ? '/homeadmin' : '/homelink')
                            await setSessionName(roles.includes('Admin')? 
                            'Catálogo':'Qué quieres hacer')

                        }}

                        className='container_a_a'>
                        <Typography variant='h6' noWrap component='div'
                            sx={
                                { color: 'gray' }
                            }>
                            MBControl
                        </Typography>
                    </div>
                </Toolbar>
                <Divider />
                <List >
                    {
                        list.map((text,index) => (
                            <div key={index} onClick={() => {
                                navigate(text?.route)
                                setSessionName(text.name)
                            }}
                            >
                                <ListItem key={text?.name} disablePadding sx={sessionName === text.name ? { backgroundColor: 'white' }:undefined}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {text?.icon}
                                        </ListItemIcon>
                                        <Grid container>


                                            <ListItemText

                                                sx={{
                                                    color: 'gray'
                                                }}
                                                primary={text?.name} />

                                        </Grid>
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))

                    }



                </List>

            </Drawer>
        </Box>

    )
}



