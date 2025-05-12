import { SearchFormData } from "./hooks/useFetchDogData";

export const DEFAULT_SORTING_ORDER = "breed:asc";
export const DEFAULT_FIELDS_PER_PAGE = 25;

export const DefaultSearchFormData: SearchFormData = {
  breeds: [],
  minAge: null,
  maxAge: null,
};

export const sortOptions = {
  Default: "breed:asc",
  "Breed - Asc": "breed:asc",
  "Breed - Desc": "breed:desc",
  "Name - Asc": "name:asc",
  "Name - Desc": "name:desc",
  "Age - Asc": "age:asc",
  "Age - Desc": "age:desc",
};
