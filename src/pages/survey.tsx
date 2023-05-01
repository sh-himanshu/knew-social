import Layout from "@/components/Layout";
import { SURVEY } from "@/lib/constants";
import {
  Button,
  Checkbox,
  Group,
  Radio,
  Rating,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo } from "react";
import { TbCircle, TbCircleFilled } from "react-icons/tb";

const SurveyPage = () => {
  const initialValues = useMemo(
    () =>
      SURVEY.reduce<{
        [key: string]: string | Array<string> | number;
      }>(
        (values, current, index) => {
          if (current.type === "choice") {
            values[`q-${index + 1}`] = current.multiple ? [] : "";
            if (current.other) {
              values[`q-${index + 1}-other`] = "";
            }
          } else if (current.type === "rating") {
            for (let j = 0; j < current.options.length; j++) {
              values[`q-${index + 1}-${j}`] = 0;
            }
          }

          return values;
        },
        {
          name: "",
          email: "",
        }
      ),
    []
  );

  const surveyForm = useForm({ initialValues });
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <div className="bg-violet-500 bg-clip-text ">
          <h1 className=" text-center text-5xl font-bold uppercase tracking-tighter text-transparent">
            Survey
          </h1>
        </div>
        <form
          className="space-y-8 md:space-y-10"
          onSubmit={surveyForm.onSubmit((values) => console.log(values))}
        >
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your Name"
            {...surveyForm.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...surveyForm.getInputProps("email")}
          />
          {SURVEY.map((question, i) => (
            <div className="text-gray-100" key={"q-" + i}>
              {question.type === "choice" ? (
                <>
                  {question.multiple ? (
                    <Checkbox.Group
                      size="sm"
                      label={`Q${i + 1}. ${question.title}`}
                      description={question.description}
                      {...surveyForm.getInputProps(`q-${i + 1}`, {
                        type: "checkbox",
                      })}
                    >
                      <Stack mt="xs" className="sm:ml-4">
                        {question.options.map((option, j) => (
                          <Checkbox
                            color="violet"
                            value={`${j}`}
                            key={`op_${i}_${j}`}
                            label={option}
                          />
                        ))}
                      </Stack>
                    </Checkbox.Group>
                  ) : (
                    <Radio.Group
                      size="sm"
                      label={`Q${i + 1}. ${question.title}`}
                      {...surveyForm.getInputProps(`q-${i + 1}`)}
                      description={question.description}
                    >
                      <Stack mt="xs" className="sm:ml-4">
                        {question.options.map((option, j) => (
                          <Radio
                            color="violet"
                            value={`${j}`}
                            key={`op_${i}_${j}`}
                            label={option}
                          />
                        ))}
                      </Stack>
                    </Radio.Group>
                  )}
                  {question.other && (
                    <TextInput
                      size="sm"
                      mt="xs"
                      className="sm:ml-4"
                      placeholder="Type here"
                      label={question.other}
                      variant="filled"
                      {...surveyForm.getInputProps(`q-${i + 1}-other`, {
                        type: "input",
                      })}
                    />
                  )}
                </>
              ) : question.type === "rating" ? (
                <Stack>
                  <Text fw={500} size="sm" color="#c1c2c5">
                    Q{i + 1}. {question.title}
                  </Text>
                  {question.options.map((option, k) => (
                    <Group key={`rating_${i}_${k}`} className="sm:ml-4">
                      <Rating
                        emptySymbol={<TbCircle className="text-violet-800" />}
                        fullSymbol={
                          <TbCircleFilled className="text-[#6741d9] hover:text-violet-500" />
                        }
                        size="sm"
                        fractions={1}
                        {...surveyForm.getInputProps(`q-${i + 1}-${k}`, {
                          type: "input",
                        })}
                      />
                      <Text color="#c1c2c5" size="sm">
                        {option}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              ) : (
                <></>
              )}
            </div>
          ))}
          <Group position="center" mt="md">
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "#6741d9", to: "#472c98", deg: 45 }}
              radius="xl"
              size="lg"
            >
              Submit
            </Button>
          </Group>
        </form>
      </div>
    </Layout>
  );
};

export default SurveyPage;
