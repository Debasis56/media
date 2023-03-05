import Button from "./Button";
import ExpandableComponent from "./ExpandableComponent";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";
function AlbumsListItem({ album }) {
    const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

    const handleDelete = () => {
        removeAlbum(album)
    }

    const header = <>
        <Button className='mr-2' loading={removeAlbumResults.isLoading} onClick={handleDelete}>
        <GoTrashcan />
        </Button>
        {album.title}
    </>;
    return (<ExpandableComponent key={album.id} header={header}>
        <PhotosList album = {album}/>
    </ExpandableComponent>
    );
}

export default AlbumsListItem