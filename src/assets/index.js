import searchOne from 'assets/icons/topbar/search_1.png'
import searchTwo from 'assets/icons/topbar/search_2.png'
import menu from 'assets/icons/topbar/list.png'
import pinBlack from 'assets/icons/pin-black.png'
import pinned from 'assets/icons/pinned.png'

import dashboard from 'assets/icons/feature/dashboard.png'
import actionManagement from 'assets/icons/feature/actionManagement.png'
import scenarios from 'assets/icons/feature/scenarios.png'
import scanning from 'assets/icons/feature/scanning.png'
import labelsFeature from 'assets/icons/feature/labelsFeature.png'
import features from 'assets/icons/feature/features.png';
import closeBlue from 'assets/icons/close_blue.png';
import closeWhite from 'assets/icons/close_white.png';
import pdf from 'assets/icons/pdf_logo.png';
import excel from 'assets/icons/excel_logo.png';
import csv from 'assets/icons/csv_logo.png';
import print from 'assets/icons/print_logo.png';

import viewMatches from 'assets/icons/View_Matches.png'
import addToAccept from 'assets/icons/Add_To_Acceptlist.png'


const icons = {
    searchOne,
    searchTwo,
    menu,
    pinBlack,
    pinned,
    dashboard,
    actionManagement,
    scenarios,
    scanning,
    labelsFeature,
    features,
    closeBlue,
    closeWhite,
    pdf,
    excel,
    csv,
    print,
    viewMatches,
    addToAccept,
}

const getIconByKey = (key) => {
    return icons[key];
}

export default getIconByKey;