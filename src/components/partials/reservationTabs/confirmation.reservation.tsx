import useAppState from '@/stores/authStore'
import React, { useState } from 'react';

const ConfirmationTab : React.FC<any>  = ()=>{
    const reservationInfo = useAppState(state=>state.reservation);

    const [displayArrayReservation,setDisplayArrayReservation] = useState<any>(
        [
            {
                label:"Nom & Prenom",
                value:(reservationInfo?.nom || reservationInfo?.prenom) && reservationInfo?.nom+" "+reservationInfo?.prenom
            },
            {
                label:"CIN",
                value:reservationInfo?.cin
            },            {
                label:"Statut social",
                value:reservationInfo?.statut_social
            },            {
                label:"Genre",
                value:reservationInfo?.genre
            },            {
                label:"Date de naissance",
                value:reservationInfo?.date_naissance
            },            {
                label:"Tel",
                value:reservationInfo?.tel
            },            {
                label:"Email",
                value:reservationInfo?.email
            },{
                label:"Adresse",
                value:reservationInfo?.adresse
            },
            
            {
                label:"Date d’entrée",
                value:reservationInfo?.date_entree
            },{
                label:"Date de sortie",
                value:reservationInfo?.date_sortie
            },{
                label:"Nombre d’adultes",
                value:reservationInfo?.adultsNum
            },{
                label:"Nombre d’enfants",
                value:reservationInfo?.enfantNum
            },
            {
                label:"Services",
                value:reservationInfo?.services
            }
        ]
    );
    
  return (
    <div className='flex justify-between w-full h-100 gap-3 '>
        <div className='w-1/2'>
            <h1 className='text-xl font-bold text-[#795E46]'>Informations client</h1>
            <div className='flex flex-col gap-6 mt-6'>
                {
                    displayArrayReservation?.map((i : any,index:number)=>
                    {
                        if(index < 8){
                            return (
                            <div key={index}>
                                <label htmlFor="" className='text-[#967E62]'>
                                    {i?.label} : 
                                </label>
                                <span className='text-black'>
                                    {
                                        i?.value ? i?.value :"______________"
                                    }
                                </span>
                            </div>
                            )
                        }
                    }
                    )
                }
            </div>
        </div>
        <div className='w-[1px] h-100 bg-[#3F3124]'></div>
        <div className='w-1/2'>
            <h1 className='text-xl font-bold text-[#795E46]'>Détails du séjour</h1>
                <div className='flex flex-col gap-6 mt-6'>
                {
                    displayArrayReservation?.map((i : any,index:number)=>
                    {
                        if(index > 8){
                            return (
                            <div key={index}>
                                <label htmlFor="" className='text-[#967E62]'>
                                    {i?.label} : 
                                </label>
                                <span className='text-black'>
                                    {
                                         i?.value ? i?.value :"______________"
                                    }
                                </span>
                            </div>
                            )
                        }else if(i?.label == 'Services'){
                            <div>
                                <label htmlFor="" className='text-[#967E62]'>
                                    {i?.label} : 
                                </label>
                                <ul className='text-black'>
                                    {
                                        i?.map((s : any,index:number)=>
                                            <li key={index}>
                                                {s && "."}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        }
                    }
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ConfirmationTab;