import Typewriter from 'typed.js'

new Typewriter('#dynamic', {
    strings: ['Libéral.', 'Anti-consumériste.', 'Pro-décentralisation.', 'Marathonien (ou presque)'],
    loop: true,
    typeSpeed: 80,
    smartBackspace: true
})

async function getContributions() {
    function countContributions(since, contributions) {
        var count = 0
        for (var contribution in contributions) {
            if (new Date(contribution) - since > 0)
                count += contributions[contribution]
        }

        return count
    }

    const response = await fetch('https://api.cdstm.ch/contributions', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
    })

    if(! response.ok) {
        console.error("Failure to get the contributions related data.")
    }

    const contributions = await response.json()

    var yearlyParagraph = document.getElementById('ycontrib').children[0]
    var monthlyParagraph = document.getElementById('mcontrib').childNodes[0]
    var weeklyParagraph = document.getElementById('wcontrib').childNodes[0]

    var lastYear = new Date()
    lastYear.setFullYear( lastYear.getFullYear() - 1 )
    var lastMonth = new Date()
    lastMonth.setMonth( lastMonth.getMonth() - 1 )
    var lastWeek = new Date()
    lastWeek.setDate( lastWeek.getDate() - 7 )

    yearlyParagraph.textContent = countContributions(lastYear, contributions)
    monthlyParagraph.textContent = countContributions(lastMonth, contributions)
    weeklyParagraph.textContent = countContributions(lastWeek, contributions)
}

window.addEventListener("load", getContributions)