import React from 'react';
import RoomHeader from '@/components/partials/rooms/roomHeader';
import RoomsList from '@/components/partials/rooms/roomsList';

const RoomsPage = () => {
    return (
        <div className="flex flex-col h-full w-full space-y-4">
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <RoomHeader />
                <div className="flex-1 overflow-y-auto p-4">
                    <RoomsList />
                </div>
            </div>
        </div>
    );
};

export default RoomsPage;