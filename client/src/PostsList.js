import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Post from "./Post";

export default function PostsList({ posts = [] }) {
  return (
    <section className="mt-3">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
