export default function classifyCategory(id) {
  switch (id) {
    case '63ff71407b958c65384c6ae6':
      return '자기개발서적';
    case '63ff714d7b958c65384c6ae8':
      return '소설책';
    case '640056ecbebc7d0cc3f7fe0a':
      return '만화책';
    case '640056fdbebc7d0cc3f7fe0c':
      return '아동책';
    default:
      return '카테고리가 없습니다.';
  }
}
