import Layout from "@/components/Layout";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-around pt-10">
        <h1 className="text-center text-4xl font-semibold capitalize tracking-tighter text-gray-100 sm:text-5xl lg:text-7xl">
          What do you
          <span className="block bg-violet-600 bg-clip-text text-transparent sm:inline-flex sm:pl-3">
            Know
          </span>
          <span className="sm:block">about knowing ?</span>
        </h1>
        <div className="flex flex-col items-center">
          <h4 className="text-sm text-gray-300">
            Socializing Knowledge, soon.
          </h4>
          <Link href={"/survey"}>
            <Button variant="light" color="violet" radius="xl" size="lg">
              Join the Revelation
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
