import React from "react";

function Item({ item, onItemUpdate, onItemDelete }) {

  function handleAddToCart(){
    console.log("clicked item", item)

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart, // hapa ndio sijaelewa - it negates whatever value is stored in the isInCart key
      }),
    })
    .then(res => res.json())
    .then((updatedItem) => onItemUpdate(updatedItem))

  }

  function handleDelete(){
    console.log("Deleted item:", item);

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => onItemDelete(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
