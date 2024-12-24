import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/action.ts';
import { SortTypes } from '../../const.ts';

function OffersSorting() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  const sortBy = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const handleSelectSort = (type: SortTypes) => {
    dispatch(changeSortType(type));
    setIsOpen(false);
  };

  const handleOpenSortList = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by &nbsp;</span>
      <span
        ref={ref}
        onClick={handleOpenSortList}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sortBy}
        <svg
          className={classNames(
            { 'places__sorting-arrow-down': !isOpen },
            { 'places__sorting-arrow-up': isOpen },
          )}
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {Object.values(SortTypes).map((option) => (
          <li
            key={option}
            className={classNames('places__option', {
              'places__option--active': option === sortBy,
            })}
            tabIndex={0}
            onClick={() => handleSelectSort(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersSorting;
