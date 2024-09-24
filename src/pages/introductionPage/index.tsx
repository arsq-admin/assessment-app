import { useContext } from 'react';
import { AssessmentContext } from "@/context";

export const IntroductionPage = () => {
  const { config} = useContext(AssessmentContext);
  return (
    <div>
    <div>Hello World</div>
    <h1>{config?.name}</h1>


    </div>
    
  )
}