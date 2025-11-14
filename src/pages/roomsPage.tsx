import React from 'react';
import RoomHeader from '@/components/rooms/roomHeader';
import RoomsList from '@/components/rooms/roomsList';
const RoomsPage = () => {
    return (

     <div className=' border-1 border-gray-200 rounded-2xl h-[523px] '>
         <RoomHeader/>
         <RoomsList/>
                
      </div>
          
           
           
    
    );
};

export default RoomsPage;