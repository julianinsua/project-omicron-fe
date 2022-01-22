import { FC } from "react";
import c from "classnames";
import styles from "./loadingRing.module.scss";

const LoadingRing: FC<PropTypes> = ({ small, center, absolute }) => {
  return (
    <div className={c(center && styles.center, absolute && styles.absolute)}>
      <span
        className={c(styles.loadingRing, small ? styles.small : styles.normal)}
      />
    </div>
  );
};

interface PropTypes {
  small?: boolean;
  center?: boolean;
  absolute?: boolean;
}

export default LoadingRing;