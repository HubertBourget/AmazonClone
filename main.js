// Generates a new random id
// Used when creating a new item
let genId = () => {
    return "" + Math.floor(Math.random() * 1000000000)
}

// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "items-for-sale"

// Corresponds to the id of the item in the item details view
let detailItemId = undefined

// Stores all the items that all for sale.
// The key of the map is the item id
let itemsForSale = new Map()
let cartMap = new Map()
let cartTotal = 0
let purchaseHistory = new Map()
let a = genId()
let b = genId()
let c = genId()


// Some hard coded data

itemsForSale.set(a, {
    itemId: a,
    title: "Panton Chair",
    desc: "The Panton Chair is an S-shaped plastic chair created by the Danish designer Verner Panton in the 1960s. The world's first moulded plastic chair, it is considered to be one of the masterpieces of Danish design. This edition is made with polyurethane structural foam to give it a lot of durability",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Panton_Stuhl.jpg/255px-Panton_Stuhl.jpg",
    price: 134
})
itemsForSale.set(b, {
    itemId: b,
    title: "Canon G9X Mark II",
    desc: "The PowerShot G9 X Mark II camera features a large 1.0-inch, 20.1 Megapixel* CMOS sensor that helps capture high-quality images and videos. BONUS 128GB SD CARD INCLUDED!Digic 7 image processor. Compatible with iOS versions 8.4,9.3 and 10.2 and Android smartphone and tablet. It also features:Touch-screen panel.",
    imageURL: "https://static.bhphoto.com/images/multiple_images/item_images/1491342368000_IMG_769589.jpg",
    price: 449
})
itemsForSale.set(c, {
    itemId: c,
    title: "International Chess Set",
    desc: "This compact, Junior Chess Set has a board made from beech and birch wood giving it a classic, handmade feel; Number and letter algebraic coordinates adorn the borders. The board measures 40.7 x 40.7 x 2.5 centimeters; Each square measures 5 x 5 centimeters; Decorative metal clasps keep the board securely locked after play.",
    imageURL: "https://images-na.ssl-images-amazon.com/images/I/61ssvfM4PoL._AC_SL1005_.jpg",
    price: 99
})


// Returns a DOM node for displaying an item
let itemForSaleToElem = item => {

    // For debugging purposes
    console.log("creating DOM node for", item)

    // This DOM node will contain the image of the item
    let deleteButtonDiv = document.createElement("div")
    deleteButtonDiv.setAttribute("class", "deleteButtonDiv")
    let deleteButton = document.createElement("deleteButton")
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.innerText = "X"
    deleteButton.addEventListener("click", () => {
      let y = document.getElementById(item.itemId)
      y.parentNode.removeChild(y)
      itemsForSale.delete(item.itemId)

    })

    let imageElem = document.createElement("img")
    imageElem.setAttribute("src", item.imageURL)
    imageElem.setAttribute("class", "short-image")

    // Clicking this button will show the details page for the item
    let detailsButton = document.createElement("button")
    detailsButton.innerText = 'Get item details'
    detailsButton.setAttribute("class", "buttonStyle")
    detailsButton.addEventListener("click", () => {
        currentView = "item-detail"
        detailItemId = item.itemId

        render()
    })
    let itemTitle = document.createElement("div")
    itemTitle.innerText = item.title
    itemTitle.setAttribute("class", "itemTitle")

    let imageDiv = document.createElement("div")
    imageDiv.setAttribute("class", "imageDiv")

    let itemPrice1 = document.createElement("span")
    itemPrice1.innerText = item.price + "$ "
    let itemPrice2 = document.createElement("span")
    let fakePrice = Math.floor(item.price*1.19)
    itemPrice2.innerText = fakePrice + "$"
    itemPrice1.setAttribute("class", "itemPrice1")
    itemPrice2.setAttribute("class", "itemPrice2")

    let bottomDiv = document.createElement("div")
    let container = document.createElement("div")

    deleteButtonDiv.appendChild(deleteButton)
    container.appendChild(deleteButtonDiv)
    imageDiv.appendChild(imageElem)
    container.appendChild(imageDiv)
    container.appendChild(itemTitle)
    bottomDiv.appendChild(detailsButton)
    bottomDiv.appendChild(itemPrice1)
    bottomDiv.appendChild(itemPrice2)
    container.appendChild(bottomDiv)

    container.setAttribute("class", "item-for-sale containerBackground")

    return container
}

// Returns a DOM node for displaying all items
let allItemsView = () => {
    console.log("all items view")
    // itemIds will contain an array that contains all the item ids
    let itemIds = Array.from(itemsForSale.keys())

    let container = document.createElement("div")
    container.setAttribute("class", "itemContainer")
    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = itemsForSale.get(id)

        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = itemForSaleToElem(item)
        itemElem.setAttribute("id", id)
        container.appendChild(itemElem)
    }
    return container
}

// When the user clicks the "add item" button
let addItemView = () => {
    // For debugging purposes
    console.log("add item view")

    let wannaSell = document.createElement("div")
    wannaSell.setAttribute("class", "wannaSell")
    wannaSell.innerText = "Got something to sell? Great! We can help!"

    let wannaSell2 = document.createElement("div")
    wannaSell2.setAttribute("class", "wannaSell")
    wannaSell2.innerText = "Just fill the information below and we can get started:"

    let titleDiv = document.createElement("div")
    let imageDiv = document.createElement("div")
    let priceDiv = document.createElement("div")
    let descDiv = document.createElement("div")

    titleDiv.setAttribute("class", "addItemBox")
    imageDiv.setAttribute("class", "addItemBox")
    priceDiv.setAttribute("class", "addItemBox")
    descDiv.setAttribute("class", "addItemBox")

    let titleLabel = document.createElement("p")
    titleLabel.innerText = "Title:"

    let imageLabel = document.createElement("p")
    imageLabel.innerText = "Image url:"

    let priceLabel = document.createElement("p")
    priceLabel.innerText = "Price:"

    let descLabel = document.createElement("p")
    descLabel.innerText = "Description:"


    let titleBox = document.createElement("input")
    titleBox.setAttribute("type", "text")

    let imageBox = document.createElement("input")
    imageBox.setAttribute("type", "text")

    let priceBox = document.createElement("input")
    priceBox.setAttribute("type", "text")

    let descBox = document.createElement("input")
    descBox.setAttribute("type", "text")

    // Submit button. It adds an item to the itemsForSale map
    let submitButton = document.createElement("button")
    submitButton.innerHTML = '<i class="far fa-plus-square"></i> Add item'
    submitButton.setAttribute("class", "addItemButton")
    submitButton.addEventListener("click", () => {
        let newItemId = genId()
        let newItem = {
            itemId: newItemId,
            title: titleBox.value,
            desc: descBox.value,
            imageURL: imageBox.value,
            price: priceBox.value
        }
        itemsForSale.set(newItemId, newItem)
        currentView = "items-for-sale"
        render()
    })

    let container = document.createElement("div")

    container.appendChild(wannaSell)
    container.appendChild(wannaSell2)

    titleDiv.appendChild(titleLabel)
    titleDiv.appendChild(titleBox)
    imageDiv.appendChild(imageLabel)
    imageDiv.appendChild(imageBox)
    priceDiv.appendChild(priceLabel)
    priceDiv.appendChild(priceBox)
    descDiv.appendChild(descLabel)
    descDiv.appendChild(descBox)

    container.appendChild(titleDiv)
    container.appendChild(imageDiv)
    container.appendChild(priceDiv)
    container.appendChild(descDiv)

    container.appendChild(submitButton)

    return container
}

let modifyYourAdd = () => {
  // For debugging purposes
  console.log("modify add view")

  let wannaSell = document.createElement("div")
  wannaSell.setAttribute("class", "wannaSell")
  wannaSell.innerText = "Here you can update the information about your item"

  let wannaSell2 = document.createElement("div")
  wannaSell2.setAttribute("class", "wannaSell")
  wannaSell2.innerText = "Everything you need to do so is just below down here:"

  let titleDiv = document.createElement("div")
  let imageDiv = document.createElement("div")
  let priceDiv = document.createElement("div")
  let descDiv = document.createElement("div")

  titleDiv.setAttribute("class", "addItemBox")
  imageDiv.setAttribute("class", "addItemBox")
  priceDiv.setAttribute("class", "addItemBox")
  descDiv.setAttribute("class", "addItemBox")

  let titleLabel = document.createElement("p")
  titleLabel.innerText = "Title:"

  let imageLabel = document.createElement("p")
  imageLabel.innerText = "Image url:"

  let priceLabel = document.createElement("p")
  priceLabel.innerText = "Price:"

  let descLabel = document.createElement("p")
  descLabel.innerText = "Description:"


  let titleBox = document.createElement("input")
  titleBox.setAttribute("type", "text")

  let imageBox = document.createElement("input")
  imageBox.setAttribute("type", "text")

  let priceBox = document.createElement("input")
  priceBox.setAttribute("type", "text")

  let descBox = document.createElement("input")
  descBox.setAttribute("type", "text")

  // Submit button. It adds an item to the itemsForSale map
  let submitButton = document.createElement("button")
  submitButton.innerText = "Update my Add"
  submitButton.setAttribute("class", "addItemButton")
  submitButton.addEventListener("click", () => {
      let newItem = {
          itemId: currentItemInspected.itemId,
          title: titleBox.value,
          desc: descBox.value,
          imageURL: imageBox.value,
          price: priceBox.value
      }
      itemsForSale.set(currentItemInspected.itemId, newItem)
      currentView = "items-for-sale"
      render()
  })

  let container = document.createElement("div")

  container.appendChild(wannaSell)
  container.appendChild(wannaSell2)

  titleDiv.appendChild(titleLabel)
  titleDiv.appendChild(titleBox)
  imageDiv.appendChild(imageLabel)
  imageDiv.appendChild(imageBox)
  priceDiv.appendChild(priceLabel)
  priceDiv.appendChild(priceBox)
  descDiv.appendChild(descLabel)
  descDiv.appendChild(descBox)

  container.appendChild(titleDiv)
  container.appendChild(imageDiv)
  container.appendChild(priceDiv)
  container.appendChild(descDiv)

  container.appendChild(submitButton)

  return container
}

// When you ask for the details for an item, this is what gets displayed
let itemDetailView = () => {

    currentItemInspected = itemsForSale.get(detailItemId)


    console.log("item detail view")

    let contents = document.createElement("div")
    contents.setAttribute("class", "detailView-contents divBackground")
    let imageDiv = document.createElement("div")
    imageDiv.setAttribute("class", "detailView-imageDiv")
    let textDiv = document.createElement("div")
    textDiv.setAttribute("class", "detailView-textDiv")

    let titleH1 = document.createElement("H1")
    titleH1.setAttribute("class", "detailView-titleH1")
    titleH1.innerText = currentItemInspected.title

    let descDiv = document.createElement("p")
    descDiv.innerText = currentItemInspected.desc

    let priceDiv = document.createElement("div")
    priceDiv.setAttribute("class", "detail-priceDiv")

    let pricespan1 = document.createElement("h2")
    pricespan1.innerText = currentItemInspected.price + "$ "
    let fakePrice = Math.floor(currentItemInspected.price*1.19)
    let pricespan2 = document.createElement("h5")
    pricespan2.setAttribute("class", "itemPrice2" )
    pricespan2.innerText = fakePrice + "$"

    let addButtonDiv = document.createElement("div")
    let addButton = document.createElement("button")
    addButton.setAttribute("class", "add-to-cart-button")
    addButton.innerHTML = '<i class="fas fa-cart-arrow-down fa-lg"></i> Add to Cart'
    addButton.addEventListener("click", () => {
      let newId = genId()
    cartMap.set(newId, {
        itemId: newId,
        title: currentItemInspected.title,
        desc: currentItemInspected.desc,
        imageURL: currentItemInspected.imageURL,
        price: currentItemInspected.price
    })

    alert("We have succesfully added this " + currentItemInspected.title + " to your shopping cart. Is there anything else you are hoping to find?");
  })

  let modifyButtonDiv = document.createElement("div")
  let modifyButton = document.createElement("button")
  modifyButtonDiv.setAttribute("class", "modifyButtonDiv")
  modifyButton.innerHTML = '<i class="fas fa-edit"></i> Modify your Add'
  modifyButton.addEventListener("click", () => {

    currentView = "Modify-your Add"
    render()
  })

    let detailImage = document.createElement("img")
    detailImage.setAttribute("src", currentItemInspected.imageURL)
    detailImage.setAttribute("class", "detailView-image")

    imageDiv.appendChild(detailImage)

    textDiv.appendChild(titleH1)
    textDiv.appendChild(descDiv)
    priceDiv.appendChild(pricespan1)
    priceDiv.appendChild(pricespan2)
    textDiv.appendChild(priceDiv)
    addButtonDiv.appendChild(addButton)
    textDiv.appendChild(addButtonDiv)

    contents.appendChild(imageDiv)
    contents.appendChild(textDiv)

    modifyButtonDiv.appendChild(modifyButton)
    contents.appendChild(modifyButtonDiv)



    return contents
}

let cartView = () => {
console.log("cart view")

let totalCartDisplay = document.createElement("div")
totalCartDisplay.setAttribute("class", "totalCartDisplay")

      let itemIds = Array.from(cartMap.keys())
      let container = document.createElement("div")
      container.setAttribute("class", "cartContainer2 divBackground")

      cartTotal = 0
      for (let i = 0; i < itemIds.length; i++) {
          let id = itemIds[i]
          let item = cartMap.get(id)
          console.log("cartItem", item)
          let itemElem = cartDisplay(item)
          itemElem.setAttribute("id", id)

          container.appendChild(itemElem)
          cartTotal += Number(item.price)
      }

      totalCartDisplay.innerText = "Your Total is: " + cartTotal + " $"
      container.appendChild(totalCartDisplay)

      let purchaseDivButton = document.createElement("div")
      purchaseDivButton.setAttribute("class", "purchaseDivButton")
      let purchaseButton = document.createElement("button")
      purchaseButton.innerHTML = '<i class="fas fa-shopping-bag"></i> Purchase'

      purchaseButton.addEventListener("click", () => {

        for (let i = 0; i < itemIds.length; i++) {
          let id = itemIds[i]
          let newItemId = genId()
          let newItem = {
              itemId: newItemId,
              title: cartMap.get(id).title,
              desc: cartMap.get(id).desc,
              price: cartMap.get(id).price,
              currentYear : (new Date()).getFullYear(),
              currentMonth : (new Date()).getMonth(),
              currentDay : (new Date()).getDate()
          }
          purchaseHistory.set(newItemId, newItem)


            let item = cartMap.delete(id)
            console.log("deleting cartItem", item)
          }
          render()
      })

      purchaseDivButton.appendChild(purchaseButton)
      container.appendChild(purchaseDivButton)


      return container
}

let cartDisplay = item => {
    // For debugging purposes
    let idTag = item.itemId
    console.log("creating display DOM node for", item)

    let itemTitle = document.createElement("div")
    itemTitle.innerText = item.title
    itemTitle.setAttribute("class", "cartItem1")

    let descDiv = document.createElement("div")
    descDiv.setAttribute("class", "cartItemDesc")
    descDiv.innerText = item.desc

    let priceDiv = document.createElement("div")
    priceDiv.innerText = item.price + " $ "
    priceDiv.setAttribute("class", "cartItem2")

    let deleteButtonDiv = document.createElement("div")
    deleteButtonDiv.setAttribute("class", "deleteButtonCartDiv")
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    deleteButton.addEventListener("click", () => {
      let y = document.getElementById(idTag)
      y.parentNode.removeChild(y)
      cartMap.delete(item.itemId)
      render()

    })



    let container = document.createElement("div")
    container.setAttribute("class", "cartContainer1 divBackground")



    container.appendChild(itemTitle)
    container.appendChild(descDiv)
    container.appendChild(priceDiv)
    deleteButtonDiv.appendChild(deleteButton)
    container.appendChild(deleteButtonDiv)



    return container
}

  let previousOrderView = () => {
  console.log("Previous Order view")

        let itemIds = Array.from(purchaseHistory.keys())
        let container = document.createElement("div")
        container.setAttribute("class", "cartContainer2 divBackground")

            for (let i = 0; i < itemIds.length; i++) {
            let id = itemIds[i]
            let item = purchaseHistory.get(id)
            console.log("cartItem", item)
            let itemElem = previousOrderDisplay(item)
            container.appendChild(itemElem)

        }

        return container
}

let previousOrderDisplay = item => {
    // For debugging purposes
    console.log("creating display DOM node for", item)

    let itemDateDiv = document.createElement("div")
    itemDateDiv.setAttribute("class", "cartItem1")
    let itemDateYearSpan = document.createElement("span")
    let itemDateMonthSpan = document.createElement("span")
    let itemDateDaySpan = document.createElement("span")
    itemDateYearSpan.innerText = item.currentYear + "-"
    itemDateMonthSpan.innerText = item.currentMonth+ "-"
    itemDateDaySpan.innerText = item.currentDay

    let itemTitle = document.createElement("div")
    itemTitle.innerText = item.title
    itemTitle.setAttribute("class", "cartItem1")

    let descDiv = document.createElement("div")
    descDiv.setAttribute("class", "cartItemDesc")
    descDiv.innerText = item.desc

    let priceDiv = document.createElement("div")
    priceDiv.innerText = item.price + " $ "
    priceDiv.setAttribute("class", "cartItem2")



    let container = document.createElement("div")
    container.setAttribute("class", "cartContainer1 divBackground")

    itemDateDiv.appendChild(itemDateYearSpan)
    itemDateDiv.appendChild(itemDateMonthSpan)
    itemDateDiv.appendChild(itemDateDaySpan)

    container.appendChild(itemDateDiv)
    container.appendChild(itemTitle)
    container.appendChild(descDiv)
    container.appendChild(priceDiv)



    return container
}

// The navigation buttons on top
let navigationButtons = () => {
    let container = document.createElement("div")
    container.setAttribute("class", "containerBackground")
    let logo = createLogoBand()
    container.appendChild(logo)

    let homeButton = document.createElement("button")
    homeButton.innerHTML = '<i class="far fa-check-square"></i> Best Sellers'
    homeButton.setAttribute("class", "buttonStyle")
    homeButton.addEventListener("click", () => {
        currentView = "items-for-sale"
        console.log("new view", currentView)
        render()
    })

    let addItemButton = document.createElement("button")
    addItemButton.innerHTML = '<i class="fas fa-cash-register"></i> Sell Something Now'
    addItemButton.setAttribute("class", "buttonStyle")
    addItemButton.addEventListener("click", () => {
        currentView = "add-item"
        console.log("new view", currentView)
        render()
    })
    let addCartButton = document.createElement("button")
    addCartButton.innerHTML = '<i class="fas fa-cart-arrow-down"></i> Cart'
    addCartButton.setAttribute("class", "buttonStyle")
    addCartButton.addEventListener("click", () => {
        currentView = "cart-view"
        console.log("new view", currentView)
        render()
    })

    let orderHistoryButton = document.createElement("button")
    orderHistoryButton.innerHTML = '<i class="fas fa-book-open"></i> Your Orders'
    orderHistoryButton.setAttribute("class", "buttonStyle")
    orderHistoryButton.addEventListener("click", () => {
        currentView = "previous-orders-view"
        console.log("new view", currentView)
        render()
    })


    let menuButtonDiv = document.createElement("div")
    menuButtonDiv.setAttribute("class", "menuButtonContainer")
    let divLeft = document.createElement("div")
    let divRight = document.createElement("div")

    divLeft.appendChild(homeButton)
    divLeft.appendChild(addItemButton)
    divRight.appendChild(orderHistoryButton)
    divRight.appendChild(addCartButton)
    menuButtonDiv.appendChild(divLeft)
    menuButtonDiv.appendChild(divRight)
    container.appendChild(menuButtonDiv)
    return container
}

let createLogoBand = () => {
  let mainDiv =  document.createElement("div")
  mainDiv.setAttribute("class", "logoband divBackground")
  let logo = document.createElement("img")

  logo.setAttribute("src", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b94890e-0326-43b6-b5f0-e549fff76397/de8j8vd-7b6fa76b-1863-4aff-8ace-8f5c4d8a173c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWI5NDg5MGUtMDMyNi00M2I2LWI1ZjAtZTU0OWZmZjc2Mzk3XC9kZThqOHZkLTdiNmZhNzZiLTE4NjMtNGFmZi04YWNlLThmNWM0ZDhhMTczYy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.EGLCNm6BFrZ-rRQ8bS4BhqtEtMKsgr3mo3-AqeQIirg")
  let divLogo2 =  document.createElement("div")
  let divLogo3 =  document.createElement("span")
  let divLogo4 =  document.createElement("span")
  let divLogo5 =  document.createElement("span")
  let divLogoWelcomeTxt =  document.createElement("div")
  divLogo2.innerText = "Welcome Visitor!"
  divLogo3.innerText = "You need something shipped in"
  divLogo4.innerText = " Montreal "
  divLogo5.innerText = "today?"
  divLogoWelcomeTxt.setAttribute("class", "welcome-div")
  divLogo2.setAttribute("class", "welcome-text1")
  divLogo3.setAttribute("class", "welcome-text")
  divLogo4.setAttribute("class", "Montreal")
  divLogo5.setAttribute("class", "welcome-text")

  let divSearchBar =  document.createElement("div")
  let divSB1 =  document.createElement("div")
  let divSB2 =  document.createElement("div")
  let searchBar =  document.createElement("input")
  searchButton =  document.createElement("button")
  searchButton.innerHTML = '<i class="fas fa-search"></i> Find it!'
  searchButton.setAttribute("class", "buttonStyle")
  searchButton.addEventListener("click", () => {
    alert("Search function not yet implemented. We kindly encourage you to please scroll down and discover some of what we have to offer today!");
  })
  divSearchBar.setAttribute("class", "fatherSearchBar")
  searchBar.setAttribute("class", "searchBar")
  divSB1.innerText = "What are you looking for exactly?"
  divSB1.setAttribute("class", "looking-for")

  mainDiv.appendChild(logo)
  divLogoWelcomeTxt.appendChild(divLogo2)
  divLogoWelcomeTxt.appendChild(divLogo3)
  divLogoWelcomeTxt.appendChild(divLogo4)
  divLogoWelcomeTxt.appendChild(divLogo5)
  mainDiv.appendChild(divLogoWelcomeTxt)

  divSearchBar.appendChild(divSB1)
  divSearchBar.appendChild(searchBar)
  divSearchBar.appendChild(searchButton)
  divSearchBar.appendChild(divSB2)
  mainDiv.appendChild(divSearchBar)

  return mainDiv
}

// function getRandomInt(maximum) {
//   return maximum + Math.floor(Math.random() * Math.floor(maximum*0.3));
// }

// Rerenders the page
let render = () => {
    // Will contain a reference
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "items-for-sale") {
        toRender = allItemsView()
    } else if (currentView === "item-detail") {
        toRender = itemDetailView()
    } else if (currentView === "add-item") {
        toRender = addItemView()
    } else if (currentView === "cart-view") {
          toRender = cartView()
    } else if (currentView === "previous-orders-view") {
            toRender = previousOrderView()
    } else if (currentView === "Modify-your Add") {
                  toRender = modifyYourAdd()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }
    let nav = navigationButtons()
    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(nav)
    document.body.appendChild(toRender)
}

// Initial render
render()
