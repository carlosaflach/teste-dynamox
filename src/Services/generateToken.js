
const rand = () => {
  return Math.random().toString(36).substr(2);
};

const createToken = () => {
  return rand() + rand();
};



export default createToken;



