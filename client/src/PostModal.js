import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
} from "@nextui-org/react";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostModal({ isOpen, toggleOpen, post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://localhost:3001/posts/${post.id}/comments`)
        .then((res) => {
          setComments(res.data);
        });
    }
  }, [post.id, isOpen]);
  return (
    <Modal
      size="3xl"
      isOpen={isOpen}
      onClose={toggleOpen}
      classNames={{ body: "p-0" }}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{post.title}</ModalHeader>
        <ModalBody>
          <div className="post-image-modal-container">
            <Image
              radius="none"
              width="100%"
              className="object-cover"
              alt={post.title}
              src={post.cover_image}
            />
          </div>
        </ModalBody>

        <div
          className="px-4 mb-3 mt-3"
          style={{ height: "300px", overflowY: "auto" }}
        >
          <h2 className="text-1xl font-extrabold mb-3">Comments</h2>
          <CommentCreate postId={post.id} setComments={setComments} />
          <CommentsList comments={comments} />
        </div>
      </ModalContent>
    </Modal>
  );
}
