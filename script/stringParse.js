//Parses input string, returns array of values:
// '(3 + 2) * 6' == ['(', '3', '+', '2', ')', '*', '6']
const stringParse = (string) => {
  const regex =
    /(^\-?\d|(?<=\d\D)\-?\d*\.?\d*|\b\w*[\.]?\w+\b|[\(\)\+\*\-\/])/g;
  return string.split(regex).filter((val) => val !== "");
};

export default stringParse;
