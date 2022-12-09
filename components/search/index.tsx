import styles from '../../styles/components/search/index.module.css'
import SearchIcon from '../../assets/search.svg'
import { ChangeEvent, useCallback, useState } from 'react'
import classNames from 'classnames'

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [focused, setFocused] = useState<boolean>(false)
  const handleFocus = useCallback(() => {
    if (!focused) setFocused(true)
  }, [focused])
  const handleUnfocus = useCallback(() => setFocused(false), [])
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  )
  return (
    <div
      className={classNames(styles.search, focused && styles.focused)}
      tabIndex={0}
      onFocus={handleFocus}
    >
      <div className={styles.container}>
        {focused && (
          <input
            autoFocus
            placeholder="Search all news"
            className={styles.input}
            onChange={handleSearch}
            type="text"
            value={search}
            onBlur={handleUnfocus}
          />
        )}
        <SearchIcon className={styles.icon} />
      </div>
    </div>
  )
}

export default Search
