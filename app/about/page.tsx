import React from 'react'

const userpage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default userpage;