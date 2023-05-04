import Layout from "@/components/Layout";
import { useSurvey } from "@/context/surveyContext";

import { Button, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import { MdKeyboardArrowRight as RightArrow } from "react-icons/md";

export default function IndexPage() {
  const survey = useSurvey();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const surveyTaken = localStorage.getItem("surveyTaken");
      survey?.setSurveyTaken(surveyTaken === "True" ? true : false);
    }
  }, [survey]);

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-around pt-10">
        <h1 className="flex flex-col items-center text-center  text-5xl font-semibold capitalize tracking-tighter text-gray-100 sm:text-5xl md:text-6xl lg:text-8xl">
          <span>{survey?.taken ? "Knowledge." : "What do you"}</span>
          <Text
            variant="gradient"
            className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] px-2 hover:animate-none"
            gradient={{
              from: "rgb(167 139 250)",
              to: "rgb(91 33 182)",
              deg: 45,
            }}
          >
            {survey?.taken ? "Socialized." : "Know"}
          </Text>
          <span>{survey?.taken ? "Soon." : "about knowing?"}</span>
        </h1>
        <div className="flex flex-col items-center">
          {survey?.taken ? (
            <h4 className="font-medium text-green-500 sm:text-lg md:text-xl">
              Thank you for your contribution!
            </h4>
          ) : (
            <>
              <h4 className="text-xs  text-gray-300 sm:text-base">
                {`Help us find it out by taking a quick survey`}
              </h4>
              <Link href={"/survey"}>
                <Button
                  variant="light"
                  className="animate-bounce hover:animate-none hover:bg-violet-900"
                  color="violet"
                  radius="xl"
                  size="lg"
                  mt="lg"
                >
                  <RightArrow className="h-8 w-8 hover:text-violet-50" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
