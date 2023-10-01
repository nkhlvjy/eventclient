import React from "react";
import './Button.css'


export type ButtonProps = {
    name: string;
    intent: boolean;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const buttonClassName = (() => {
        if (props.intent) {
            return "ui-button ui-button-bold"
        } else {
            return "ui-button"
        }
      })();
    return (
        <button className={buttonClassName} onClick={(id) => props.onClick()}>
            {props.name}
        </button>
    )
}

export default Button;