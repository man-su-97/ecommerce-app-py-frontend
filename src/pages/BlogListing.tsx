import { Link } from "react-router-dom";
import Post1 from "./Post1";
import Post2 from "./Post2";
import Post3 from "./Post3";
import Post4 from "./Post4";
import { Container, Row, Col } from "react-bootstrap";

const BlogListing = () => {
  return (
    <Container>
      <Row className="justify-content-between">
        <Col md={8} className="mb-4 mt-4">
          <Link to={"/post11"}>
            <Post1 />
          </Link>
        </Col>
        <Col md={8} className="mb-4">
          <Link to={"/post22"}>
            <Post2 />
          </Link>
        </Col>
        <Col md={8} className="mb-4">
          <Link to={"/post33"}>
            <Post3 />
          </Link>
        </Col>
        <Col md={8} className="mb-4">
          <Link to={"/post44"}>
            <Post4 />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogListing;

{
  /* <Link to={`/post/${post.slug}`} className="post" key={post.post_id}>
  <h2 className="post_title">{post.title}</h2>
</Link>; */
}
