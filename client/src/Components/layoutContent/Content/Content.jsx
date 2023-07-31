import { memo } from 'react';
import HeaderContent from '../HeaderContent';
import BodyContent from '../BodyContent';

const Content = () => {
  return (
    <>
      <HeaderContent />
      <BodyContent />
    </>
  );
};

export default memo(Content);
