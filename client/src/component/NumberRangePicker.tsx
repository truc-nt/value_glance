import { useState } from "react";

import { Button, InputNumber, Space } from "antd";

interface INumberRangePicker {
  min?: number;
  onChange?: (range: [number | null, number | null]) => void;
  onClear?: () => void;
}

const NumberRangePicker = ({ min, onChange, onClear }: INumberRangePicker) => {
  const [range, setRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const handleOnChange = (value: number | null, index: number) => {
    const newRange: [number | null, number | null] = [...range];
    newRange[index] = value;
    const otherIndex = (index + 1) % 2;
    if (
      !newRange[otherIndex] ||
      (newRange[0] && newRange[1] && newRange[0] > newRange[1])
    ) {
      newRange[otherIndex] = value;
    }

    setRange(newRange);
    if (onChange) {
      onChange(newRange);
    }
  };

  const handleOnClear = () => {
    setRange([null, null]);
    if (onClear) {
      onClear();
    }
  };
  return (
    <Space.Compact className="w-full">
      <InputNumber
        className="w-full"
        value={range[0]}
        min={min}
        onChange={(value) => handleOnChange(value, 0)}
      />
      <InputNumber
        className="w-full"
        value={range[1]}
        min={min}
        onChange={(value) => handleOnChange(value, 1)}
      />
      <Button onClick={handleOnClear}>Clear</Button>
    </Space.Compact>
  );
};

export default NumberRangePicker;
