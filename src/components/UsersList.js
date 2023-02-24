import { useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import { addUser } from "../store";
import { removeUser } from "../store";
import Button from './Button';
import { useThunk } from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";



// function useThunk(thunk){
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();



//     const runThunk = useCallback((arg) => {
//         setIsLoading(true);
//         dispatch(thunk())
//         .unwrap()
//         .catch(err => setError(err))
//         .finally(()=>setIsLoading(false));
//     }, [dispatch, thunk]);

//     return [runThunk, isLoading, error];

// }
 

function UsersList(){

    //PREVIEW 
    const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers);

    // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    // const [loadingUserError, setloadingUserError] = useState(null); 
    // const [isCreatingUsers, setIsCreatingUsers] = useState(false);
    // const [creatingUserError, setCreatingUserError] = useState(null);

    const [doCreateUser, isCreatingUsers, creatingUserError] = useThunk(addUser);
    const { data } = useSelector((state)=>{
        return state.users;
    })
    // const dispatch = useDispatch();


    useEffect(()=>{

        // setIsLoadingUsers(true);

        // dispatch(fetchUsers())
        // .unwrap()
        // .catch((err)=>{
        //     setloadingUserError(err);
        // })
        // .finally(()=>{
        //     setIsLoadingUsers(false)
        // })
        doFetchUsers();

    }, [doFetchUsers]);


    const handleUserAdd = () => {
        // setIsCreatingUsers(true);
        
        // dispatch(addUser()).unwrap()
        // .catch((err) => {
        //     setCreatingUserError(err)
        // })
        // .finally(()=>{
        //     setIsCreatingUsers(false);
        // })
        doCreateUser();
    }




    let content;

    if(isLoadingUsers){
        content =  <div><Skeleton times={6} className='h-10 w-full'/></div>
    }
    else if(loadingUserError){
        content = <div>Error fetching data</div>
    }
    else{
        content = data.map((user)=>{

            return <UsersListItem key = {user.id} user = {user}/>
            // return (
            //     <div className="mb-2 mx-5 border rounded" key={user.id}>
            //         <div className="flex p-2 justify-between items-center cursor-pointer">
    
            //             {user.name}
    
            //         </div>
    
            //     </div>
            // );
        });
    }


    return (
        <div>
            <div className="flex flex-row justify-between m-8 items-center">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick = {handleUserAdd} loading = {isCreatingUsers}>
                    + Add User

                </Button>
                {creatingUserError && 'Error Creating User.....'}
            </div>
            {content}
        </div>
    )
}
export default UsersList;