'use client';

import * as React from 'react';
import SearchFilter from './_component/SearchFilter';
import SaleTableMain from './_component/TableMain';

export default function SaleTable() {
  return (
    <>
      <SearchFilter />
      <SaleTableMain />
    </>
  );
}
