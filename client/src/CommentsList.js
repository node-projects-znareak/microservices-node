import { Avatar } from "@nextui-org/react";

export default function CommentsList({ comments }) {
  return (
    <div className="mt-4">
      {comments.map((comment) => {
        const isApproved = comment.status === "approved";
        const isRejected = comment.status === "rejected";
        const content = isApproved
          ? comment.content
          : isRejected
          ? "This comment has been rejected"
          : "This comment is pending moderation";

        return (
          <div
            className="d-flex items-start mb-3"
            key={comment.id}
            style={{ opacity: isApproved ? 1 : 0.5 }}
          >
            <Avatar name="Junior" className="basis-10 flex-shrink-0 flex-grow-0" />
            <p
              className="ms-2 text-small max-w-full "
              style={{
                wordBreak: "break-all",
                marginTop: "0.5rem",
                fontStyle: isRejected ? "italic" : "normal",
              }}
            >
              {content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
