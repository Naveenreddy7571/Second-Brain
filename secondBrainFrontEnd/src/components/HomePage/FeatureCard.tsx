interface Feature {
  title: string;
  description: string;
}

function FeatureCard(props: Feature) {
  return (
    <div className=" rounded-md space-y-8 flex flex-col items-center p-5 hover:translate-y-3 transition-transform duration-300 delay-200 shadow-lg m-5">
      <h1 className="text-4xl">{props.title}</h1>
      <p className='text-md text-wrap text-center'>{props.description}</p>
    </div>
  );
}

export default FeatureCard;
