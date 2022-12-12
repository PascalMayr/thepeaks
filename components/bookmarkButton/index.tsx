import styles from '../../styles/components/bookmarkButton/index.module.css'
import BookMarkIcon from '../../assets/bookmark.svg'
import BookMarkEmptyIcon from '../../assets/bookmark_empty.svg'
import { CSSProperties, MouseEventHandler } from 'react'
import classNames from 'classnames'

export enum BookmarkIcon {
  empty,
  full,
}

interface BookmarkButtonProps {
  title: string
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
  disabled?: boolean
  style?: CSSProperties
  icon?: BookmarkIcon
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  title,
  onClick,
  className,
  disabled,
  icon = BookmarkIcon.full,
  style = {},
}) => {
  return (
    <>
      {disabled ? (
        <div
          style={style}
          className={classNames(styles.bookmark, className, styles.disabled)}
        >
          {icon === BookmarkIcon.full ? (
            <BookMarkIcon />
          ) : (
            <BookMarkEmptyIcon />
          )}{' '}
          {title}
        </div>
      ) : (
        <div
          onClick={onClick}
          className={classNames(styles.bookmark, className)}
        >
          {icon === BookmarkIcon.full ? (
            <BookMarkIcon />
          ) : (
            <BookMarkEmptyIcon />
          )}{' '}
          {title}
        </div>
      )}
    </>
  )
}

export default BookmarkButton
