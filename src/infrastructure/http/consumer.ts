import axios from "axios";

export const consumer = axios.create({
	baseURL: "http://localhost:3001/api/v1",
	timeout: 3000,
});
