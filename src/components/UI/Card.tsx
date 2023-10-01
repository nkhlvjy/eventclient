import { PropsWithChildren } from "react";
import './Card.css'

const Card = (props: PropsWithChildren) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
