import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface surveyContextValue {
  taken: boolean;
  setSurveyTaken: React.Dispatch<React.SetStateAction<boolean>>;
}
const surveyContext = createContext<surveyContextValue | undefined>(undefined);

interface SurveyContextProviderProps {
  children: ReactNode;
}

const SurveyContext = ({ children }: SurveyContextProviderProps) => {
  const [taken, setSurveyTaken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (taken) {
      setTimeout(() => router.push("/"), 2500);
    }
  }, [router, taken]);

  return (
    <surveyContext.Provider
      value={{
        taken,
        setSurveyTaken,
      }}
    >
      {children}
    </surveyContext.Provider>
  );
};

export default SurveyContext;
export const useSurvey = () => useContext(surveyContext);
