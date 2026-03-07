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
