import React from 'react'
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/useThunk';
import ExpandableComponent from './ExpandableComponent';
import AlbumsList from './AlbumsList';

function UsersListItem({user}) {

    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const handleClick = () => {
        doRemoveUser(user);
        console.log(error);
    }

    const header = <>
     <Button className='mr-3' loading={isLoading} onClick = {handleClick}>
                    <GoTrashcan />
                </Button>


                {error && <div>Error deleting user....</div>}




                {user.name}
    
    </>
    return (

        <ExpandableComponent header={header}>
            <AlbumsList user = {user}/>
        </ExpandableComponent>
        

               
               
    );
}

export default UsersListItem