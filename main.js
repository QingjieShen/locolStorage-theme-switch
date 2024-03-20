const listContainer = document.getElementById('list-container') //list items gos here
const listPannel = document.getElementById('list-pannel') //list pannel container
const preferencePannel = document.getElementById('preference-pannel') //preference pannel container

const themePreference = document.getElementById('theme-preference') //theme preference selection element
const listStyle = document.getElementById('list-style') //list style selection element

const themeData = [
    {
        themeName: "traditional",
        listPannel: "list-pannel-traditional-modal",
        preferencePannel: "preference-pannel-traditional-modal",
        listContainer: "list-container-traditional-modal",
        listItem: "list-item-traditional-modal"
    },
    {
        themeName: "dark",
        listPannel: "list-pannel-dark-modal",
        preferencePannel: "preference-pannel-dark-modal",
        listContainer: "list-container-dark-modal",
        listItem: "list-item-dark-modal"
    },
    {
        themeName: "sunset",
        listPannel: "list-pannel-sunset-modal",
        preferencePannel: "preference-pannel-sunset-modal",
        listContainer: "list-container-sunset-modal",
        listItem: "list-item-sunset-modal"
    }
]

const listStyleData = [
    "button-style", "minimalism", "expanded"
]

const listItems = ['Iceland', 'New Zealand', 'Taiwan', 'San Diego', 'Santorini', 'Japan']

let currentTheme = themeData[0]
let currentListStyle = "button-style"

// set theme color function. everytime theme changes call this function
const setThemeColor = () => {
    listContainer.className = `list-container ${currentTheme.listPannel}`
    listPannel.className = `list-pannel col-md-9 ${currentTheme.listPannel}`
    preferencePannel.className = `preference-pannel col-md-3 ${currentTheme.preferencePannel}`
}

// insert list items into the list container, when theme or list style changed, call this function
const insertItems = (theme, listStyle) => {
    // insert list items into the list container
    let listItemsElements = []
    if (listStyle === "minimalism") {
        listItemsElements = listItems.map(list => {
            return `<li class="w-100 minimalism">${list}</li>`
        })
    } else {
        listItemsElements = listItems.map(list => {
            return `<li class="w-100 ${theme.listItem} ${listStyle}">${list}</li>`
        })
    }
    
    listContainer.innerHTML = listItemsElements.join('')
}

if (localStorage.getItem('localTheme')) {
    currentTheme = JSON.parse(localStorage.getItem('localTheme'))
    setThemeColor()
    insertItems(currentTheme, currentListStyle)
    themePreference.value = currentTheme.themeName
}

if (localStorage.getItem('localListStyle')) {
    if (localStorage.getItem('localTheme')) {
        currentTheme = JSON.parse(localStorage.getItem('localTheme'))
        currentListStyle = JSON.parse(localStorage.getItem('localListStyle'))
        setThemeColor()
        insertItems(currentTheme, currentListStyle)
        themePreference.value = currentTheme.themeName
        listStyle.value = currentListStyle
    } else {
        currentListStyle = JSON.parse(localStorage.getItem('localListStyle'))
        insertItems(currentTheme, currentListStyle)
        listStyle.value = currentListStyle
    }
} else {
    if (localStorage.getItem('localTheme')) {
        currentTheme = JSON.parse(localStorage.getItem('localTheme'))
        setThemeColor()
        insertItems(currentTheme, currentListStyle)
        themePreference.value = currentTheme.themeName
    } else {
        insertItems(currentTheme, currentListStyle)
    }
} 

// get the customer selected theme
themePreference.addEventListener('change', () => {
    themeData.forEach(theme => {
        if (themePreference.value === theme.themeName) {
            currentTheme = theme
        }
    })
    setThemeColor()
    insertItems(currentTheme, currentListStyle)
    localStorage.setItem('localTheme', JSON.stringify(currentTheme))
})

listStyle.addEventListener('change', () => {
    currentListStyle = listStyle.value
    insertItems(currentTheme, currentListStyle)
    localStorage.setItem('localListStyle', JSON.stringify(currentListStyle))
})