import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuestions = (count) =>
  axios.get(`${API_URL}/api/quiz/questions/${count}`).then((res) => res.data);
