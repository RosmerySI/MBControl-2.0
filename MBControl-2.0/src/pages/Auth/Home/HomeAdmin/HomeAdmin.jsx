import React from 'react'
import { Operations } from '../../../../components/Atoms/Operations/operations/Operations'
import './homeAdmin.CSS'
import {LinkCarousel } from '../../../../components/Atoms/Carousel/Carousel'

export const HomeAdmin = () => {
  return (
    <div className='homeAdmin'>
      <div className='homeAdminContainer'>
      <Operations/>
      <LinkCarousel/>
      <div className='buttonHomeAdminContainer'>
      <button>REPORTE</button>
      </div>
      </div>
      
    </div>
  )
}
