import { Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function CommentCreate({ postId, setComments }) {
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      const comment = await axios.post(
        `http://localhost:3001/posts/${postId}/comments`,
        {
          content: formData.get("content"),
        }
      );
      toast.success("Comment created!");
      setComments((prevComments) => [comment.data, ...prevComments]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Textarea
          label="Comment"
          placeholder="Enter your comment"
          className="w-full"
          name="content"
          disabled={isLoading}
        />
        <Button
          color="primary"
          className="mt-2"
          type="submit"
          isLoading={isLoading}
          fullWidth
        >
          Send
        </Button>
      </form>
    </div>
  );
}
