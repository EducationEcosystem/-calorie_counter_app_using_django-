import { Navbar } from "./Navbar";

export const Base = (props) => {
  return (
    <>
      <Navbar />
      <div className="container">{props.children}</div>
    </>
  );
};
