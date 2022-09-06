import { useSelector } from "react-redux";
import { selectUserById } from "../users/userApiSlice";
import { useParams } from 'react-router-dom';
import { useGetMessagesByUserIdQuery } from "./msgSlice";
import Spinner from '../../components/Spinner';
import TimeAgo from './TimeAgo';

function MessageList() {
    const { userId } = useParams()
    const user = useSelector( state => selectUserById(state, Number(userId)))

    const {
        data: messagesForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMessagesByUserIdQuery(userId);

    let content;
    if(isLoading) {
        content = <Spinner/>
    } else if(isSuccess) {
        const { ids, entities } = messagesForUser
        content = ids.map(id => (
            <div>
                <p>
                    {entities[id].body}
                </p>
                <TimeAgo timestamp={entities.date}/>
            </div>
        ))
    } else if(isError) {
        content = <p>{error}</p>
    }
    return (
        <section>
            {content}
        </section>
    )
}

export default MessageList
