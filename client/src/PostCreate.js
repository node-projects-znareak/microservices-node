import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import axios from "axios";
import { uploadImage } from "./helpers/utils";
import toast from "react-hot-toast";

registerPlugin(FilePondPluginFileValidateType);
const PostCreate = ({ setPosts }) => {
  const [coverImage, setCoverImage] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      const title = formData.get("title");
      const file = coverImage?.[0]?.file;
      const cover_image = await uploadImage(file);
      const post = await axios.post("http://localhost:3000/posts", {
        title,
        cover_image,
      });
      toast.success("Successfully upload!");
      setCoverImage([]);
      console.log({ post });
      setPosts((posts) => [post.data, ...posts]);
    } catch (error) {
      console.error(error);
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto pt-12">
      <h2 className="text-4xl font-extrabold mb-4">Create post</h2>

      <form onSubmit={onSubmit} autoComplete="off">
        <Input
          label="Title"
          placeholder="Enter title"
          name="title"
          disabled={isLoading}
          autoFocus
        />
        <FilePond
          acceptedFileTypes={["image/*"]}
          checkValidity={true}
          files={coverImage}
          className="mt-3"
          onupdatefiles={setCoverImage}
          allowMultiple={false}
          disabled={isLoading}
          name="coverImage"
          labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
          credits={false}
        />
        <Button
          color="primary"
          className="mt-2"
          type="submit"
          isLoading={isLoading}
          fullWidth
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default PostCreate;
