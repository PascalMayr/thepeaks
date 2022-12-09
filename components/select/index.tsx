import styles from '../../styles/components/select/index.module.css'
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import classNames from 'classnames'
import Arrow from '../../assets/arrow.svg'

interface SelectProps {
  options: string[]
  onSelect: (selectedIndex: number) => void
}

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
  const [focused, setFocused] = useState(false)
  const handleFocus = useCallback(() => {
    if (!focused) setFocused(true)
  }, [focused])
  const handleUnfocus = useCallback(() => setFocused(false), [])

  const [selected, setSelected] = useState<number>(0)
  const handleSelect = useCallback(
    (e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
      const selectedIndex = options.indexOf(e.target.innerText)
      setSelected(selectedIndex)
      onSelect(selectedIndex)
      handleUnfocus()
    },
    [setSelected, options, onSelect, handleUnfocus]
  )

  const handleSelectBlur = useCallback(() => {
    if (focused) handleUnfocus()
  }, [handleUnfocus, focused])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      /* mimic behavior from native select and open the select on space press */
      if (e.key === ' ') {
        handleFocus()
      }
    },
    [handleFocus]
  )

  /* avoid rerendering when focusing */
  const Options = useMemo(
    () =>
      options.map((option) => (
        <div className={styles.item} onClick={handleSelect} key={option}>
          {option}
        </div>
      )),
    [options, handleSelect]
  )
  return (
    <div
      tabIndex={0}
      onBlur={handleSelectBlur}
      onClick={handleFocus}
      onKeyDown={handleKeyDown}
      className={classNames(styles.container, focused && styles.open)}
    >
      {!focused ? Options[selected] : Options}
      <Arrow className={classNames(styles.arrow, focused && styles.rotate)} />
    </div>
  )
}

export default Select
