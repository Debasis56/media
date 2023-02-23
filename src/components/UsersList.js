import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import { addUser } from "../store";
import Button from './Button';


function UsersList(){

    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUserError, setloadingUserError] = useState(null); 
    const [isCreatingUsers, setIsCreatingUsers] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(null);


    const { data } = useSelector((state)=>{
        return state.users;
    })
    const dispatch = useDispatch();


    useEffect(()=>{

        setIsLoadingUsers(true);

        dispatch(fetchUsers())
        .unwrap()
        .catch((err)=>{
            setloadingUserError(err);
        })
        .finally(()=>{
            setIsLoadingUsers(false)
        })

    }, []);


    const handleUserAdd = () => {
        setIsCreatingUsers(true);
        
        dispatch(addUser()).unwrap()
        .catch((err) => {
            setCreatingUserError(err)
        })
        .finally(()=>{
            setIsCreatingUsers(false);
        })
    }



    if(isLoadingUsers){
        return <div><Skeleton times={6} className='h-10 w-full'/></div>
    }
    if(loadingUserError){
        return <div>Error fetching data</div>
    }

    const renderedUsers = data.map((user)=>{
        return (
            <div className="mb-2 border rounded" key={user.id}>
                <div className="flex p-2 justify-between items-center cursor-pointer">

                    {user.name}

                </div>

            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                {
                    isCreatingUsers ? 'Creating User....' :
                <Button onClick = {handleUserAdd}>
                    + Add User
                </Button>
                }
                {creatingUserError && 'Error Creating User'}
            </div>
            {renderedUsers}
        </div>
    )
}
export default UsersList;