import React from "react";
import { Form, Input, Select } from "antd";

const CustomForm = ({ form, inputs, editingItem }) => {
  console.log("inputs", inputs);
  console.log("editingItem", editingItem);
  return (
    <Form form={form} layout="vertical">
      {inputs.map((input) => {
        const { name, label, type, options, rules } = input;

        if (type === "select") {
          return (
            <Form.Item key={name} name={name} label={label} rules={rules}>
              <Select>
                {options.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        if (editingItem && input.type === "password") {
          return null;
        }

        return (
          <Form.Item key={name} name={name} label={label} rules={rules}>
            <Input type={type} />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default CustomForm;
