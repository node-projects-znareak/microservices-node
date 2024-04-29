import { Avatar } from "@nextui-org/react";

export default function CommentsList({ comments }) {
  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div className="d-flex items-start mb-3" key={comment.id}>
          <Avatar name="Junior" className="basis-10 flex-shrink-0 flex-grow-0" />
          <p className="ms-2 text-small max-w-full " style={{ wordBreak: "break-all" }}>
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
