import { Image } from "@nextui-org/react";
import { useToggle } from "usehooks-ts";
import PostModal from "./PostModal";

export default function Post({ post }) {
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
          style={{ aspectRatio: 1 / 1, objectFit: "cover", objectPosition: "center" }}
        />
      </article>

      <PostModal isOpen={isOpen} toggleOpen={toggleOpen} post={post} />
    </>
  );
}
