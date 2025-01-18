import request from "./request";

export const getBreeds = () => request.get("/dogs/breeds");
export const searchDogs = (params) => request.get("/dogs/search", { params });
export const getDogsByIds = (ids) => request.post("/dogs", ids);
export const matchDogs = (favorites) => request.post("/dogs/match", favorites);
