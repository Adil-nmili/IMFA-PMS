import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { reservationSchema } from '@/schema/reservationSchema';
import useReservationStore from '@/stores/reservationStore';
import type { ReservationFormValues } from '@/types/ReservationFormValuesType';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ConfirmationTab : React.FC<any>  = ()=>{

    const {reservation} = useReservationStore();
      const form = useForm<ReservationFormValues>({
        resolver: zodResolver(reservationSchema)as any,
        defaultValues: 
        reservation ||
        {
          status:"en_attente"
        },
      });    
    const [displayArrayReservation,setDisplayArrayReservation] = useState<any>(
        [
            {
                label:"Nom & Prenom",
                value:(reservation?.nom || reservation?.prenom) && reservation?.nom+" "+reservation?.prenom
            },
            {
                label:"CIN",
                value:reservation?.cin
            },            {
                label:"Statut social",
                value:reservation?.statut_social
            },            {
                label:"Genre",
                value:reservation?.genre
            },            {
                label:"Date de naissance",
                value:reservation?.date_naissance
            },            {
                label:"Tel",
                value:reservation?.tel
            },            {
                label:"Email",
                value:reservation?.email
            },{
                label:"Adresse",
                value:reservation?.adresse
            },
            
            {
                label:"Date d’entrée",
                value:reservation?.date_entree
            },{
                label:"Date de sortie",
                value:reservation?.date_sortie
            },{
                label:"Nombre d’adultes",
                value:reservation?.adultsNum
            },{
                label:"Nombre d’enfants",
                value:reservation?.enfantNum
            },
            {
                label:"Services",
                value:reservation?.services
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
                displayArrayReservation?.map((i: any, index: number) => {
                if (index >= 8) {
                    if (i?.label === 'Services') {
                        
                    return (
                        <div key={index}>
                        <label className="text-[#967E62]">{i?.label} :</label>
                        <ul className="text-black grid grid-cols-3">
                            {Array.isArray(i?.value) &&
                            i.value.map((s: any, idx: number) => (
                                s?.id &&
                                <li key={idx}>
                                {s?.type && `• ${s.type}`}
                                </li>
                            ))}
                        </ul>
                        </div>
                    );
                    } else {
                    return (
                        <div key={index}>
                        <label className="text-[#967E62]">{i?.label} :</label>
                        <span className="text-black">
                            {i?.value ? i.value : "______________"}
                        </span>
                        </div>
                    );
                    }
                }
                return null;
                })

            }
            </div>  

<RadioGroup
  value={form.watch("status")}
  onValueChange={(value) => form.setValue("status", value as ReservationFormValues["status"])}
  className="grid grid-cols-3 mt-10 space-y-2"
>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="confirme" id="confirme" className='border rounded-full border-black' />
    <label htmlFor="confirme">Confirmé</label>
  </div>

  <div className="flex items-center space-x-2">
    <RadioGroupItem value="en_attente" id="en_attente" className='border rounded-full border-black'/>
    <label htmlFor="en_attente">En attente</label>
  </div>

  <div className="flex items-center space-x-2">
    <RadioGroupItem value="paye" id="paye" className='border rounded-full border-black'/>
    <label htmlFor="paye">Payé</label>
  </div>
</RadioGroup>
        </div>
    </div>
  )
}

export default ConfirmationTab;