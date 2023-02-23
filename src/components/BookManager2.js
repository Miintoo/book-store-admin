import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const apiUrl = 'http://elice.iptime.org:8080';
function BookManager2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(''); // 수정할 때 사용
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [score, setScore] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [condition, setCondition] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('create');

  useEffect(() => {
    console.log('location', location.state);

    setStatus(location.state?.message);
    if (location.state?.message === 'update') {
      const { book } = location.state;

      console.log('status', status);
      console.log('location', location.state);
      console.log('bookId', book.id);
      setId(book.id);
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setImage(book.image);
      setPrice(book.price);
      setSalePrice(book.salePrice);
      setScore(book.score);
      setQuantity(book.quantity);
      setCondition(book.condition);
      setPublishedDate(book.publishedDate);
      setPublisher(book.publisher);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (status === 'create') {
      await axios
        .post(`${apiUrl}/test/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log('result', res.data);
          setMessage('글이 등록되었습니다.');
          // navigate('/board');
        });
    } else if (status === 'update') {
      await axios
        .put(`${apiUrl}/book/update`, image, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log('result', res);
          setMessage('글이 수정되었습니다.');
          navigate('/board');
        });
    }
  };

  const encodeFileToBase64 = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };
  const inputHandler = e => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'category':
        setCategory(() => {
          const value = e.target.value;
          switch (value) {
            case '소설':
              return '63f2131534c2e6f0d92751bb';
            case '자기개발':
              return '63f224e8542a1a6681008b13';
            case '아동서적':
              return '63f2274e835ac4d32a4c9915';
            case '기타':
              return '63f2d82b5b2238b907c9c4f6';
            default:
          }
        });
        break;
      case 'image':
        setImage(e.target.files[0]);
        break;
      case 'price':
        setPrice(e.target.value);
        break;
      case 'salePrice':
        setSalePrice(e.target.value);
        break;
      case 'score':
        setScore(e.target.value);
        break;
      case 'quantity':
        setQuantity(e.target.value);
        break;
      case 'condition':
        setCondition(e.target.value);
        break;
      case 'publishedDate':
        setPublishedDate(e.target.value);
        break;
      case 'publisher':
        setPublisher(e.target.value);
        break;
      default:
    }
  };

  return (
    <div>
      <h1>서적 등록하기22222</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">서적명</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="author">작가</label>
        <input
          id="author"
          type="text"
          name="author"
          value={author}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="category">분류</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={inputHandler}
        />
        <br />

        {/* <label>책내용</label>
        <textarea type="text" name="content" value={content} onChange={inputHandler}></textarea>
        <br /> */}
        <label htmlFor="image">이미지</label>
        <input
          id="image"
          type="file"
          multiple
          name="image"
          onChange={e => {
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        <img src={image} alt="imagefor" />
        <br />
        <label htmlFor="price">가격</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="salePrice">할인가격</label>
        <input
          id="salePrice"
          type="number"
          name="salePrice"
          value={salePrice}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="score">추천점수</label>
        <input
          id="score"
          type="number"
          name="score"
          value={score}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="quantity">재고량</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={quantity}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="condition">서적상태</label>
        <input
          id="condition"
          type="text"
          name="condition"
          value={condition}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="publishedDate">발행일</label>
        <p>{publishedDate}</p>
        <input
          id="publishedDate"
          type="date"
          name="publishedDate"
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="publisher">출판사</label>
        <input
          id="publisher"
          type="text"
          name="publisher"
          value={publisher}
          onChange={inputHandler}
        />
        <br />

        {status === 'create' ? (
          <button type="submit" name="submitButton">
            등록
          </button>
        ) : (
          <button type="submit" name="submitButton">
            수정
          </button>
        )}
        <p>{message}</p>
      </form>
    </div>
  );
}

export default BookManager2;
