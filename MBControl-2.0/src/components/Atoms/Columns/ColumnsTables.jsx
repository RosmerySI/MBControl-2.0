import { useEffect, useState } from 'react'
import { EditComponent } from '../../Particules/Edit/EditComponent';
import { UserActivation } from '../../Particules/Users/UserActivation';
import { ModelsTableSideBar } from '../../Particules/Models/ModelsTableSideBar';
import { userInfo } from '../../../utilities/userInfo/userInfo';

export const ColumnsTables = (columnsName,route,setObject,setEdit) => {
    
    const [columnsTables, setColumnsTables] = useState([]);
    const {userrole} = userInfo()
    // Map columns when columnsName change
    const creatingColumnsTables = () => {

        const columns = columnsName.map(item => ({
            field: item.field,
            headerName: item.headerName,
            description: item.description,
            sortable: true,
            width: item.width,
        }));
        // Add ModelsColumn
        let modelColumn
        if (route === '/newclient'||route === '/newpromoter') {
            modelColumn={
            field: 'Modelos',
            disableColumnMenu: true,
            sortable: false,
            width: 80,
            renderCell: (cellvalues) => {
                return (
                   ModelsTableSideBar(cellvalues,route) 
                )
            }
            }
        };
        // Add Edit Column
        let columnEdit
        if (route !== '/invoice'&&route !== '/incomeProvider'&&route !== '/outcomeProvider') {
            columnEdit = {
                field:(userrole.includes('Admin')) && 'Editar',
                disableColumnMenu: true,
                sortable: false,
                width: 70,
                renderCell: (cellvalues) => {
                return (
                    (cellvalues.row.roles !== null) &&
                    EditComponent(cellvalues,route,setEdit)
                    )
                }
            }
        };
        //Add columnActivation
        let columnActivation
        if (route === '/newuser') {
            columnActivation = {
                field: 'Desactivado/Activado',
                disableColumnMenu: true,
                sortable: false,
                width: 170,
                renderCell: (cellvalues) => {
                    return (
                        (cellvalues.row.roles !== null) && UserActivation(cellvalues,setObject)
                    )
                }
            };
        }
        // Add Edit and Activation columns to columnsTables
        const updatedColumns = [...columns,modelColumn,columnEdit,columnActivation].filter(column => column);
        setColumnsTables(updatedColumns);
    }
    useEffect(() => {
        creatingColumnsTables()
    }, []);

    return { columnsTables };
    
}
