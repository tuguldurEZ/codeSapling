"use client";
import { useState } from "react";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export type StepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

const SignInSteps = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  return (
    <div className="flex flex-col items-center gap-[24px]">
      {step === 1 && <FirstStep setStep={setStep}/>}
      {step === 2 && <SecondStep />}
      {step === 3 && <ThirdStep />}
    </div>
  );
};

export default SignInSteps;
