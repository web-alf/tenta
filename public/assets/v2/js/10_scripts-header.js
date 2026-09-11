document.addEventListener('DOMContentLoaded', function() {
    const headerFixed = document.querySelector('.home-header-fixed');
    const iconMenu = document.getElementById('icon-menu');
    const headerContent = document.querySelector('.home-header__content');
    const headerOverlay = document.querySelector('.home-header-overlay');
    const menuItemsChildren = document.querySelectorAll('.menu-item-has-children');
    const iconCloseMenu = document.getElementById('icon-close-menu');
    const pageBecomePartner = document.querySelector('#become-an-orange-trail-partner');

    //  for header fixed
    if(headerFixed) {
        const scrolled = window.scrollY;

        if (pageBecomePartner) {
            headerFixed.classList.add('home-header-fixed-white');
        }

        if (scrolled >= 50) {
            headerFixed.classList.add('home-header-fixed-white');
        }
        window.addEventListener('scroll', function() {
            let scrolled = window.scrollY;

            if (scrolled >= 50) {
                headerFixed.classList.add('home-header-fixed-white');
            } else {
                if (!pageBecomePartner) {
                    headerFixed.classList.remove('home-header-fixed-white');
                }
            }
        });

    }
    //
    //  for mobile menu
    if(headerContent && (window.innerWidth <= 1024)) {
        iconMenu.addEventListener('click', function() {
           headerContent.classList.toggle('active');
        });

        headerOverlay.addEventListener('click', function() {
            headerContent.classList.remove('active');
        });

        if (iconCloseMenu) {
            iconCloseMenu.addEventListener('click', function() {
                headerContent.classList.remove('active');
            });
        }

        if (menuItemsChildren) {
            menuItemsChildren.forEach(function (item) {
                let div = document.createElement('div');
                div.className = 'menu-item-has-children-icon';
                item.appendChild(div);
            });
            //open sub menu on mobile
            const menuItemsChildrenIcon = document.querySelectorAll('.menu-item-has-children-icon');
            menuItemsChildrenIcon.forEach(function (item) {
                item.addEventListener('click', function() {
                    item.parentElement.classList.toggle('active');
                });
            });
        }
    }
});