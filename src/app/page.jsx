import React from "react";
import CheckinForm from "../../components/CheckinForm";

const page = () => {
  return (
    <div className="w-screen h-1/2 flex justify-center items-center flex-col mx-auto">
      <img className="w-1/3 pt-10" src="/Scania-Logo2.png" alt="Scania Logo" />
      <div className="pt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl">Witamy serdecznie!</h1>
        <p>Podaj dane żeby znaleźć swoje miejsce</p>
        <CheckinForm />
      </div>
    </div>
  );
};

export default page;
