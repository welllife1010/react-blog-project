import { Form, redirect, useLoaderData } from "react-router-dom"
import { FormGroup } from "../components/FormGroup"
import { getUsers } from "../api/users"

function NewPost() {
  const users = useLoaderData()
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  )
}

async function action({ request }) {
  const formData = await request.formData()
  const title = formData.get("title")
  const body = formData.get("body")
  const userId = formData.get("userId")

  const post = await createPost(
    { title, body, userId },
    { signal: request.signal }
  )

  return redirect(`/post/${post.id}`)
}

function loader({ request: { signal } }) {
  return getUsers({ signal })
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
}
