import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items , setItems}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchItem, setSearchItem] = useState("")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }


 function  handleSearchChange(e) {
    setSearchItem(e.target.value);
  }

  



  const itemsToDisplay = items.filter((item) => {
    if (searchItem.length == 0 && selectedCategory === "All") {
      return true;
    } 
    else if (item.category === selectedCategory && searchItem.length == 0){
      return item.category === selectedCategory;
    }
     else if (searchItem.length > 0 && selectedCategory === "All") {
      return item.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
    }
     else if(item.category === selectedCategory && searchItem.length > 0){
      return item.name.toLowerCase().includes(searchItem.toLocaleLowerCase()) && item.category === selectedCategory;
    } 
  });

  const onItemFormSubmit = (obj) => {
    setItems([...items, obj]);
  };

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} search={searchItem} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
