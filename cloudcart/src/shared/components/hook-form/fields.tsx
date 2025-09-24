import { RHFRating } from "./rhf-rating";
import { RHFTextField } from "./rhf-text-field";
import { RHFRadioGroup } from "./rhf-radio-group";
import { RHFSelect, RHFMultiSelect } from "./rhf-select";
import { RHFCheckbox, RHFMultiCheckbox } from "./rhf-checkbox";

// ----------------------------------------------------------------------

export const Field = {
  Select: RHFSelect,
  Rating: RHFRating,
  Text: RHFTextField,
  Checkbox: RHFCheckbox,
  RadioGroup: RHFRadioGroup,
  MultiSelect: RHFMultiSelect,
  MultiCheckbox: RHFMultiCheckbox,
};
