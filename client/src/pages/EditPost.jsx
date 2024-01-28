import { useLoaderData } from "react-router-dom"
import { PostForm } from "../components/PostForm"
import { getUsers } from "../api/users"
import { getPost } from "../api/posts"

function EditPost() {
  const { users, post } = useLoaderData()
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} defaultValues={post} />
    </>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal })
  const users = getUsers({ signal })

  return { post: await post, users: await users }
}

function action() {}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
}
