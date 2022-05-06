import searchOne from './icons/topbar/search_1.png'
import searchTwo from './icons/topbar/search_2.png'
import menu from './icons/topbar/list.png'
import pinBlack from './icons/pin-black.png'
import pinned from './icons/pinned.png'

import dashboard from './icons/feature/dashboard.png'
import actionManagement from './icons/feature/actionManagement.png'
import scenarios from './icons/feature/scenarios.png'
import scanning from './icons/feature/scanning.png'
import labelsFeature from './icons/feature/labelsFeature.png'
import features from './icons/feature/features.png';
import closeBlue from './icons/close_blue.png';
import closeWhite from './icons/close_white.png';
import pdf from './icons/pdf_logo.png';
import excel from './icons/excel_logo.png';
import csv from './icons/csv_logo.png';
import print from './icons/print_logo.png';

import viewMatches from './icons/View_Matches.png'
import addToAccept from './icons/Add_To_Acceptlist.png'

import list from './icons/topbar/list.png'
import chat from './icons/topbar/chat.png'
import email from './icons/topbar/email.png'
import log from './icons/topbar/log.png'
import path from './icons/topbar/path.png'
import reports from './icons/topbar/reports.png'
import settings from './icons/topbar/settings.png'
import speak from './icons/topbar/speak .png'
import trace from './icons/topbar/trace.png'
import search1 from './icons/topbar/search_1.png'


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
    list,
    chat,
    email,
    log,
    path,
    reports,
    settings,
    speak,
    trace,
    search1
}

const getIconByKey = (key) => {
    return icons[key];
}

export default getIconByKey;