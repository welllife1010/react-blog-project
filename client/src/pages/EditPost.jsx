import { redirect, useLoaderData } from "react-router-dom"
import { PostForm } from "../components/PostForm"
import { getUsers } from "../api/users"
import { getPost, updatePost } from "../api/posts"

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

async function action({ request, params: { postId } }) {
  const formData = await request.formData()
  const title = formData.get("title")
  const body = formData.get("body")
  const userId = formData.get("userId")

  const post = await updatePost(
    postId,
    { title, body, userId },
    { signal: request.signal }
  )

  return redirect(`/posts/${post.id}`)
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
}
