import { Image } from "@nextui-org/react";
import { useToggle } from "usehooks-ts";
import { useState } from "react";
import PostModal from "./PostModal";

export default function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <article className="mb-2 cursor-pointer" onClick={toggleOpen}>
        <h4 className="mb-1 text-small">{post.title}</h4>
        <Image
          radius="md"
          width="100%"
          alt={post.title}
          src={post.cover_image}
        />
      </article>

      <PostModal
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        post={post}
        comments={comments}
      />
    </>
  );
}
