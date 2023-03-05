import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton';
import ExpandableComponent from './ExpandableComponent';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';
function AlbumsList({user}) {

  const{data, error, isFetching} = useFetchAlbumsQuery(user);
  useFetchAlbumsQuery(user);

  const [addAlbum, results] = useAddAlbumMutation();



  console.log(results);
const handleAddAlbum = () => {
  addAlbum(user);


};

  let content;

  if(isFetching){
    content = <Skeleton times={3} className="h-10 w-full"/>
  }
  else if(error)
  {
    content = <div>Error Loading Albums</div>
  } else{
     content = data.map(album => {
    //   const header = <div>{album.title}</div>;
    //   return (<ExpandableComponent key={album.id} header= {header}>
    //     List of photos in album
    //   </ExpandableComponent>
    //   );
    return <AlbumsListItem key = {album.id} album = {album}/>
    });
  }


  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
      <h3 className = 'text-lg font-bold'>Albums For {user.name}</h3>
    <Button loading = {results.isLoading} onClick = {handleAddAlbum}>
      + Add Album
    </Button>
    </div>
    <div>
      {content}
    </div>
    </div>
  )
}

export default AlbumsList