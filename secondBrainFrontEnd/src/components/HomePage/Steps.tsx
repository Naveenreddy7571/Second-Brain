import Step from "./Step";
import Arrow from "../../assets/Arrow";

function Steps() {
  return (
    <div className="flex flex-col items-center mt-20 space-y-10 justify-around mb-20">
      {/* Heading Section */}
      <div className="text-center">
        <p className="text-4xl font-bold mb-4">Your Second Brain ready in 1, 2, 3.</p>
        <p className="text-md text-gray-600">Skip hours of learning to use your Second Brain.</p>
      </div>

      <div className="flex items-center space-x-10">
        <Step
          number="1"
          title="SignUp"
          description="Open the world By clicking on the signup Button."
        />
        <Arrow />
        <Step
          number="2"
          title="Sign in"
          description="Follow our full video walkthrough to complete the initial setup."
        />
        <Arrow />
        <Step
          number="3"
          title="Fuck It up"
          description="After sign in your second brain power is on use it for full potential."
        />
      </div>
    </div>
  );
}

export default Steps;
