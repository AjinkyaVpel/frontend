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
        icon: 'fas fa-book',
        label: 'Bookings'
    },
    {
        routeLink: 'payments',
        icon: 'fas fa-credit-card',
        label: 'Payments'
    },
    {
        routeLink: 'settlements',
        icon: 'fas fa-wallet',
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
        routeLink: 'support-status',
        icon: 'fas  fa-users',
        label: 'Help & Support'
    }
];