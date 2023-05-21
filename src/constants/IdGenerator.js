const baseString =
  'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
export const IdGenerator = () => {
  let id = '';
  for (let i = 0; i < 20; i++) {
    const randomCharacter =
      baseString[Math.floor(Math.random() * baseString.length)];
    id += randomCharacter;
  }
  return id;
};
