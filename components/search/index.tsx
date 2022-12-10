import styles from '../../styles/components/search/index.module.css'
import SearchIcon from '../../assets/search.svg'
import { ChangeEvent, useCallback, useState } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [focused, setFocused] = useState<boolean>(false)
  const handleFocus = useCallback(() => {
    if (!focused) setFocused(true)
  }, [focused])
  const handleUnfocus = useCallback(() => {
    if (focused) setFocused(false)
  }, [focused])
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((searchValue: string) => {
      router.push({
        query: { ...router.query, q: searchValue },
        pathname: '/search',
      })
    }, 700),
    [router]
  )
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      debouncedSave(value)
    },
    [debouncedSave]
  )

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value),
    [handleSearch]
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
            onChange={onChange}
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
