import { Form, ActionPanel, Action, showToast } from "@raycast/api";
import fetch from "node-fetch";

type Values = {
  textfield: string;
  textarea: string;
};

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";

export default function Command() {
  const handleSubmit = async (values: Values) => {
    const data = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log(data);
    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="body" title="Note text" defaultValue="" />
    </Form>
  );
}
