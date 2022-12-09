import styles from '../../styles/components/search/index.module.css'
import SearchIcon from '../../assets/search.svg'
import { ChangeEvent, useCallback, useState } from 'react'
import classNames from 'classnames'

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [focused, setFocused] = useState<boolean>(false)
  const handleFocus = useCallback(() => setFocused(!focused), [focused])
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  )
  return (
    <div
      onClick={handleFocus}
      className={classNames(styles.search, focused && styles.focused)}
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
            onBlur={handleFocus}
          />
        )}
        <SearchIcon className={styles.icon} />
      </div>
    </div>
  )
}

export default Search
