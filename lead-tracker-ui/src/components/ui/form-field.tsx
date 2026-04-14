import { LeadStatus } from "@/lib/types";

type BaseProps = {
  label: string;
  className?: string;
};

type InputProps = BaseProps & {
  type?: "text" | "email" | "number";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string | number;
  maxLength?: number;
};

type SelectProps = BaseProps & {
  type: "select";
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

type TextareaProps = BaseProps & {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
};

type Props = InputProps | SelectProps | TextareaProps;

export function statusOptions() {
  return Object.values(LeadStatus).map((s) => ({
    value: s,
    label: s.replace("_", " "),
  }));
}

export default function FormField(props: Props) {
  const { label, className = "" } = props;

  const renderControl = () => {
    if ("type" in props && props.type === "select") {
      return (
        <select value={props.value} onChange={(e) => props.onChange(e.target.value)} className="input w-full">
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    }

    if ("type" in props && props.type === "textarea") {
      return (
        <textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          rows={props.rows ?? 3}
          maxLength={props.maxLength}
          className="input w-full"
        />
      );
    }

    const { type = "text", value, onChange, required, min, maxLength } = props as InputProps;
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        maxLength={maxLength}
        className="input w-full"
      />
    );
  };

  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-gray-500">{label}</span>
      <div className="mt-1">{renderControl()}</div>
    </label>
  );
}

