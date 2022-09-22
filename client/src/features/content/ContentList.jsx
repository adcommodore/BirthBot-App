import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useGetAllContentQuery } from '../content/contentApiSlice';

const ContentList = () => {
    const [ currentContent, setCurrentContent] = useState('')
    const {
        data: allContent,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllContentQuery()

    if (isLoading) return <div>Loading...</div>

    const contentSelectionHandler = (content) => {
        setCurrentContent(content)
    }

    return (
        <Container>
        <h2>SMS Content Schedule</h2>
        {allContent 
            ? allContent.map((content) => (
                <Table key={content.id} onClick={contentSelectionHandler(content)}>
                    <thead>
                        <tr>
                        <th>Index</th>
                        <th>Gestational Day</th>
                        <th>SMS Body</th>
                        <th>Media Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{content.index}</td>
                            <td>{content.gestationalDay}</td>
                            <td>{content.body}</td>
                            <td>{content.mediaUrl}</td>
                        </tr>
                    </tbody>
                </Table>
            ))
            : 'No content has been created yet.'}
    </Container>
    )
}
export default ContentList

