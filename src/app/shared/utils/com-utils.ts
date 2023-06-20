export const updateItemInList = ( id:number, type:any, typeValue:any, items:any, setItemsFunction:Function ) => {

    const updateItems:any[] = items.map((item:any) => {
        // console.log('updateItems item.id', item.id, 'id', id)
        
        if (item.id === id) {
          return {
            ...item,
            [type]: typeValue
          };
        } else {
            return item
        }
    });
    
    // console.log('updateItems', updateItems)

    //상태 업데이트
    setItemsFunction(updateItems);
}

export const updateItemInListReturn = ( id:number, type:any, typeValue:any, items:any) => {

  const updateItems:any[] = items.map((item:any) => {
    
    if (item.id === id) {
      return {
        ...item,
        [type]: typeValue
      };
    } else {
        return item
    }

    
});
  
  // return items
console.log('updateItems', updateItems)

return updateItems
}