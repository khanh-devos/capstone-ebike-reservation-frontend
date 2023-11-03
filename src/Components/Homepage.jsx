import '../index.css';

const Homepage = () => (
  <div className="bgcontainer">
    <div className="getposition">
      <div className="flex justify-center  items-center">
        <h1 className="text-3xl text-center text-black font-bold">Welcome to the E-Bike Shop</h1>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex gap-4 mt-5">
          <li className="btnone">
            <h2>Login</h2>
          </li>
          <li className="btnone">
            <h2>Sign Up</h2>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Homepage;
