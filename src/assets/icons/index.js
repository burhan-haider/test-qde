import searchOne from 'assets/icons/topbar/search_1.png'
import searchTwo from 'assets/icons/topbar/search_2.png'
import menu from 'assets/icons/topbar/list.png'

const icons = {
    searchOne,
    searchTwo,
    menu
}

const getIconByKey = (key) => {
    return icons[key];
}

export default getIconByKey;