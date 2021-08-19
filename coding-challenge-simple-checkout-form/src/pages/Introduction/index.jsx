import { useHistory } from 'react-router-dom';
import { ButtonPrimary } from '../../components/button/ButtonPrimary';
import { Column } from '../../components/organization/column/Column';
import style from './style.module.sass';

export const IntroductionPage = ({ pageOutAnimationAndExitPage }) => {
  const history = useHistory();

  const nextStep = () => {
    pageOutAnimationAndExitPage(() => history.push({ pathname: '/checkout-first' }));
  }

  return (
    <Column className={style.introductionPage}>
      <div>To start the checkout process, please click on the start button!</div>
      <br />
      <ButtonPrimary onClick={nextStep}>Start</ButtonPrimary>
    </Column>
  );
};
