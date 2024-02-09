import React, { useEffect, useState } from 'react'
import { Box, Button, ListItemText, MenuItem, Modal, TextField } from '@mui/material'
import { DateRangePicker } from 'react-date-range'
import { addDays,subDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../../../pages/Auth/Home/home.css'
import { petitions } from '../../../services/api/petitions'
import { modalError } from '../../../utilities/modals/modals'
import { useNavigate } from 'react-router-dom'

export const ReportModal = () => {

    const [links, setLinks] = useState();
    const [selectedLink, setSelectedLink] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {getObject}=petitions()

    useEffect(() => {
      getObject('user',setLinks)
    }, [])
    let linksObject=[]
    if(links){
        links?.forEach(element => {
            let filterLinks
            if(element.roles!==null){
                filterLinks={
                    id:element.email,
                    name:element.userName
                }
                linksObject.push(filterLinks)
            }
            
        });
    }
    
    const handleLinksChange = (event) => {
        setSelectedLink({
          ...selectedLink,
          [event.target.name]:event.target.value
        });
    }

    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(),0 ),
          key: 'selection'
        }
      ])
      
    let subDay=subDays(range[0]?.startDate,1)
    let addDay=addDays(range[0]?.endDate,1)

    const navigate=useNavigate()

    const handleSubmit = () =>{
        if (range!==null&&selectedLink!==''&&selectedLink!==undefined) {      
            const dataReporte = {
                email: selectedLink.id,       
                startDate:subDay.toISOString(),
                endDate:addDay.toISOString(),        
            }      
            navigate(`/operations/?email=${dataReporte.email}&startDate=${dataReporte.startDate}&endDate=${dataReporte.endDate}`)
        } else {
            setOpen(false)
            modalError('Debes elegir un enlace y escoger un rango de fecha ',)
        }
    }
      
    return (
    <div className='buttonHomeContainer'>
        <button className='button' onClick={handleOpen}>REPORTE</button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)',
                width:950,height:500,bgcolor:'background.paper',borderRadius:'20px',boxShadow:24,
                p:4,}}>
                <div >
                  <TextField
                    label='Enlaces'                    
                    select
                    variant="standard"
                    name='selectedLink'
                    value={selectedLink}
                    onChange={handleLinksChange}
                    sx={{
                      width: { sm: 250 },
                      alignContent: 'space-between',
                      boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      marginBottom: '10px'                    
                    }}
                    >
                    {linksObject?.map((link) => (
                      <MenuItem key={link?.id} value={link?.id}>
                        <ListItemText sx={{width:{sm:50},display:'inline-block'}}
                          primary={link?.name} />
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="calendarWrap">                  
                    <DateRangePicker
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        className="calendarElement"
                    />
                </div>
                <Button
                  sx={{background:'#3c82f6',color:'white',position:'absolute',bottom: "20px",
                    right: '20px',
                    "&:hover": {
                      border: "1px solid #3c82f6",
                      color: 'gray',
                      backgroundColor: 'white'
                    },
                  }}
                onClick={handleSubmit}
                >
                  Ir al Reporte
                </Button>
            </Box>
        </Modal>
    </div>
  )
}
