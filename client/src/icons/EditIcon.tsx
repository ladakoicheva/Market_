type props = {
  edit: () => void
  
}

export default function EditIcon({edit}:props) {
  return (
    <svg
            onClick={edit}
            
            className="editIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="40"
            height="40"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
  )
}
