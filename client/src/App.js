import PostCreate from "./PostCreate";
import PostsList from "./PostsList";
import { Divider } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(Object.values(res.data).reverse());
    });
  }, []);

  return (
    <main className="mx-auto px-3 pt-12" style={{ maxWidth: "680px" }}>
      <PostCreate setPosts={setPosts} />
      <Divider className="my-4" />
      <PostsList posts={posts} />
    </main>
  );
};

export default App;
