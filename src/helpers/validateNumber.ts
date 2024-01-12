interface IValidateNumber {
  (thing: unknown): number | null;
}

const validateNumber: IValidateNumber = (thing) => {
  if (typeof thing !== 'string' && typeof thing !== 'number') return null;

  const number: number = typeof thing === 'string' ? parseInt(thing) : thing;
  if (isNaN(number)) return null;

  return number;
};

export default validateNumber;
