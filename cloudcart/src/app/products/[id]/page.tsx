import React from "react";

interface props {
  params: { id: string };
}
const pages = ({ params }: props) => {
  const { id } = params;
  return <div>{id}</div>;
};

export default pages;
