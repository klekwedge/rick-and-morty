import { Link } from 'react-router-dom';

import "./Page404.scss";

const Page404 = () => {
  return (
    <div className="background-img">
      <div className="space"></div>
      <div className="wrapper">
        <div className="img-wrapper">
          <span>44</span>
        </div>
        <p>
          The page you are trying to find has <br /> moved to another universe.
        </p>
        <Link to='/'>GET ME HOME</Link>
      </div>
    </div>
  );
};

export default Page404;
