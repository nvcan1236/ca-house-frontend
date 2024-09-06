import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = {
  label: string;
  value: string;
};

const SelectBox = ({
  options,
  onSelectChange,
}: {
  options: Option[];
  onSelectChange: () => void;
}) => {
  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-full mb-2 ">
        <SelectValue placeholder="Tìm trọ" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
