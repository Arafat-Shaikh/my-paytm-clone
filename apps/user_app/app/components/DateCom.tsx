"use client";

const DateCom = () => {
  const date = new Date();
  return <div>{JSON.stringify(date)}</div>;
};

export default DateCom;
