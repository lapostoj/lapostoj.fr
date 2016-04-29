/*! 
* cbpAnimatedHeader.js v1.0.0
*
* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
* Copyright 2013, Codrops: http://www.codrops.com
*/
var cbpAnimatedHeader = (function() {
	var docElem = document.documentElement,
		navbar = document.querySelector( '.navbar-fixed-top' ),
        scrollTopBtn = document.querySelector( '.scroll-top' ),
        header = document.querySelector( '.main-header' ),
        about = document.querySelector( '#about' ),
		didScroll = false,
		changeNavbarOn = 802;
        
	function init() {
        setTimeout( moveHeader, 1500 );
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

    function moveHeader() {
        classie.remove( header, 'col-lg-12' );
        classie.add( header, 'col-lg-8' );
        setTimeout( displayAboutMe, 1000);
    }
    
    function displayAboutMe() {
        classie.remove( about, 'invisible' );
    }
    
	function scrollPage() {
		var sy = scrollY();
        if ( sy != 0) {
            classie.remove( scrollTopBtn, 'invisible');
        } else {
            classie.add( scrollTopBtn, 'invisible');
        }
		if ( sy >= changeNavbarOn ) {
			classie.add( navbar, 'navbar-shrink' );
		}
		else {
			classie.remove( navbar, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();
})();