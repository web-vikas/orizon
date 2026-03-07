import { InternalInput } from "./Input";
import { Password } from "./Password";
import { TextArea } from "./TextArea";
import { Search } from "./Search";
import { OTP } from "./OTP";

type InputComponent = typeof InternalInput & {
  Password: typeof Password;
  TextArea: typeof TextArea;
  Search: typeof Search;
  OTP: typeof OTP;
};

/**
 * Input component for text entry.
 *
 * Sub-components: `Input.Password`, `Input.TextArea`, `Input.Search`, `Input.OTP`.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter text" />
 * <Input prefix={<UserIcon />} allowClear />
 * <Input.Password placeholder="Password" />
 * <Input.TextArea rows={4} />
 * <Input.Search enterButton onSearch={console.log} />
 * <Input.OTP length={6} />
 * ```
 */
const Input = InternalInput as InputComponent;
Input.Password = Password;
Input.TextArea = TextArea;
Input.Search = Search;
Input.OTP = OTP;

export { Input };
export type {
  InputProps,
  InputPasswordProps,
  InputTextAreaProps,
  InputSearchProps,
  InputOTPProps,
  InputSize,
  InputStatus,
  InputVariant,
  AutoSizeConfig,
  ShowCountInfo,
  ShowCountFormatter,
} from "./types";
