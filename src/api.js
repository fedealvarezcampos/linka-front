import useFetch from './hooks/useFetch';

export const useSortPosts = () => useFetch('http://localhost:3001/api/posts');
// export const useRick = (name) => useFetch('https://rickandmortyapi.com/api/character?name=' + name)
