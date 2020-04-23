"use strict"

import Typed from 'typed.js'

let typed = new Typed('#dynamic', {
    strings: [
        'Développeur logiciel.', 
        'Humaniste.', 
        'Anti-consumériste.', 
        'Pro-décentralisation.', 
        'Quasi-Marathonien.'
    ],
    smartBackspace: true, // Default value
    typeSpeed: 80,
    loop: true
})

const GPG_FINGERPRINT = "833A 50B7 ACE7 DE0A 70A9 EF08 C3C7 030D 491A D0EF"

document.getElementById('clipboard').onclick = function() {
    navigator.clipboard.writeText(GPG_FINGERPRINT)
}