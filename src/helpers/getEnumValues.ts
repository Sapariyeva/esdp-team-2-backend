const getEnumValues = (enumObj: Record<string, string>): string => Object.values(enumObj).join(', ');

export default getEnumValues;
