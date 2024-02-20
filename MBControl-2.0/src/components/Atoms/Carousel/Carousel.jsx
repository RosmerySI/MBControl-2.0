import React, { useEffect, useState } from 'react'
import { petitions } from '../../../services/api/petitions'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import enlaces from '../../../assets/images/usuario.png'
import './carousel.css'

export const LinkCarousel = () => {

    let enlacesObject = [
        {userName:'Jane',
         email:'correo@correo.com',         
         roles:'Admin'   
        },
        {userName:'Jon',
         userEmail:'correo@correo.com',         
         roles:'Enlace'   
        },
    ]

    const [links, setLinks] = useState()

    const { getObject} = petitions();

    useEffect(() => {
        getObject('user',setLinks)       
    }, []);    
   
    let linksObject = []
    
    links?.forEach(item => {
        if(item.userName!==null&&!item.roles.includes('Admin')){
        
        let element =
            {              
              userName:item.userName,
              userEmail:item.email,
              userRoles:item.roles[0]
            }
            linksObject.push(element)
        }
    });

    return (
        <div className='enlacesContainer'>
            <div>
                <span>RESUMEN ENLACES</span>
            </div>            
            <Carousel autoPlay={false} className='carouselContainer'
            sx={{
                '& .css-ktslay-MuiButtonBase-root-MuiIconButton-root::hover':{color:'red'}
            }}
            >
                {
                    linksObject.map((item) =>                       
                    < Paper className='paper' key={item.email}>                                                    
                        <h3>{item.roles}</h3>                         
                        <img className='imageCarousel' src={enlaces} alt='enlaces'></img>                            
                        <h3>{item.userName}</h3>                           
                    </Paper>                       
                    )
                }
                </Carousel>
           

        </div>
    )
}
