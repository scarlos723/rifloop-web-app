export const fetchRandomNumber = async (max: number): Promise<string> => {
  const response = await fetch(
    `https://www.random.org/integers/?num=1&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
  );
  const randomNumber = await response.text();
  return String(Number(randomNumber)).padStart(3, "0"); // Formatea con ceros a la izquierda
};
