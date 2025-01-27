import FeatureCard from "./FeatureCard"

function HowItWorks() {
  return (
    <div className="flex flex-col items-center  space-y-8">
        <p className="text-6xl ">How it works?</p>
        <p className="text-lg">Externalizing information into your Second Brain gives you clarity and structure.</p>
        <div>
            
            <div className="grid grid-cols-2 mt-5 gap-8">
                <FeatureCard 
                    title="Link Anything"
                    description="Create connections, such as linking a useful reference to a project."
                />
                <FeatureCard 
                    title="Capture Everything"
                    description="Capture new ideas, tasks, and notes to avoid forgetting them."
                />
                <FeatureCard 
                    title="PARA Method"
                    description="Ground your organization using the simple PARA framework from Tiago Forte."
                />

                <FeatureCard 
                    title="Keep Everthing in one place"
                    description="Eliminate the struggle of juggling diferent softwares. Enjoy a single, streamlined experience."
                />


            </div>
        </div>
    </div>
  )
}

export default HowItWorks