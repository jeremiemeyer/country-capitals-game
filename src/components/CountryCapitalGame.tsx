import { useState } from "react"
import { useEffect } from "react"

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>
}) {
  const countries = Object.keys(data)
  const capitals = Object.values(data)
  const [options, setOptions] = useState(
    [...countries, ...capitals].map((option) => [option, ""])
  )
  const [isGameOver, setIsGameOver] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  useEffect(() => {
    setIsGameOver(false)
    console.log("game over ? ", isGameOver)
    setOptions(
      [...countries, ...capitals]
        .map((option) => [option, ""])
        .sort(() => Math.random() - 0.5)
    )
  }, [isGameOver])

  function getMatchingPair(option: any) {
    if (countries.findIndex((el) => el === option) !== -1) {
      const index = countries.findIndex((el) => el === option.toString())
      return capitals[index]
    } else {
      const index = capitals.findIndex((el) => el === option.toString())
      return countries[index]
    }
  }

  function handleRetry() {
    setAttemptsCount(0)
    setIsGameOver(true)
  }

  function handleClick(optionSelected: string) {
    setOptions(
      [...options].map(([option, value]) => [
        option,
        option === optionSelected[0] ? "selected" : value,
      ])
    )

    const otherSelectedId = options.findIndex((el) => el[1] === "selected")

    if (otherSelectedId === -1) {
      return
    } else {
      // Si l'option sélectionnée correspond
      if (optionSelected[0] === getMatchingPair(options[otherSelectedId][0])) {
        setOptions(
          options.filter(
            (opt) =>
              opt[0] !== optionSelected[0] &&
              opt[0] !== options[otherSelectedId][0]
          )
        )
      } else {
        setOptions(
          [...options].map(([opt, value]) => [
            opt,
            opt === optionSelected[0] || opt === options[otherSelectedId][0]
              ? "wrong"
              : value,
          ])
        )
        setAttemptsCount(attemptsCount + 1)
        setIsGameOver(true)
      }
    }
  }

  return (
    <>
      <p className="text-white text-3xl my-6">Attempts: {attemptsCount}</p>

      <button className="mb-24 text-black" onClick={handleRetry}>Retry</button>

      {options.length === 0 ? (
        <p className="text-[1.8rem]">
          Congratulations! You succeeded{" "}
          {attemptsCount === 0
            ? "on your first try!"
            : attemptsCount === 1
            ? "in 1 attempt!"
            : `in ${attemptsCount} attempts!`}
        </p>
      ) : (
        <>
          <div className="space-x-2">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleClick(option)}
                className={`${
                  option[1] === "selected"
                    ? "selected"
                    : option[1] === "wrong"
                    ? "wrong"
                    : ""
                } text-black`}
              >
                {option[0]}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
