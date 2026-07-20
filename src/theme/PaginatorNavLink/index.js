import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function PaginatorNavLink({
  permalink,
  title,
  subLabel,
  isNext,
}) {
  return (
    <Link
      autoAddBaseUrl={false}
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
}
