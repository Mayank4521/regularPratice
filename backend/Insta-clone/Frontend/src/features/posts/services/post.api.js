import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const createPost = async (imageFile, caption) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const response = await api.post("/", formData);

  return response.data;
};

export const getPost = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getPostDetails = async (postId) => {
  const response = await api.get("/details/:postId", postId);

  return response.data;
};

export const likePost = async (postId) => {
  const response = await api.post("/like/"+postId)

  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await api.post("/unlike/"+ postId);

  return response.data;
};

export const getFeed = async () => {
  const response = await api.get("/feed");

  return response.data;
};
