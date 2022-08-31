import {
  useGetContentQuery,
    useCreateContentMutation,
    useUpdateContentMutation
} from '../content/contentSlice';
import { useState } from "react";
import Spinner from '../../components/Spinner';

const ContentList = () => {
  const [newContent, setNewContent] = useState('')

  const {
      data: content,
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetContentQuery()
  const [createContent] = useCreateContentMutation()
  const [updateContent] = useUpdateContentMutation()

  const handleSubmit = (e) => {
      e.preventDefault();
      createContent({ index, gestationDay, body })
      setNewContent('')
  }

  const newItemSection =
      <form onSubmit={handleSubmit}>
          <label htmlFor="new-content">Enter new content</label>
          <div>
              <input
                  type="text"
                  id="new-content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter new childbirth education content."
              />
          </div>
          <button className="submit">
              Add
          </button>
      </form>


  let page;
  if (isLoading) {
      page = <Spinner/>
  } else if (isSuccess) {
      page = content.map(content => {
          return (
              <div>contentItems</div>
          )
      })
  } else if (isError) {
      page = <p>{error}</p>
  }

  return (
      <main>
          <h1>Todo List</h1>
          {newItemSection}
      </main>
  )
}
export default TodoList

