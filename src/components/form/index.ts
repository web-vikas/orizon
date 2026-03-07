import { useWatch } from "react-hook-form";
import { InternalForm } from "./Form";
import { FormItem } from "./FormItem";
import { FormList } from "./FormList";
import { FormErrorList } from "./FormErrorList";
import { useForm } from "./useForm";

// ---------------------------------------------------------------------------
// Compound component: Form.Item, Form.List, Form.ErrorList, Form.useForm, Form.useWatch
// ---------------------------------------------------------------------------

type FormComponent = typeof InternalForm & {
  Item: typeof FormItem;
  List: typeof FormList;
  ErrorList: typeof FormErrorList;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
};

/**
 * Form component for data entry and validation.
 *
 * Sub-components: `Form.Item`, `Form.List`, `Form.ErrorList`.
 * Hooks: `Form.useForm`, `Form.useWatch`.
 *
 * @example
 * ```tsx
 * const form = Form.useForm();
 * <Form form={form} onFinish={console.log}>
 *   <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
 *     <Input />
 *   </Form.Item>
 *   <button type="submit">Submit</button>
 * </Form>
 * ```
 */
const Form = InternalForm as FormComponent;
Form.Item = FormItem;
Form.List = FormList;
Form.ErrorList = FormErrorList;
Form.useForm = useForm;
Form.useWatch = useWatch;

export { Form };

// Re-export types
export type {
  FormProps,
  FormItemProps,
  FormListProps,
  FormErrorListProps,
  FormLayout,
  FormSize,
  FormVariant,
  FormRequiredMark,
  Rule,
  UseFormOptions,
  FormContextValue,
  FormListField,
  FormListOperation,
} from "./types";
