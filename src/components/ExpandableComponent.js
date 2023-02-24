import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";

function ExpandableComponent({ header, children }) {

    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }
    return (


        <div className="mb-2 mx-5 border rounded">
            <div className="flex p-2 justify-between items-center">

                <div className='flex flex-row items-center justify-between'>
                    {header}
                </div>
                <div onClick={handleClick} className='cursor-pointer'>
                    {expanded ?<GoChevronLeft />:  <GoChevronDown /> }
                </div>
            </div>


            {expanded && <div className="p-2 border-t">
                {children}
            </div>}


        </div>



    );
}

export default ExpandableComponent;