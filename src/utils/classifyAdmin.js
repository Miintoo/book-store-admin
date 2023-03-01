export default function classifyAdmin() {
  const token = localStorage.getItem('Auth');
  const role = localStorage.getItem('Role');

  if (!token || !role || role === 'user') {
    return false;
  }
  return true;
}
