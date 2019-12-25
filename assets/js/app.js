"use strict"

import Typed from 'typed.js';

let typed = new Typed('#dynamic', {
    strings: ['Libéral.', 'Anti-consumériste.', 'Pro-décentralisation.', 'Marathonien (ou presque)'],
    smartBackspace: true, // Default value
    typeSpeed: 80,
    loop: true
});

async function getContributions() {
    function countContributions(since, contributions) {
        let count = 0
        for (let contribution of contributions) {
            // puisque le timestamp ne se base pas sur le timestamp unix, je l'adaptes
            if (new Date(contribution.timestamp * 1000) > since)
                count += contribution.contributions
        }

        return count
    }

    let response = await fetch('https://git.chnoepf.li/api/v1/users/richard/heatmap', {
        method: 'GET',
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        }
    })

    if(! response.ok) {
        console.error("Failure to get the contributions related data.")
    }

    const contributions = await response.json()

    let yearlyParagraph = document.getElementById('ycontrib').children[0]
    let monthlyParagraph = document.getElementById('mcontrib').childNodes[0]
    let weeklyParagraph = document.getElementById('wcontrib').childNodes[0]

    let lastYear = new Date()
    lastYear.setFullYear( lastYear.getFullYear() - 1 )
    let lastMonth = new Date()
    lastMonth.setMonth( lastMonth.getMonth() - 1 )
    let lastWeek = new Date()
    lastWeek.setDate( lastWeek.getDate() - 7 )

    yearlyParagraph.textContent = countContributions(lastYear, contributions)
    monthlyParagraph.textContent = countContributions(lastMonth, contributions)
    weeklyParagraph.textContent = countContributions(lastWeek, contributions)
}

window.addEventListener("load", getContributions)