import {motion} from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import type React from 'react'
import type { Props } from '@/types/props'

const  UserCard : React.FC<Props>= ({scaleCard,selectedUser,setSelectedUser}) => {
  return (
    <motion.div
      key={selectedUser?.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scaleCard }}
      transition={{ duration: 0.4 }}
      onClick={() => setSelectedUser(selectedUser)}
      className="cursor-pointer hover:shadow-xl text-center"
    >
      <Card className="w-54 mx-auto shadow-none overflow-hidden bg-transparent border-none max-h-55 py-2">
        <CardContent className="flex flex-col items-center p-4 space-y-1">
          <img
            src={selectedUser?.image}
            alt={selectedUser?.nomEmp}
            className="w-24 h-24 rounded-full object-cover border-2 border-primary/30"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{selectedUser?.nomEmp}</h3>
          <p className="text-sm text-[#D9DEE6] capitalize">{selectedUser?.role}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default UserCard