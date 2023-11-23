interface IValidateNumber {
  (thing: unknown): number | null;
}

const validateNumber: IValidateNumber = (thing) => {
  if (typeof thing !== 'string') return null;

  const number: number = parseInt(thing);
  if (isNaN(number)) return null;

  return number;
};

export default validateNumber;
