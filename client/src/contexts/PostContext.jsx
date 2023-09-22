import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { generalRequest } from '../services/httpService';

const Context = createContext();

export const PostProvider = ({ children }) => {
  const { id } = useParams();
  const {
    loading,
    error,
    value: post,
  } = useAsync(() => generalRequest(`/posts/${id}`), [id]);

  console.log(post);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1 className='error-msg'>{error?.message}</h1>;
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className='error-msg'>{error}</h1>
      ) : (
        { children }
      )}
    </Context.Provider>
  );
};
