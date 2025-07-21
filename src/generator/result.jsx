import { useEffect } from "react";

const ResultGenerator = ({ resultForm, company, setBroadcast }) => {
  console.log(resultForm.result);
  useEffect(() => {
    const message = gen(company, resultForm.result);
    setBroadcast(message, resultForm.result);
  }, [resultForm.result, company, setBroadcast]);

  useEffect(() => {
    console.log("Inside useEffect. result =", resultForm.result);
  }, [resultForm.result]);

  return null;
};
const gen = (company, result) => {
  let message = `>>>>> ${company} <<<<<\n\n`;
    if (!result) {
        message += "No result available.";
    }
    else {
       message += "No students selected.";
    }
    return <pre>{message}</pre>;
};
export default ResultGenerator;
