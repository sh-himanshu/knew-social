import Layout from "@/components/Layout";
import { useSurvey } from "@/context/surveyContext";

import { SURVEY } from "@/lib/constants";
import {
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Radio,
  Rating,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useMemo } from "react";
import { MdWarning } from "react-icons/md";
import { TbCheck, TbCircle, TbCircleFilled } from "react-icons/tb";

const SurveyPage = () => {
  const survey = useSurvey();
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
          waitlist: "yes",
        }
      ),
    []
  );

  const surveyForm = useForm({
    initialValues,
    validate: {
      email: (value: any) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value: any) => (value.trim() ? null : "Name can't be empty"),
    },
  });
  const [visible, { close, open }] = useDisclosure(false);
  const handleFormSubmit = surveyForm.onSubmit(async (values) => {
    try {
      open();
      notifications.show({
        id: "form-submit",
        color: "violet",
        loading: true,
        radius: "lg",
        title: "Processing",
        message: "Saving your response",
        autoClose: false,
        withCloseButton: false,
      });
      await axios.post("/api/survey", values);
      notifications.update({
        id: "form-submit",
        color: "teal",
        radius: "lg",
        title: "Saved successfully",
        message: "",
        icon: <TbCheck size="1rem" />,
        autoClose: 3000,
      });
      survey?.setSurveyTaken(true);
    } catch (error) {
      surveyForm.reset();
      close();
    }
  });

  const onButtonClick = () => {
    if (!surveyForm.isValid()) {
      notifications.show({
        id: "invalid-data",
        color: "yellow",
        title: "Form Invalid",
        radius: "lg",
        message: "Please fill the required fields",
        icon: <MdWarning className="text-gray-950" size="1rem" />,
        autoClose: 2000,
      });
    }
  };

  return (
    <Layout>
      <div className=" mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <div className="bg-violet-500 bg-clip-text ">
          <h1 className=" text-center text-5xl font-bold uppercase tracking-tighter text-transparent">
            Survey
          </h1>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="relative space-y-8 p-3 md:space-y-10">
            <LoadingOverlay
              className="rounded-xl"
              visible={visible}
              overlayBlur="0.5"
            />
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
            <Group position="left" mt="lg">
              <Radio.Group
                {...surveyForm.getInputProps("waitlist")}
                name="joinTheWaitList"
                label="We're building a knowledge driven social platform. Join the wait list and be part of this journey!"
                withAsterisk
                size="md"
              >
                <Group mt="xs">
                  <Radio color="violet" value="yes" label="Yes" />
                  <Radio color="violet" value="no" label="No" />
                </Group>
              </Radio.Group>
            </Group>
          </div>
          <Group position="center" mt="lg">
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "#6741d9", to: "#472c98", deg: 45 }}
              radius="md"
              size="lg"
              onClick={onButtonClick}
            >
              SUBMIT
            </Button>
          </Group>
        </form>
      </div>
    </Layout>
  );
};

export default SurveyPage;
