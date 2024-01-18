import React from 'react'
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
                    enlacesObject.map((item) =>                       
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
