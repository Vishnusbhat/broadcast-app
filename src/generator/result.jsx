import { useEffect } from "react";
const ResultGenerator = ({ resultForm, company, setBroadcast, initForm }) => {
  useEffect(() => {
    let message = gen(company, resultForm, initForm);
    message += "\n\nRegards,\nTPO";
    setBroadcast(message);
  }, [resultForm, company, setBroadcast, initForm]);
  return null;
};

const gen = (company, resultForm, initForm) => {
  let message = "";
  if (initForm.type === "On-Campus")
  message += `>>>>> ${company} <<<<<\n\n`;
else message += `>>>>> *${company} Off-Campus* <<<<<\n\n`;
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
