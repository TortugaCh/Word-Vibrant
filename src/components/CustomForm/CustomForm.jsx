import React from "react";
import { Form, Input } from "antd";

const CustomForm = ({ form, initialValues, inputs }) => {
  console.log("inputs", inputs);
  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
      {inputs.map((input) => (
        <Form.Item
          key={input.name}
          label={input.label}
          name={input.name}
          rules={input.rules}
        >
          {input.type === "text" && <Input />}
          {input.type === "number" && <Input type="number" />}
        </Form.Item>
      ))}
    </Form>
  );
};

export default CustomForm;
