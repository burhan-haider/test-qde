import { useParams } from 'react-router-dom'

export default function Post() {
    let params = useParams();
    return <h2>Post #{params.postId}</h2>;
}