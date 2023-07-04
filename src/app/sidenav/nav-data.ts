import { INavbarData } from "./helper";

export const navbarData:INavbarData[] = [                //array to store the list of menu of sidenav
    {
        routeLink: 'dashboard',                         //routing link 
        icon: 'fas fa-home',                            // icon 
        label: 'Dashboard'                              //label
    },
    {
        routeLink: 'manageStation',
        icon: 'fas fa-charging-station',
        label: 'Manage Station',
    },
    {
        routeLink: 'earnings',
        icon: 'fas fa-money-check-alt',
        label: 'Earnings'
    },
    {
        routeLink: 'booking',
        icon: 'fas fa-calendar-alt',
        label: 'Bookings'
    },
    {
        routeLink: 'payments',
        icon: 'fas fa-credit-card',
        label: 'Payments'
    },
    {
        routeLink: 'settlements',
        icon: 'fas fa-file-invoice-dollar',
        label: 'Settlements'
    },
    {
        routeLink: 'downloads',
        icon: 'fas fa-download',
        label: 'Downloads'
    },
    {
        routeLink: 'settings',
        icon: 'fas fa-cog',
        label: 'Settings',
        expanded:true,
        items:[                                             //sublevel  menu list
            {
                routeLink:'settings/accountSetting',
                label: 'Account Setting'
            },
            {
                routeLink:'settings/securitySetting',
                label: 'Security Setting'
            },
            {
                routeLink:'settings/paymentSetting',
                label: 'Payment Setting'
            },
            {
                routeLink:'settings/notificationSetting',
                label: 'Notification Setting'
            }
        ]
    },
     {
        routeLink: 'manageFaq',
        icon: 'fas fa-question-circle',
        label: 'Manage FAQ'
    },
    {
        routeLink: 'support-status',
        icon: 'fas fa-user-headset',
        label: 'Help & Support'
    }
];