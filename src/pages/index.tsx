import Layout from "@/components/Layout";
import { useSurvey } from "@/context/surveyContext";

import { Button } from "@mantine/core";
import Link from "next/link";
import { MdKeyboardArrowRight as RightArrow } from "react-icons/md";

export default function IndexPage() {
  const survey = useSurvey();
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-around pt-10">
        <h1 className="flex flex-col items-center text-center  text-5xl font-semibold capitalize tracking-tighter text-gray-100 sm:text-5xl md:text-6xl lg:text-8xl">
          <span>{survey?.taken ? "Knowledge." : "What do you"}</span>
          <span className="bg-violet-600 bg-clip-text px-2 text-transparent sm:inline-flex sm:pl-3">
            {survey?.taken ? "Socialised." : "Know"}
          </span>
          <span>{survey?.taken ? "Soon." : "about knowing?"}</span>
        </h1>
        <div className="flex flex-col items-center">
          {survey?.taken ? (
            <h4 className=" font-medium text-green-500 sm:text-lg md:text-xl">
              ❤️ Thank you for your contribution!
            </h4>
          ) : (
            <>
              <h4 className="text-xs text-gray-300  sm:text-base">
                {`Help us find it out by taking a quick survey :)`}
              </h4>
              <Link href={"/survey"}>
                <Button variant="light" color="violet" radius="xl" size="lg">
                  <RightArrow className="h-8 w-8" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
