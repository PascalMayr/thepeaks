import styles from '../../styles/components/bookmarkButton/index.module.css'
import BookMarkIcon from '../../assets/bookmark.svg'
import { MouseEventHandler } from 'react'

interface BookmarkButtonProps {
  title: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className={styles.bookmark}>
      <BookMarkIcon /> {title}
    </div>
  )
}

export default BookmarkButton
