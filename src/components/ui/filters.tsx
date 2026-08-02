import * as React from "react";

import { cn } from "@/lib/utils";

type FilterValue = string | number | boolean;

export type Filter<T extends FilterValue> = {
  field: string;
  id: string;
  operator: string;
  values: T[];
};

export type FilterFieldConfig<T extends FilterValue> = {
  defaultOperator?: string;
  icon?: React.ReactNode;
  key: string;
  label: string;
  max?: number;
  maxSelections?: number;
  min?: number;
  operators?: Array<{ label: string; value: string }>;
  options?: Array<{ label: string; value: T }>;
  searchable?: boolean;
  step?: number;
  type: "multiselect" | "number" | "select";
};

type FiltersProps<T extends FilterValue> = {
  addButtonText?: string;
  allowMultiple?: boolean;
  fields: FilterFieldConfig<T>[];
  filters: Filter<T>[];
  onChange: (filters: Filter<T>[]) => void;
  radius?: "md" | "sm";
  showSearchInput?: boolean;
  size?: "sm" | "md";
  variant?: "outline" | "solid";
};

function optionValue<T extends FilterValue>(field: FilterFieldConfig<T>, value: string): T {
  const option = field.options?.find((candidate) => String(candidate.value) === value);
  if (option) return option.value;
  return value as T;
}

function numberValue<T extends FilterValue>(value: string): T {
  return (value === "" ? value : Number(value)) as T;
}

export function Filters<T extends FilterValue>({
  addButtonText = "Add filter",
  allowMultiple = true,
  fields,
  filters,
  onChange,
  radius = "sm",
  showSearchInput = true,
  size = "md",
  variant = "outline",
}: FiltersProps<T>) {
  const [fieldToAdd, setFieldToAdd] = React.useState("");
  const [search, setSearch] = React.useState("");
  const activeFields = new Set(filters.map((filter) => filter.field));
  const availableFields = fields.filter((field) => allowMultiple || !activeFields.has(field.key));

  const updateFilter = (id: string, update: Partial<Filter<T>>) => {
    onChange(filters.map((filter) => (filter.id === id ? { ...filter, ...update } : filter)));
  };

  const addFilter = (fieldKey: string) => {
    const field = fields.find((candidate) => candidate.key === fieldKey);
    if (!field || (!allowMultiple && activeFields.has(field.key))) return;

    const firstOption = field.options?.[0]?.value;
    const values =
      field.type === "multiselect"
        ? []
        : field.type === "number"
          ? [numberValue<T>("")]
          : firstOption === undefined
            ? []
            : [firstOption];
    const operator = field.defaultOperator ?? field.operators?.[0]?.value ?? "is";

    onChange([...filters, { field: field.key, id: field.key, operator, values }]);
    setFieldToAdd("");
  };

  const baseControlClassName = cn(
    "h-8 rounded-md border bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring/30",
    size === "sm" ? "text-[11px]" : "text-xs",
    radius === "md" ? "rounded-md" : "rounded-sm",
    variant === "solid" && "bg-muted/30",
  );

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
      {showSearchInput ? (
        <input
          className={cn(baseControlClassName, "min-w-32")}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search filters"
          value={search}
        />
      ) : null}

      {filters.map((filter) => {
        const field = fields.find((candidate) => candidate.key === filter.field);
        if (!field || (search && !field.label.toLowerCase().includes(search.toLowerCase())))
          return null;

        return (
          <div
            key={filter.id}
            className="flex min-w-0 flex-wrap items-center gap-1 rounded-md border bg-background p-1"
          >
            <span className="flex items-center gap-1 px-1 text-[11px] font-medium text-muted-foreground">
              {field.icon}
              {field.label}
            </span>
            {field.operators && field.operators.length > 1 ? (
              <select
                aria-label={`${field.label} operator`}
                className={baseControlClassName}
                onChange={(event) => updateFilter(filter.id, { operator: event.target.value })}
                value={filter.operator}
              >
                {field.operators.map((operator) => (
                  <option key={operator.value} value={operator.value}>
                    {operator.label}
                  </option>
                ))}
              </select>
            ) : null}
            {field.type === "select" ? (
              <select
                aria-label={field.label}
                className={baseControlClassName}
                onChange={(event) =>
                  updateFilter(filter.id, { values: [optionValue(field, event.target.value)] })
                }
                value={filter.values[0] === undefined ? "" : String(filter.values[0])}
              >
                {field.options?.map((option) => (
                  <option key={String(option.value)} value={String(option.value)}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "multiselect" ? (
              <div className="flex max-w-full flex-wrap items-center gap-1 px-1">
                {field.options?.map((option) => {
                  const checked = filter.values.some(
                    (value) => String(value) === String(option.value),
                  );
                  return (
                    <label
                      key={String(option.value)}
                      className="flex items-center gap-1 rounded-sm px-1.5 py-1 text-[11px] hover:bg-muted"
                    >
                      <input
                        checked={checked}
                        disabled={
                          !checked &&
                          field.maxSelections !== undefined &&
                          filter.values.length >= field.maxSelections
                        }
                        onChange={(event) => {
                          const nextValues = event.target.checked
                            ? [...filter.values, option.value]
                            : filter.values.filter(
                                (value) => String(value) !== String(option.value),
                              );
                          updateFilter(filter.id, { values: nextValues });
                        }}
                        type="checkbox"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <input
                  aria-label={`${field.label} value`}
                  className={cn(baseControlClassName, "w-20")}
                  max={field.max}
                  min={field.min}
                  onChange={(event) =>
                    updateFilter(filter.id, {
                      values: [numberValue<T>(event.target.value), ...filter.values.slice(1)],
                    })
                  }
                  placeholder="Value"
                  step={field.step}
                  type="number"
                  value={filter.values[0] === undefined ? "" : String(filter.values[0])}
                />
                {filter.operator === "between" || filter.operator === "not_between" ? (
                  <input
                    aria-label={`${field.label} second value`}
                    className={cn(baseControlClassName, "w-20")}
                    max={field.max}
                    min={field.min}
                    onChange={(event) =>
                      updateFilter(filter.id, {
                        values: [
                          filter.values[0] ?? numberValue<T>(""),
                          numberValue<T>(event.target.value),
                        ],
                      })
                    }
                    placeholder="And"
                    step={field.step}
                    type="number"
                    value={filter.values[1] === undefined ? "" : String(filter.values[1])}
                  />
                ) : null}
              </div>
            )}
            <button
              aria-label={`Remove ${field.label} filter`}
              className="grid size-7 place-items-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => onChange(filters.filter((candidate) => candidate.id !== filter.id))}
              type="button"
            >
              ×
            </button>
          </div>
        );
      })}

      {availableFields.length ? (
        <select
          aria-label={addButtonText}
          className={cn(baseControlClassName, "max-w-36 font-medium")}
          onChange={(event) => addFilter(event.target.value)}
          value={fieldToAdd}
        >
          <option value="">{addButtonText}</option>
          {availableFields.map((field) => (
            <option key={field.key} value={field.key}>
              {field.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
