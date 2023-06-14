"use client"

import React, { FC } from 'react'

interface ItemListProps {
  items: CategoryItem[]
}

const ItemList: FC<ItemListProps> = ({  items}) => {
  return (
    <div>
     {items.map(item=>(
      <div key={item.category}>{item.category}</div>
     ))}
    </div>
  )
}

export default ItemList;