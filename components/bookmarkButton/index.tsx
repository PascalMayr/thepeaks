import styles from '../../styles/components/bookmarkButton/index.module.css'
import BookMarkIcon from '../../assets/bookmark.svg'
import { CSSProperties, MouseEventHandler } from 'react'
import classNames from 'classnames'

interface BookmarkButtonProps {
  title: string
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
  disabled?: boolean
  style?: CSSProperties
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  title,
  onClick,
  className,
  disabled,
  style = {},
}) => {
  return (
    <>
      {disabled ? (
        <div
          style={style}
          className={classNames(styles.bookmark, className, styles.disabled)}
        >
          <BookMarkIcon /> {title}
        </div>
      ) : (
        <div
          onClick={onClick}
          className={classNames(styles.bookmark, className)}
        >
          <BookMarkIcon /> {title}
        </div>
      )}
    </>
  )
}

export default BookmarkButton
