import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PageProps {}

const StyledPage = styled.div`
  color: pink;
`;

export function Page(props: PageProps) {
  return (
    <StyledPage>
      <h1>Welcome to Page!</h1>
    </StyledPage>
  );
}

export default Page;
