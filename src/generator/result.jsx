import { useEffect } from "react";
const ResultGenerator = ({ resultForm, company, setBroadcast }) => {
  useEffect(() => {
    const message = gen(company, resultForm);
    setBroadcast(message, resultForm.result);
  }, [resultForm, company, setBroadcast]);
  return null;
};

const gen = (company, resultForm) => {
  let message = `>>>>> ${company} <<<<<\n\n`;
  if (!resultForm.result) {
    message += "Unfortunately, no student has been recruited by the company.";
  } else {
    message += `Congratulations!\n\nThe following students have been recruited by the company.\n\n`;
    const students = resultForm.students
      .map((name, idx) => `${idx + 1}. ${name}`)
      .join("\n");
    message += students;
  }
  return message;
};
export default ResultGenerator;
