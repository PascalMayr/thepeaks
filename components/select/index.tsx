import styles from '../../styles/components/select/index.module.css'
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import classNames from 'classnames'
import Arrow from '../../assets/arrow.svg'
import { useRouter } from 'next/router'

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
      e.preventDefault()
      /* mimic behavior from native select and open the select on space press */
      if (e.key === ' ') {
        handleFocus()
      }
    },
    [handleFocus]
  )

  const handleArrowClick = useCallback(() => {
    if (focused) handleUnfocus()
  }, [focused, handleUnfocus])

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

  // set selecterd when page reloads
  const router = useRouter()
  useEffect(() => {
    if (router.query['order-by'] === 'newest' || !router.query['order-by'])
      setSelected(0)
    if (router.query['order-by'] === 'oldest') setSelected(1)
  }, [router])

  return (
    <div
      tabIndex={0}
      onBlur={handleSelectBlur}
      onClick={handleFocus}
      onKeyDown={handleKeyDown}
      className={classNames(styles.container, focused && styles.open)}
    >
      {!focused ? (
        <div className={styles.item}>{options[selected]}</div>
      ) : (
        Options
      )}
      <Arrow
        onClick={handleArrowClick}
        className={classNames(styles.arrow, focused && styles.rotate)}
      />
    </div>
  )
}

export default Select
