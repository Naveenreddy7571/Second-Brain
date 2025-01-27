interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 mt-10 justify-around hover:translate-y-5 transition-transform duration-300 delay-200 shadow-lg p-3 m-5">
      <div className="text-gray-300 text-6xl font-bold text-wrap">{number}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-500 text-wrap">{description}</p>
    </div>
  );
}

export default Step;
