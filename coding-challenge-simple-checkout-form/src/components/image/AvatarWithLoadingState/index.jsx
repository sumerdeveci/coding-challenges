import { useGithubUser } from '../../../services/github';
import style from './style.module.sass';

export const AvatarWithLoadingState = ({ className, githubUsername }) => {
  const response = useGithubUser(githubUsername);
  const { data: githubUser, loading, error } = response;

  if (loading) return <div>loading...</div>;
  if (error || !githubUser) return <div>Something wrong happened</div>;

  return (
    <img className={`${style.avatarWithLoadingState} ${className ?? ''}`} alt="Avatar" src={githubUser.avatar_url} />
  );
};
