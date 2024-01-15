import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import enlaces from '../../../assets/images/usuario.png'
import './carousel.css'
export const LinkCarousel = () => {

    let enlacesObject = [
        {userName:'Jane',
         userEmail:'correo@correo.com',         
         userRole:'Admin'   
        },
        {userName:'Jon',
         userEmail:'correo@correo.com',         
         userRole:'Enlace'   
        },
    ]

    return (
        <div className='enlacesContainer'>
            <div>
                <span>RESUMEN ENLACES</span>
            </div>            
            <Carousel autoPlay={false} className='carouselContainer'
            sx={{
                '& .css-ktslay-MuiButtonBase-root-MuiIconButton-root::hoover':{color:'red'}
            }}
            >
                {
                    enlacesObject.map((item, index) =>                       
                    < Paper className='paper'>                                  
                        <h3>{item.userRole}</h3>                         
                        <img className='imageCarousel' src={enlaces} ></img>                            
                        <h3>{item.userName}</h3>                           
                    </Paper>                       
                    )
                }
                </Carousel>
           

        </div>
    )
}
