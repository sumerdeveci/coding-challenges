import { useEffect, useState } from 'react';

const GITHUB_USERS_ENDPOINT = 'https://api.github.com/users/';

export const getGithubUser = async (githubUsername) => {
  try {
    return await fetch(`${GITHUB_USERS_ENDPOINT}${githubUsername}`).then((response) => response.json());
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const useGithubUser = (githubUsername) => {
  const [response, setResponse] = useState({ error: null, loading: true, data: null });

  try {
    useEffect(() => {
      getGithubUser(githubUsername).then((githubUser) => {
        setResponse({ error: null, loading: false, data: githubUser });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [githubUsername]);
  } catch (error) {
    setResponse({ error, loading: false, data: null });
  }

  return response;
};
