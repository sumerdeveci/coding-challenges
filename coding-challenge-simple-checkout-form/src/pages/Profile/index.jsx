import { isEmptyArray } from 'formik';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { ButtonSecondary } from '../../components/button/ButtonSecondary';
import { AvatarWithLoadingState } from '../../components/image/AvatarWithLoadingState';
import { Column } from '../../components/organization/column/Column';
import { Title } from '../../components/typography/Title';
import { CheckoutFormContext } from '../../providers/CheckoutFormProvider';
import style from './style.module.sass';

export const ProfilePage = ({ pageOutAnimationAndExitPage }) => {
  const history = useHistory();
  const {
    formValues: { firstName, lastName, githubUsername, email, isAgreedTerms },
  } = useContext(CheckoutFormContext);

  const goToBeginningOfForm = () => {
    pageOutAnimationAndExitPage(() => history.push('/checkout-first'));
  };

  const goBack = () => {
    pageOutAnimationAndExitPage(() => history.goBack());
  };

  if (
    isEmptyArray(firstName) ||
    isEmptyArray(lastName) ||
    isEmptyArray(githubUsername) ||
    isEmptyArray(email) ||
    !isAgreedTerms
  ) {
    return (
      <Column className={style.profilePage}>
        <div>You did not complete the form successfully, please go back and complete.</div>
        <br />
        <ButtonSecondary onClick={goToBeginningOfForm}>Go to beginning of the form</ButtonSecondary>
      </Column>
    );
  }

  return (
    <Column className={style.profilePage}>
      <AvatarWithLoadingState githubUsername={githubUsername} />
      <div className={style.entry}>
        <Title>First name</Title>
        <div>{firstName}</div>
      </div>
      <div className={style.entry}>
        <Title>Last name</Title>
        <div>{lastName}</div>
      </div>
      <div className={style.entry}>
        <Title>Github username</Title>
        <div>{githubUsername}</div>
      </div>
      <div className={style.entry}>
        <Title>Email</Title>
        <div>{email}</div>
      </div>
      <ButtonSecondary onClick={goBack}>Back</ButtonSecondary>
    </Column>
  );
};
