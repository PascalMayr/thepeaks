import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/components/listHeader/index.module.css'
import BookmarkButton from '../bookmarkButton'
import Select from '../select'

interface ListHeaderProps {
  title: string
  hideBookmarkButton?: boolean
}

const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  hideBookmarkButton,
}) => {
  const router = useRouter()
  const sortOptions: string[] = ['Newest first', 'Oldest first']
  const selectHandler = (selectedIndex: number) => {
    const oldOrderBy = router.query['order-by']
    const newOrderBy = sortOptions[selectedIndex].split(' ')[0].toLowerCase()
    /* update the page only if the sort option changes, avoid rendering updates */
    if (
      (oldOrderBy && newOrderBy !== oldOrderBy) ||
      (!oldOrderBy && selectedIndex > 0)
    ) {
      router.push({ query: { ...router.query, ['order-by']: newOrderBy } })
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles['bookmark-container']}>
        {!hideBookmarkButton && (
          <Link href="/bookmarks">
            <BookmarkButton title="View Bookmark" />
          </Link>
        )}
        <Select options={sortOptions} onSelect={selectHandler} />
      </div>
    </div>
  )
}

export default ListHeader
