import React from "react"

interface SwitchGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

const SwitchGroup: React.FC<SwitchGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded bg-white">
      {options.map((option, idx) => {
        const isSelected = value === option
        const isFirst = idx === 0
        const isLast = idx === options.length - 1
        return (
          <button
            key={option}
            type="button"
            className={
              `px-3 py-1 text-sm font-semibold transition-colors ` +
              (isFirst ? "rounded-l " : "") +
              (isLast ? "rounded-r " : "") +
              (isSelected
                ? "bg-white text-black "
                : "bg-zinc-600 text-white hover:bg-zinc-700 ")
            }
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default SwitchGroup
