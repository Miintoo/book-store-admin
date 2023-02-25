import React from 'react';
import { TitleContainer } from './PageTitle.styled';

function PageTitle({ title }) {
  return <TitleContainer>{title}</TitleContainer>;
}

PageTitle.defaultProps = {
  title: '페이지 제목'
};

export default PageTitle;
