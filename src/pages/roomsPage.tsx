import React from 'react';
import RoomHeader from '@/components/ui/rooms/roomHeader';
import RoomsList from '@/components/ui/rooms/roomsList';
const RoomsPage = () => {
    return (

        <div className='flex h-screen gap-1 '>
            <div className=' h-full w-10'></div>
              
            <div className='flex flex-col flex-1 '>
               <div className=' h-10 '>

               </div>
                <div className='flex-1 bg-white border-1 m-0.5 border-gray-200 rounded-2xl '>
                 <RoomHeader/>
                 <RoomsList />
                </div>
            </div>
           
           
            
        </div>
    );
};

export default RoomsPage;