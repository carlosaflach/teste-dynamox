const formatDate = (date) => {
  const dataArr = date.split('-');
  const [year, month, day] = dataArr;
  return `${day}/${month}/${year}`
};

const validateDate = (manDate, expDate) => {
  const manufacturingDate = new Date(manDate);
  const expirationDate = new Date(expDate);
  const isValid = expirationDate > manufacturingDate;
  return isValid;
};

export { formatDate, validateDate}
