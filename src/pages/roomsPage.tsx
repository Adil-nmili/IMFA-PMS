import React from 'react';
import RoomHeader from '@/components/ui/rooms/roomHeader';
import RoomFooter from '@/components/ui/rooms/roomFooter';
import RoomsList from '@/components/ui/rooms/roomsList';
const RoomsPage = () => {
    return (

        <div className='flex h-screen gap-2 '>
            <div className='bg-black h-full w-18'></div>
              
            <div className='flex flex-col flex-1 '>
               <div className='bg-black h-16 '>

               </div>
                <div className='flex-1 bg-red-900 mt-2 border-0 rounded-2xl'>
                 <RoomHeader/>
                 <RoomsList/>
                 <RoomFooter/>
                </div>
            </div>
           
           
            
        </div>
    );
};

export default RoomsPage;