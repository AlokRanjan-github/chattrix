import React from "react";
import { Title as HeadTitle, Meta } from "react-head";

const Title = ({
  title = "Chattu",
  description = "This is the chat app called Chattrix",
}) => {
  return (
    <>
      <HeadTitle>{title}</HeadTitle>
      <Meta name="description" content={description} />
    </>
  );
};

export default Title;
