const birthday = new Date(1999, 8, 25);

export const getAge = (): number => {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthday.getFullYear();

  if (
    currentDate.getMonth() < birthday.getMonth() ||
    (currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() < birthday.getDate())
  ) {
    age -= 1;
  }

  return age;
};

const Age = () => <span>{getAge()}</span>;

export default Age;
