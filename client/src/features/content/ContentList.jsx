import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useGetAllContentQuery } from '../content/contentApiSlice';

const ContentList = () => {
    const [ currentContent, setCurrentContent ] = useState('')
    const {
        data: allContent,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllContentQuery()

    if (isLoading) return <div>Loading...</div>

    return (
        <Container>
        <h2>SMS Content Schedule</h2>
        {allContent 
            ? allContent.map((content) => (
                <Table key={content.id}>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{content.gestationWeek} Weeks</td>
                            <td> if (content.deliveryIndex === 0) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td>
                            <td> if (content.deliveryIndex === 1) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td>
                            <td> if (content.deliveryIndex === 2) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td> <td> if (content.deliveryIndex === 3) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td> <td> if (content.deliveryIndex === 4) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td> <td> if (content.deliveryIndex === 5) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td> <td> if (content.deliveryIndex ===60) 
                                    return <div>{content.body}</div>
                                    <div>{content.mediaUrl}</div>
                                    <Button>edit</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ))
            : 'No content has been created yet.'}
    </Container>
    )
}
export default ContentList

