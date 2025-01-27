import { ReactElement } from 'react'

interface ListItemProps {
  icon: ReactElement
  title: string
  onClick?: () => void
}

function ListItem({ icon, title, onClick }: ListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 hover:bg-gray-400 transition-transform duration-300 delay-300 justify-start text-xl rounded-lg m-2 cursor-pointer ${onClick ? 'cursor-pointer' : ''}`}
    >
      <span>{icon}</span>
      {title}
    </div>
  )
}

export default ListItem
