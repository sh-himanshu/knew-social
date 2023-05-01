import Layout from "@/components/Layout";
import { Button, Stack } from "@mantine/core";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-around pt-14">
        <h1 className="flex flex-col items-center justify-center text-7xl font-semibold capitalize tracking-tighter text-gray-100">
          What do you{" "}
          <span className="block bg-violet-500 bg-clip-text px-1 text-transparent sm:inline">
            know
          </span>
          about knowing ?
        </h1>
        <Stack>
          <h4 className="text-white">Socializing Knowledge, soon.</h4>
          <Link href={"/survey"}>
            <Button variant="light" color="violet" radius="xl" size="lg">
              Join the Revelation
            </Button>
          </Link>
        </Stack>
      </div>
    </Layout>
  );
}
