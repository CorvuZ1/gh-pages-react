import classes from "./Container.module.scss";

function Container({ children }) {
  return <div className={classes.root}>{children}</div>;
}

export default Container;
