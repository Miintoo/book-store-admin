import styled from 'styled-components';

function OrderPagination({ totalItemCount, limit, page, setPage }) {
  const pagesCount = Math.ceil(totalItemCount / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          {/* < 부등호 기호의 코드값 */}
          &lt;
        </Button>
        {/* pagesCount만큼의 배열 생성, undefined로 채움, map으로 값을 넣어줌 */}
        {Array(pagesCount)
          .fill()
          .map((_, i) => (
            <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : null}>
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === pagesCount}>
          {/* > 부등호 기호의 코드값 */}
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 3px;
  padding: 8px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
  }

  &:hover {
    color: black;
    background: #e1e5e8;
    cursor: pointer;
  }

  &[disabled] {
    color: rgb(222, 222, 222);
    cursor: revert;
    &:hover {
      background: white;
    }
  }

  &[aria-current] {
    color: white;
    /* background: rgb(170, 170, 170); */
    background: rgba(185, 185, 185, 1);
    cursor: revert;
  }
`;
export default OrderPagination;
